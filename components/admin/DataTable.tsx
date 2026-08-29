"use client";

import { useCallback, useEffect, useMemo, useState, Fragment } from "react";
import {
  subscribeSubmissions,
  updateSubmission,
  deleteSubmission,
} from "@/lib/firestore";
import type { ApplicationType, Submission } from "@/lib/types";
import { STATUS_PIPELINE } from "@/lib/types";
import { formatTime, downloadCsv, cn } from "@/lib/utils";
import { DetailDrawer } from "@/components/admin/DetailDrawer";

const badgeTone: Record<string, string> = {
  new: "border-gold-cta/50 bg-gold-cta/10 text-gold-cta",
  reviewed: "border-gold-pale bg-gold-cta/20 text-[color:var(--color-ink)]",
  shortlisted: "border-emerald-200 bg-emerald-100 text-emerald-700",
  matched: "border-emerald-300 bg-emerald-200 text-emerald-800",
  closed: "border-forest-mid/20 bg-forest-mid/10 text-forest-mid/70",
};

type SortKey = "name" | "email" | "category" | "date" | "status";

const dateRanges = [
  { key: "all", label: "All time" },
  { key: "today", label: "Today" },
  { key: "week", label: "This week" },
  { key: "month", label: "This month" },
] as const;

function rangeStart(key: string): number {
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

function nameOf(s: Submission): string {
  if (s.type === "talent") return s.fullName;
  if (s.type === "hiring") return s.companyName;
  return s.businessName;
}
function categoryOf(s: Submission): string {
  if (s.type === "talent") return (s.primarySkills ?? []).join(", ");
  if (s.type === "hiring") return (s.services ?? []).join(", ");
  return s.industry;
}
function emailOf(s: Submission): string {
  return s.email;
}
function searchable(s: Submission): string {
  return `${nameOf(s)} ${emailOf(s)} ${categoryOf(s)} ${s.status}`.toLowerCase();
}

/** Every field of a submission, labelled, ready for inline details / CSV. */
function allFields(s: Submission): Record<string, string> {
  const rows: [string, string, string?][] = [];
  if (s.type === "talent") {
    rows.push(["fullName", s.fullName], ["email", s.email], ["phone", s.phone], ["city", s.city], ["country", s.country]);
    rows.push(["primarySkills", (s.primarySkills ?? []).join(", ")], ["primarySkillsOther", s.primarySkillsOther ?? ""], ["experienceLevel", s.experienceLevel], ["availability", s.availability]);
    rows.push(["portfolioUrl", s.portfolioUrl ?? ""], ["tools", s.tools ?? ""], ["resumeFileUrl", s.resumeFileUrl ?? ""]);
    rows.push(["experienceDetails", s.experienceDetails ?? ""], ["expectedRate", s.expectedRate ?? ""], ["referralSource", s.referralSource ?? ""]);
  } else if (s.type === "hiring") {
    rows.push(["companyName", s.companyName], ["contactName", s.contactName], ["email", s.email], ["phone", s.phone]);
    rows.push(["services", (s.services ?? []).join(", ")], ["otherService", s.otherService ?? ""], ["projectDescription", s.projectDescription]);
    rows.push(["budget", s.budget], ["budgetCurrency", s.budgetCurrency ?? ""], ["deadline", s.deadline], ["referenceFileUrl", s.referenceFileUrl ?? ""], ["additionalNotes", s.additionalNotes ?? ""]);
  } else {
    rows.push(["businessName", s.businessName], ["contactName", s.contactName], ["email", s.email], ["phone", s.phone]);
    rows.push(["industry", s.industry], ["companySize", s.companySize], ["designation", s.designation ?? ""]);
    rows.push(["websiteUrl", s.websiteUrl ?? ""], ["hiringType", s.hiringType], ["workMode", s.workMode], ["rolesHired", s.rolesHired ?? ""], ["whyPartner", s.whyPartner]);
  }
  return Object.fromEntries(rows);
}

/** Labelled detail pairs for the inline expanded row. */
function detailFields(s: Submission): { label: string; value: string; href?: string }[] {
  if (s.type === "talent") {
    return [
      { label: "Full name", value: s.fullName },
      { label: "Email", value: s.email },
      { label: "Phone / WhatsApp", value: s.phone },
      { label: "City", value: s.city },
      { label: "Country", value: s.country },
      { label: "Primary skills", value: (s.primarySkills ?? []).join(", ") },
      ...(s.primarySkillsOther ? [{ label: "Other skills specified", value: s.primarySkillsOther }] : []),
      { label: "Experience level", value: s.experienceLevel },
      { label: "Availability", value: s.availability },
      { label: "Portfolio / work samples", value: s.portfolioUrl ?? "", href: s.portfolioUrl },
      { label: "Software / tools", value: s.tools ?? "" },
      { label: "Resume / portfolio file", value: s.resumeFileUrl ?? "", href: s.resumeFileUrl },
      { label: "Experience details", value: s.experienceDetails ?? "" },
      { label: "Expected minimum rate", value: s.expectedRate ?? "" },
      { label: "How did you hear", value: s.referralSource ?? "" },
    ];
  }
  if (s.type === "hiring") {
    return [
      { label: "Company / business name", value: s.companyName },
      { label: "Contact person", value: s.contactName },
      { label: "Email", value: s.email },
      { label: "Phone / WhatsApp", value: s.phone },
      { label: "Services required", value: (s.services ?? []).join(", ") },
      { label: "Other service", value: s.otherService ?? "" },
      { label: "Project description", value: s.projectDescription },
      { label: "Budget", value: s.budget },
      { label: "Currency", value: s.budgetCurrency ?? "" },
      { label: "Deadline", value: s.deadline },
      { label: "Reference file", value: s.referenceFileUrl ?? "", href: s.referenceFileUrl },
      { label: "Additional notes", value: s.additionalNotes ?? "" },
    ];
  }
  return [
    { label: "Company name", value: s.businessName },
    { label: "Contact person", value: s.contactName },
    { label: "Email", value: s.email },
    { label: "Phone / WhatsApp", value: s.phone },
    { label: "Industry", value: s.industry },
    { label: "Company size", value: s.companySize },
    { label: "Designation", value: s.designation ?? "" },
    { label: "Website / social", value: s.websiteUrl ?? "", href: s.websiteUrl },
    { label: "Types of hiring", value: s.hiringType },
    { label: "Preferred work mode", value: s.workMode },
    { label: "Roles usually hired for", value: s.rolesHired ?? "" },
    { label: "Additional information", value: s.whyPartner },
  ];
}

export function DataTable({ type, title }: { type: ApplicationType; title?: string }) {
  const [list, setList] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return subscribeSubmissions(type, (subs) => {
      setList(subs);
      setLoading(false);
    });
  }, [type]);

  const categories = useMemo(
    () => Array.from(new Set(list.map(categoryOf))).sort(),
    [list]
  );

  const start = rangeStart(dateRange);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list
      .filter((s) => (statusFilter === "all" ? true : s.status === statusFilter))
      .filter((s) => (categoryFilter === "all" ? true : categoryOf(s) === categoryFilter))
      .filter((s) => (dateRange === "all" ? true : s.createdAt >= start))
      .filter((s) => (q ? searchable(s).includes(q) : true))
      .sort((a, b) => {
        let cmp = 0;
        switch (sortKey) {
          case "name":
            cmp = nameOf(a).localeCompare(nameOf(b));
            break;
          case "email":
            cmp = emailOf(a).localeCompare(emailOf(b));
            break;
          case "category":
            cmp = categoryOf(a).localeCompare(categoryOf(b));
            break;
          case "status":
            cmp = a.status.localeCompare(b.status);
            break;
          default:
            cmp = a.createdAt - b.createdAt;
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [list, search, statusFilter, categoryFilter, dateRange, start, sortKey, sortDir]);

  const selectedList = useMemo(
    () => list.filter((s) => selected.has(s.id)),
    [list, selected]
  );

  const selectedSubmission = list.find((s) => s.id === selectedId) ?? null;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "date" ? "desc" : "asc");
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const toggleAll = () => {
    const ids = filtered.map((s) => s.id);
    setSelected((prev) =>
      prev.size === filtered.length ? new Set() : new Set(ids)
    );
  };

  const handleStatus = useCallback(
    async (id: string, st: string) => {
      await updateSubmission(type, id, { status: st });
    },
    [type]
  );

  const bulkMarkReviewed = async () => {
    setBusy(true);
    for (const s of selectedList) await updateSubmission(type, s.id, { status: "reviewed" });
    setSelected(new Set());
    setBusy(false);
  };

  const bulkDelete = async () => {
    const ok = window.confirm(
      `Delete ${selectedList.length} submission(s)? This cannot be undone.`
    );
    if (!ok) return;
    setBusy(true);
    for (const s of selectedList) await deleteSubmission(type, s.id);
    setSelected(new Set());
    setBusy(false);
  };

  const exportCsv = useCallback(async () => {
    const rows = filtered.map((s) => ({
      ...allFields(s),
      status: s.status,
      internalNotes: s.internalNotes ?? "",
      received: formatTime(s.createdAt),
    }));
    downloadCsv(`freelink-${type}-${Date.now()}.csv`, rows);
  }, [filtered, type]);

  const sortHeader = (key: SortKey, label: string) => (
    <th className="py-3 pl-4 pr-4">
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className={cn(
          "font-mono text-[11px] uppercase tracking-microlabel transition-colors",
          sortKey === key ? "text-gold-cta" : "text-forest-mid/50 hover:text-forest-mid"
        )}
      >
        {label} {sortKey === key ? (sortDir === "asc" ? "↑" : "↓") : ""}
      </button>
    </th>
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="microlabel text-gold-cta">{title ?? type}</p>
          <h1 className="mt-1 text-3xl capitalize">{title ?? type} submissions</h1>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="btn-ghost-dark !border-forest-mid/40 !text-forest-mid hover:!border-forest-mid hover:!bg-gold-cta/10"
        >
          Export CSV
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="w-full max-w-sm rounded-md border border-forest-mid/25 bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] placeholder:text-forest-mid/40 focus:border-gold-cta focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-forest-mid/25 bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:border-gold-cta focus:outline-none"
        >
          <option value="all">All statuses</option>
          {STATUS_PIPELINE.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-forest-mid/25 bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:border-gold-cta focus:outline-none"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-md border border-forest-mid/25 bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:border-gold-cta focus:outline-none"
        >
          {dateRanges.map((d) => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
      </div>

{selectedList.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-gold-cta/40 bg-gold-cta/10 px-4 py-3">
          <span className="text-sm font-medium text-forest-mid">
            {selectedList.length} selected
          </span>
          <button
            type="button"
            disabled={busy}
            onClick={bulkMarkReviewed}
            className="rounded-md border border-forest-mid/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel text-forest-mid hover:border-gold-cta hover:text-gold-cta disabled:opacity-50"
          >
            Mark as reviewed
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={bulkDelete}
            className="rounded-md border border-red-300 px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel text-red-700 hover:border-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-forest-mid/15 bg-white">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-forest-mid/10 text-left">
              <th className="w-10 py-3 pl-4 pr-2">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-[#D4A017]"
                  aria-label="Select all"
                />
              </th>
              {sortHeader("name", "Name / Company")}
              {sortHeader("email", "Email")}
              {sortHeader("category", "Category")}
              {sortHeader("date", "Submitted")}
              {sortHeader("status", "Status")}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <Fragment key={s.id}>
                <tr
                  onClick={() => setSelectedId(s.id)}
                  className="cursor-pointer border-b border-forest-mid/5 transition-colors hover:bg-gold-pale/40"
                >
                  <td className="py-4 pl-4 pr-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => toggleExpand(s.id)}
                      aria-label={expandedId === s.id ? "Collapse details" : "Show all details"}
                      className={cn(
                        "mr-2 inline-flex h-6 w-6 items-center justify-center rounded-sm border border-forest-mid/20 font-mono text-xs text-forest-mid/70 transition-transform",
                        expandedId === s.id ? "rotate-90 text-gold-cta" : ""
                      )}
                    >
                      ›
                    </button>
                    <input
                      type="checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggleSelect(s.id)}
                      className="h-4 w-4 accent-[#D4A017]"
                      aria-label={`Select ${nameOf(s)}`}
                    />
                  </td>
                  <td className="py-4 pl-4 pr-4 font-semibold text-forest-mid">{nameOf(s)}</td>
                  <td className="py-4 pr-4 text-forest-mid/60">{emailOf(s)}</td>
                  <td className="py-4 pr-4 text-forest-mid/70">{categoryOf(s)}</td>
                  <td className="py-4 pr-4 text-forest-mid/60">{formatTime(s.createdAt)}</td>
                  <td className="py-4 pr-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={s.status}
                      onChange={(e) => handleStatus(s.id, e.target.value)}
                      className={cn(
                        "cursor-pointer rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-microlabel focus:outline-none",
                        badgeTone[s.status] ?? "border-forest-mid/30 text-forest-mid"
                      )}
                    >
                      {STATUS_PIPELINE.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expandedId === s.id && (
                  <tr className="border-b border-forest-mid/10 bg-gold-pale/20">
                    <td colSpan={6} className="px-6 py-5">
                      <p className="font-mono text-[11px] uppercase tracking-microlabel text-gold-cta">
                        All details
                      </p>
                      <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                        {detailFields(s).map((f) =>
                          f.value ? (
                            <div key={f.label}>
                              <dt className="font-mono text-[10px] uppercase tracking-microlabel text-forest-mid/50">
                                {f.label}
                              </dt>
                              <dd className="mt-0.5 break-words text-sm text-forest-mid/90">
                                {f.href ? (
                                  <a
                                    href={f.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-gold-cta underline-offset-2 hover:text-gold-cta"
                                  >
                                    {f.value}
                                  </a>
                                ) : (
                                  f.value
                                )}
                              </dd>
                            </div>
                          ) : null
                        )}
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-microlabel text-forest-mid/50">
                            Received
                          </dt>
                          <dd className="mt-0.5 text-sm text-forest-mid/90">
                            {formatTime(s.createdAt)}
                          </dd>
                        </div>
                      </dl>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 text-center text-forest-mid/40">
                  Nothing here yet — or nothing matches that filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DetailDrawer
        submission={selectedSubmission}
        type={type}
        onStatus={(id, st) => handleStatus(id, st)}
        onNotes={(id, notes) => updateSubmission(type, id, { internalNotes: notes })}
        onDelete={(id) => deleteSubmission(type, id)}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
