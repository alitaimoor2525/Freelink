"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/components/admin/Auth";

export default function AdminLoginPage() {
  const { login, loginGoogle, logout, user, status } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status === "in" && user) router.replace("/admin");
  }, [status, user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const err = await login(email, password);
    if (err) setError(err);
    setBusy(false);
  };

  const google = async () => {
    setError(null);
    const err = await loginGoogle();
    if (err) setError(err);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="animate-float text-5xl font-bold text-gold-cta">∞</span>
          <p className="mt-3 font-mono text-xs uppercase tracking-microlabel text-forest-mid/50">
            Freelink Admin
          </p>
          <h1 className="mt-2 text-3xl text-forest-mid">Sign in</h1>
        </div>

        <div className="rounded-md border border-forest-mid/15 bg-white p-6 shadow-sm">
          {status === "in" && user && (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-forest-mid/70">Signed in as {user.email}</p>
              <button type="button" onClick={logout} className="btn-ghost-dark w-full">
                Sign out
              </button>
            </div>
          )}

          {status !== "in" && (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-forest-mid/25 bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:border-gold-cta focus:outline-none"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border border-forest-mid/25 bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:border-gold-cta focus:outline-none"
                />
              </div>

              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy} className={cn("btn-gold w-full", busy && "opacity-60")}>
                {busy ? "Signing in…" : "Sign in"}
              </button>

              <div className="relative py-2 text-center">
                <span className="bg-white px-3 text-xs uppercase tracking-microlabel text-forest-mid/40">
                  or
                </span>
              </div>

              <button type="button" onClick={google} className="btn-ghost-dark w-full">
                Continue with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}