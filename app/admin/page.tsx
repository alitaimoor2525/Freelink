"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminGate } from "@/components/admin/AdminGate";
import { StatCard } from "@/components/admin/StatCard";
import { subscribeSubmissions } from "@/lib/firestore";
import type { ApplicationType, Submission } from "@/lib/types";
import { SUBMISSION_TYPE_LABELS } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TYPES: ApplicationType[] = ["talent", "hiring", "partner"];

type RangeKey = "today" | "week" | "month" | "all";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "all", label: "All Time" },
];

function rangeStart(key: RangeKey): number {
  const now = Date.now();
  const d = new Date();
  if (key === "today") {
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }
  if (key === "week") return now - 7 * 24 * 60 * 60 * 1000;
  if (key === "month") return now - 30 * 24 * 60 * 60 * 1000;
  return 0;
}

function inRange(s: Submission, start: number): boolean {
  return s.createdAt >= start;
}

function buckets(list: Submission[], start: number, n = 12): number[] {
  const now = Date.now();
  const min = start === 0 ? Math.min(now - 30 * 24 * 60 * 60 * 1000, ...list.map((s) => s.createdAt), now) : start;
  const span = Math.max(now - min, 1);
  const out = new Array(n).fill(0);
  for (const s of list) {
    const idx = Math.min(n - 1, Math.floor(((s.createdAt - min) / span) * n));
    out[idx] += 1;
  }
  return out;
}

export default function AdminOverviewPage() {
  return (
    <AdminGate>
      <Overview />
    </AdminGate>
  );
}

function Overview() {
  const [all, setAll] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<RangeKey>("week");

  useEffect(() => {
    const unsub = TYPES.map((t) =>
      subscribeSubmissions(t, (list) => {
        setAll((prev) => [...prev.filter((s) => s.type !== t), ...list]);
        setLoading(false);
      })
    );
    return () => unsub.forEach((u) => u());
  }, []);

  const start = rangeStart(range);
  const filtered = useMemo(() => all.filter((s) => inRange(s, start)), [all, start]);

  const byType = useMemo(
    () =>
      TYPES.reduce(
        (acc, t) => ({ ...acc, [t]: filtered.filter((s) => s.type === t) }),
        {} as Record<ApplicationType, Submission[]>
      ),
    [filtered]
  );

  const weekStart = rangeStart("week");
  const newThisWeek = useMemo(
    () => all.filter((s) => s.createdAt >= weekStart).length,
    [all, weekStart]
  );

  const recent = useMemo(
    () => [...all].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10),
    [all]
  );

  const cards = [
    {
      label: "Total Talent Submissions",
      count: byType.talent.length,
      spark: buckets(byType.talent, start),
      href: "/admin/talent",
    },
    {
      label: "Total Hiring Requests",
      count: byType.hiring.length,
      spark: buckets(byType.hiring, start),
      href: "/admin/business",
    },
    {
      label: "Total Partner Applications",
      count: byType.partner.length,
      spark: buckets(byType.partner, start),
      href: "/admin/partners",
    },
    {
      label: "New This Week",
      count: newThisWeek,
      spark: buckets(all.filter((s) => s.createdAt >= weekStart), weekStart),
      href: "/admin",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="animate-float text-4xl font-bold text-gold-cta">∞</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="microlabel text-gold-cta">Admin</p>
          <h1 className="mt-1 text-3xl">Overview</h1>
          <p className="mt-2 text-sm text-forest-mid/60">
            Everything across all three submission types, at a glance.
          </p>
        </div>
        <div className="flex gap-1 rounded-sm border border-forest-mid/15 bg-white p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRange(r.key)}
              className={cn(
                "rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel transition-colors",
                range === r.key
                  ? "bg-gold-cta text-deep-forest"
                  : "text-forest-mid/60 hover:text-forest-mid"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <StatCard
            key={c.label}
            label={c.label}
            count={c.count}
            spark={c.spark}
            href={c.href}
          />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl text-forest-mid">Recent activity</h2>
        <div className="mt-4 overflow-x-auto rounded-md border border-forest-mid/15 bg-white">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-forest-mid/10 text-left font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
                <th className="py-3 pl-4 pr-4">Type</th>
                <th className="py-3 pr-4">Name / Company</th>
                <th className="py-3 pr-4">Detail</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((s) => (
                <tr key={`${s.type}-${s.id}`} className="border-b border-forest-mid/5">
                  <td className="py-3 pl-4 pr-4 font-mono text-xs uppercase text-gold-cta">
                    {SUBMISSION_TYPE_LABELS[s.type]}
                  </td>
                  <td className="py-3 pr-4 font-medium text-forest-mid">{nameOf(s)}</td>
                  <td className="py-3 pr-4 text-forest-mid/70">{detailOf(s)}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-block rounded-full border border-gold-cta/40 bg-gold-cta/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-microlabel text-gold-cta">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-forest-mid/60">{formatTime(s.createdAt)}</td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-forest-mid/40">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function nameOf(s: Submission): string {
  if (s.type === "talent") return s.fullName;
  if (s.type === "hiring") return s.companyName;
  return s.businessName;
}
function detailOf(s: Submission): string {
  if (s.type === "talent") return (s.primarySkills ?? []).join(", ");
  if (s.type === "hiring") return (s.services ?? []).join(", ");
  return s.industry;
}
