import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  multiline?: boolean;
  invalid?: boolean;
  onValueChange: (value: string) => void;
};

export function FormField({
  label,
  hint,
  multiline,
  invalid,
  name,
  required,
  value,
  onValueChange,
  ...props
}: Props) {
  const classes =
    "w-full rounded-lg border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 aria-[invalid=true]:border-red-400";
  return (
    <div className={multiline ? "tablet:col-span-2" : ""}>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          id={name}
          name={name}
          required={required}
          rows={5}
          className={`${classes} resize-y`}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${name}-hint` : undefined}
        />
      ) : (
        <input
          {...props}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          id={name}
          name={name}
          required={required}
          className={classes}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${name}-hint` : undefined}
        />
      )}
      {hint && (
        <p
          id={`${name}-hint`}
          className="mt-2 text-xs leading-relaxed text-muted"
        >
          {hint}
        </p>
      )}
    </div>
  );
}
