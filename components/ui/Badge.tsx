import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  none: "border-forest-mid/30 text-forest-mid",
  new: "border-gold-cta/50 bg-gold-cta/10 text-gold-cta",
  reviewed: "border-gold-pale bg-gold-cta/20 text-[color:var(--color-ink)]",
  shortlisted: "border-emerald-200 bg-emerald-100 text-emerald-700",
  matched: "border-emerald-300 bg-emerald-200 text-emerald-800",
  active: "border-emerald-300 bg-emerald-200 text-emerald-800",
  closed: "border-forest-mid/20 bg-forest-mid/10 text-forest-mid/70",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-microlabel",
        tones[tone] ?? tones.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}