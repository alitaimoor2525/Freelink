"use client";

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseApp, hasFirebaseConfig } from "@/lib/firebase";
import { SUBMISSION_COLLECTIONS, type ApplicationType } from "@/lib/types";

export interface SubmitResult {
  ok: boolean;
  id?: string;
  error?: string;
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file: File): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.error?.message || `Cloudinary upload failed (${response.status})`;
    console.error("Cloudinary upload error:", msg, errorData);
    throw new Error(msg);
  }

  const data = await response.json();
  return data.secure_url;
}

/**
 * Persists a submission. When a Firebase project is configured, the resume
 * uploads to Cloudinary and the application is written straight to Firestore from
 * the client — no Cloud Function call, no email. Falls back to a dev-only
 * console log so the forms remain testable without a configured Firebase
 * project.
 */
export async function submitApplication(
  type: ApplicationType,
  data: Record<string, unknown>,
  file?: File | null
): Promise<SubmitResult> {
  const payload: Record<string, unknown> = {
    ...data,
    status: "new",
    type,
  };

  if (!hasFirebaseConfig) {
    // Honeypot: treat bots that fill the hidden field as "submitted" but store
    // nothing, so they can't tell they were caught.
    if (data.hp) {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true, id: `dev-blocked-${Date.now()}` };
    }
    const id = `dev-${Date.now()}`;
    payload.id = id;
    payload.createdAt = Date.now();
    // Persist to the same localStorage the admin dashboard reads, so new
    // submissions show up in dev without a Firebase project.
    try {
      const KEY = "freelink_dev_submissions";
      const raw = window.localStorage.getItem(KEY);
      const existing = raw ? (JSON.parse(raw) as Record<string, unknown>[]) : [];
      window.localStorage.setItem(KEY, JSON.stringify([payload, ...existing]));
    } catch {
      /* storage unavailable — still treat as success */
    }
    console.info(`[freelink dev] ${type} submission:`, payload, file ? { file: file.name } : undefined);
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, id };
  }

  // Honeypot: bots that fill the hidden field are silently "accepted".
  if (data.hp) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, id: `blocked-${Date.now()}` };
  }

  // Transient form fields that don't belong in the stored record.
  delete payload.hp;
  delete payload.agree;
  // Server-set timestamp so Firestore rules verify it against request.time.
  payload.createdAt = serverTimestamp();

  try {
    const app = getFirebaseApp();

    if (file) {
      console.log("Uploading file to Cloudinary:", file.name, file.type, file.size);
      const url = await uploadToCloudinary(file);
      console.log("Cloudinary upload success:", url);
      if (type === "talent") payload.resumeFileUrl = url;
      else payload.referenceFileUrl = url;
    }

    const db = getFirestore(app);
    console.log("Writing to Firestore:", SUBMISSION_COLLECTIONS[type], payload);
    const docRef = await addDoc(collection(db, SUBMISSION_COLLECTIONS[type]), payload);
    console.log("Firestore write success:", docRef.id);
    return { ok: true, id: docRef.id };
  } catch (err) {
    console.error("Failed to submit application:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return {
      ok: false,
      error: msg.includes("Cloudinary") ? msg : "Something went wrong on our side. Please try again in a moment — we're on it.",
    };
  }
}