import { InputHTMLAttributes } from "react";

export default function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-black/10 bg-paper px-4 py-3.5 outline-none transition placeholder:text-ink/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
      />
    </label>
  );
}
