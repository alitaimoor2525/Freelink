"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/Auth";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/talent", label: "Talent" },
  { href: "/admin/business", label: "Business" },
  { href: "/admin/partners", label: "Partners" },
] as const;

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, status, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && (status !== "in" || !user)) {
      router.replace("/admin/login");
    }
  }, [status, user, router]);

  if (status === "loading" || status !== "in" || !user) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-cream">
        <span className="animate-float text-5xl font-bold text-gold-cta">∞</span>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream text-[color:var(--color-ink)]">
      <div className="border-b border-forest-mid/10 bg-white/70 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold text-gold-cta">∞</span>
              <span className="font-mono text-xs font-bold uppercase tracking-microlabel text-forest-mid">
                Admin
              </span>
            </Link>
            <nav className="flex gap-1">
              {tabs.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel transition-colors",
                    pathname === t.href
                      ? "bg-gold-cta/15 text-gold-cta"
                      : "text-forest-mid/70 hover:text-forest-mid"
                  )}
                >
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-forest-mid/50">
              {user.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-forest-mid/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/70 hover:border-gold-cta hover:text-gold-cta"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      <div className="container py-10">{children}</div>
    </section>
  );
}
