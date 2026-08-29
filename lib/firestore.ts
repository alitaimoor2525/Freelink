"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getFirebaseApp, hasFirebaseConfig } from "@/lib/firebase";
import { SUBMISSION_COLLECTIONS, type ApplicationType, type Submission } from "@/lib/types";

const DEV_KEY = "freelink_dev_submissions";

/* ----------------------------- Dev fallback ----------------------------- */

function devSeed(): Submission[] {
  const now = Date.now();
  return [
    {
      id: "dev-t1",
      type: "talent",
      status: "new",
      createdAt: now - 1000 * 60 * 60 * 30,
      fullName: "Priya Kumar",
      email: "priya@example.com",
      phone: "+92 300 0000000",
      city: "Lahore",
      country: "Pakistan",
      primarySkills: ["Graphic Design"],
      experienceLevel: "Professional",
      availability: "Full-time",
      portfolioUrl: "https://dribbble.com/priyakumar",
      tools: "Figma, Illustrator, Photoshop",
      experienceDetails: "I care deeply about design systems and shipping calm, considered interfaces.",
      expectedRate: "PKR 40k/mo",
      referralSource: "LinkedIn post",
    },
    {
      id: "dev-t2",
      type: "talent",
      status: "reviewed",
      createdAt: now - 1000 * 60 * 60 * 72,
      fullName: "Tom Brennan",
      email: "tom@example.com",
      phone: "+44 7700 900123",
      city: "London",
      country: "UK",
      primarySkills: ["Web Development"],
      experienceLevel: "Intermediate",
      availability: "Part-time",
      portfolioUrl: "https://github.com/tombrn",
      tools: "TypeScript, React, Node",
      experienceDetails: "Full-stack TypeScript generalist who enjoys turning fuzzy briefs into working software.",
      expectedRate: "£350/day",
      referralSource: "Freelink community",
    },
    {
      id: "dev-h1",
      type: "hiring",
      status: "new",
      createdAt: now - 1000 * 60 * 60 * 8,
      companyName: "Acme Studio",
      contactName: "Jordan Lee",
      email: "jordan@acme.co",
      phone: "+1 555 0100",
      services: ["Web development", "UI/UX Designing"],
      projectDescription: "We need a senior engineer to take our storefront rebuild from spec to launch.",
      budget: "$25k – $50k",
      deadline: "2026-12-01",
      additionalNotes: "Remote-friendly, EU time zone overlap expected.",
    },
    {
      id: "dev-p1",
      type: "partner",
      status: "matched",
      createdAt: now - 1000 * 60 * 60 * 48,
      businessName: "Bright Futures Collective",
      contactName: "Mei Chen",
      email: "mei@collective.org",
      phone: "+65 8123 4567",
      industry: "Community",
      websiteUrl: "https://brightfutures.org",
      companySize: "11-50",
      designation: "Partnerships Lead",
      hiringType: "Project-based",
      workMode: "Remote",
      rolesHired: "Content writers, graphic designers",
      whyPartner: "Refer alumni into matching programs and co-host portfolio nights.",
    },
  ];
}

function readDevSubs(): Submission[] {
  if (typeof window === "undefined") return devSeed();
  try {
    const raw = window.localStorage.getItem(DEV_KEY);
    if (!raw) return devSeed();
    return JSON.parse(raw) as Submission[];
  } catch {
    return devSeed();
  }
}

function writeDevSubs(subs: Submission[]) {
  window.localStorage.setItem(DEV_KEY, JSON.stringify(subs));
}

/* ----------------------------- Public API ------------------------------- */

export type SubListener = (subs: Submission[]) => void;

export function subscribeSubmissions(
  type: ApplicationType,
  onChange: SubListener
): Unsubscribe {
  if (!hasFirebaseConfig) {
    const run = () =>
      onChange(readDevSubs().filter((s) => s.type === type));
    run();
    const id = window.setInterval(run, 3000);
    return () => window.clearInterval(id);
  }

  const db = getFirestore(getFirebaseApp());
  const q = query(
    collection(db, SUBMISSION_COLLECTIONS[type]),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const subs = snap.docs.map((d) => {
      const data = d.data();
      const createdAt =
        data.createdAt && typeof data.createdAt.toMillis === "function"
          ? data.createdAt.toMillis()
          : Date.now();
      return { ...data, id: d.id, type, createdAt } as Submission;
    });
    onChange(subs);
  });
}

export async function updateSubmission(
  type: ApplicationType,
  id: string,
  patch: { status?: string; internalNotes?: string }
): Promise<void> {
  if (!hasFirebaseConfig) {
    const subs = readDevSubs();
    const next = subs.map((s) =>
      s.id === id ? { ...s, ...patch, updatedAt: Date.now() } : s
    ) as Submission[];
    writeDevSubs(next);
    return;
  }
  const db = getFirestore(getFirebaseApp());
  await updateDoc(doc(db, SUBMISSION_COLLECTIONS[type], id), {
    ...patch,
    updatedAt: new Date(),
  });
}

export async function deleteSubmission(
  type: ApplicationType,
  id: string
): Promise<void> {
  if (!hasFirebaseConfig) {
    writeDevSubs(readDevSubs().filter((s) => s.id !== id));
    return;
  }
  const db = getFirestore(getFirebaseApp());
  await deleteDoc(doc(db, SUBMISSION_COLLECTIONS[type], id));
}

export async function fetchAllSubmissions(): Promise<Submission[]> {
  if (!hasFirebaseConfig) return readDevSubs();
  const db = getFirestore(getFirebaseApp());
  const types: ApplicationType[] = ["talent", "hiring", "partner"];
  const out: Submission[] = [];
  for (const type of types) {
    const snap = await getDocs(
      query(collection(db, SUBMISSION_COLLECTIONS[type]), orderBy("createdAt", "desc"))
    );
    snap.docs.forEach((d) => {
      const data = d.data();
      const createdAt =
        data.createdAt && typeof data.createdAt.toMillis === "function"
          ? data.createdAt.toMillis()
          : Date.now();
      out.push({ ...data, id: d.id, type, createdAt } as Submission);
    });
  }
  return out.sort((a, b) => b.createdAt - a.createdAt);
}
