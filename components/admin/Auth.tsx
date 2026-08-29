"use client";

import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirebaseApp, hasFirebaseConfig } from "@/lib/firebase";
import { siteConfig } from "@/lib/site";

// Dev sessions persist across route navigation (each admin page calls the hook
// fresh, and component-local state wouldn't survive the /login -> /admin swap).
const DEV_STORAGE_KEY = "freelink_admin_dev";

export interface AuthUser {
  email: string;
  isAdmin: boolean;
}

function isAllowed(email: string): boolean {
  // No Firebase configured = local dev. Anyone can sign in so the admin UI is
  // testable out-of-the-box. Once Firebase env vars are set, only the allow-list
  // voters in NEXT_PUBLIC_ADMIN_EMAILS get in.
  if (!hasFirebaseConfig) return true;
  return siteConfig.adminEmails.includes(email.toLowerCase());
}

/**
 * Auth sessions live in the admin page (client) rather than a middleware
 * guard. Allow-listed emails only — everything else is kept out.
 */
export function useAdminAuth(): {
  user: AuthUser | null;
  status: "loading" | "out" | "in" | "denied";
  login: (email: string, password: string) => Promise<string | null>;
  loginGoogle: () => Promise<string | null>;
  logout: () => Promise<void>;
} {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<"loading" | "out" | "in" | "denied">(
    "loading"
  );

  const applyEmail = (email?: string | null) => {
    if (!email) {
      setUser(null);
      setStatus("out");
      return;
    }
    if (isAllowed(email)) {
      setUser({ email, isAdmin: true });
      setStatus("in");
    } else {
      setUser(null);
      setStatus("denied");
    }
  };

  // Restore/observe the session AFTER hydration. Doing this during render
  // would make the client's hydration output differ from the server HTML
  // (which still shows "loading") and throw React hydration error #418.
  useEffect(() => {
    if (hasFirebaseConfig) {
      const auth = getAuth(getFirebaseApp());
      return onAuthStateChanged(auth, (u: User | null) => applyEmail(u?.email));
    }
    // Dev mode — restore a persisted session if one exists.
    const saved = window.sessionStorage.getItem(DEV_STORAGE_KEY);
    if (saved && isAllowed(saved)) {
      setUser({ email: saved, isAdmin: true });
      setStatus("in");
    } else {
      setStatus("out");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    if (!hasFirebaseConfig) {
      if (isAllowed(email)) {
        setUser({ email, isAdmin: true });
        setStatus("in");
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(DEV_STORAGE_KEY, email.toLowerCase());
        }
        return null;
      }
      return "That email isn't on the team list.";
    }
    try {
      const auth = getAuth(getFirebaseApp());
      const cred = await signInWithEmailAndPassword(auth, email, password);
      applyEmail(cred.user.email);
      return null;
    } catch {
      return "Those credentials didn't work. Try again.";
    }
  };

  const loginGoogle = async () => {
    if (!hasFirebaseConfig) {
      applyEmail("dev@local.test");
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(DEV_STORAGE_KEY, "dev@local.test");
      }
      return null;
    }
    try {
      const auth = getAuth(getFirebaseApp());
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      applyEmail(cred.user.email);
      return cred.user.email && !isAllowed(cred.user.email)
        ? "That Google account isn't on the team list."
        : null;
    } catch {
      return "Sign-in didn't complete. Try again.";
    }
  };

  const logout = async () => {
    if (hasFirebaseConfig) {
      await signOut(getAuth(getFirebaseApp()));
    }
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(DEV_STORAGE_KEY);
    }
    setUser(null);
    setStatus("out");
  };

  return { user, status, login, loginGoogle, logout };
}