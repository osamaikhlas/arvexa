import * as React from "react";
import { cn } from "@/lib/utils";

const inputStyles =
  "w-full rounded-sm border border-line bg-surface-200 px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(inputStyles, className)} {...props} />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(inputStyles, "min-h-32 resize-y", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select ref={ref} className={cn(inputStyles, "appearance-none", className)} {...props} />
  ),
);
Select.displayName = "Select";

export interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

/** Label + control + optional hint/error, wired by id/htmlFor. `error` takes
 * over from `hint` when present and marks the control invalid for
 * assistive tech via aria-describedby on the child (set that id to
 * `${id}-error` in the caller). */
function Field({ id, label, hint, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13.5px] font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} role="alert" className="text-xs text-bad">
          {error}
        </span>
      ) : (
        hint && <span className="text-xs text-ink-faint">{hint}</span>
      )}
    </div>
  );
}

export { Input, Textarea, Select, Field };
