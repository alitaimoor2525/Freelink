"use client";

import Link from "next/link";

export function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(1, ...data);
  const w = 120;
  const h = 36;
  const pts = data
    .map((v, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * w;
      const y = h - (v / max) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-28" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="#D4A017"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatCard({
  label,
  count,
  spark,
  href,
  onClick,
}: {
  label: string;
  count: number;
  spark: number[];
  href: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <p className="font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-4xl font-bold text-forest-mid">{count}</p>
        <Sparkline data={spark} />
      </div>
    </>
  );

  const cls =
    "block rounded-lg border border-forest-mid/15 bg-white p-5 transition-colors hover:border-gold-cta";

  return href === "#" ? (
    <div className={cls}>{inner}</div>
  ) : (
    <Link href={href} onClick={onClick} className={cls}>
      {inner}
    </Link>
  );
}