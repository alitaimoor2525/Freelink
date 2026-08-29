import { forwardRef, useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";
import { cn } from "@/lib/utils";

export function CheckboxField({
  control,
  name,
  children,
  error,
}: {
  control: Control<FieldValues>;
  name: string;
  children: React.ReactNode;
  error?: unknown;
}) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <label className="flex items-start gap-3 text-sm text-forest-mid/80">
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={field.onChange}
              className="mt-0.5 h-4 w-4 accent-[#D4A017]"
            />
            <span>{children}</span>
          </label>
        )}
      />
      {error ? <p className="field-error">{String(error)}</p> : null}
    </div>
  );
}

/**
 * Toggle-chip group. `multi` renders checkbox-style select (arrays), otherwise
 * radio-style single choice. Styled as bordered pills for a tighter brand look.
 */
export function ChoiceGroup({
  control,
  name,
  options,
  error,
  multi,
}: {
  control: Control<FieldValues>;
  name: string;
  options: readonly string[];
  error?: unknown;
  multi?: boolean;
}) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const isActive = (opt: string) =>
            multi
              ? ((field.value as string[]) || []).includes(opt)
              : field.value === opt;
          const toggle = (opt: string) =>
            multi
              ? field.onChange(
                  (field.value as string[])?.includes(opt)
                    ? (field.value as string[]).filter((v) => v !== opt)
                    : [...((field.value as string[]) || []), opt]
                )
              : field.onChange(opt);
          return (
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => {
                const active = isActive(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    role={multi ? "checkbox" : "radio"}
                    aria-checked={active}
                    aria-pressed={active}
                    onClick={() => toggle(opt)}
                    className={cn(
                      "rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-microlabel transition-colors",
                      active
                        ? "border-gold-cta bg-gold-cta/10 text-gold-cta"
                        : "border-forest-mid/25 text-forest-mid/80 hover:border-gold-cta hover:text-gold-cta"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          );
        }}
      />
      {error ? <p className="field-error">{String(error)}</p> : null}
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  className,
  required,
  id,
}: {
  label: string;
  hint?: string;
  error?: unknown;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  id?: string;
}) {
  const fieldId = id || `field-${label
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={fieldId} className="field-label flex items-center gap-1">
        {label}
        {required && <span className="text-gold-cta" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-forest-mid/60">{hint}</p>}
      {error ? <p className="field-error">{String(error)}</p> : null}
    </div>
  );
}

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn("field-input", className)}
      {...props}
    />
  );
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn("field-input min-h-[120px] resize-y", className)}
      {...props}
    />
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function SelectField({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "field-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%23D4A017%22%3E%3Cpath%20d%3D%22M6%209L1 4h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[right_1rem_center] bg-no-repeat pr-10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export function FileInput({
  onSelect,
  accept = ".pdf,.doc,.docx",
  hint,
  error,
  maxSize = 5 * 1024 * 1024,
}: {
  onSelect: (file: File | null) => void;
  accept?: string;
  hint?: string;
  error?: unknown;
  maxSize?: number;
}) {
  const [name, setName] = useState("");
  const [sizeError, setSizeError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={cn(
          "field-input flex cursor-pointer items-center justify-between gap-4",
          error || sizeError ? "field-error" : undefined
        )}
      >
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > maxSize) {
              setName("");
              setSizeError(`That file is ${(f.size / 1048576).toFixed(1)} MB — keep it under 5 MB.`);
              onSelect(null);
              return;
            }
            setSizeError(null);
            setName(f?.name ?? "");
            onSelect(f);
          }}
        />
        <span className={cn("truncate", name ? "" : "text-forest-mid/40")}>
          {name || "Choose a file"}
        </span>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-microlabel text-gold-cta">
          Browse
        </span>
      </label>
      {hint && !error && !sizeError && <p className="text-xs text-forest-mid/60">{hint}</p>}
      {error ? <p className="field-error">{String(error)}</p> : null}
      {!error && sizeError ? <p className="field-error">{sizeError}</p> : null}
    </div>
  );
}

export function StepDot({ active, done }: { active?: boolean; done?: boolean }) {
  return (
    <span
      className={cn(
        "h-2.5 w-2.5 rounded-full border border-gold-cta transition-colors",
        done && "bg-gold-cta border-gold-cta",
        active && "bg-gold-cta/40"
      )}
    />
  );
}

/**
 * Hidden honeypot trap for spam bots. Visually off-screen, tab-hidden and
 * never announced to screen readers. If anything lands in it the submission
 * is discarded server-side without ever being written to Firestore.
 */
export function HoneypotField({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <div aria-hidden="true" className="sr-only">
      <label htmlFor="hp">Leave this field empty</label>
      <input
        id="hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        {...register("hp")}
      />
    </div>
  );
}