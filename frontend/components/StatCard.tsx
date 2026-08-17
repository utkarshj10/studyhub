import { ReactNode } from "react";

export default function StatCard({
  label,
  value,
  icon,
  note,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-black/8 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold text-ink/55">{label}</span>
        <span className="rounded-xl bg-paper p-2 text-accent">{icon}</span>
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight">{value}</div>
      <p className="mt-1 text-xs text-ink/45">{note}</p>
    </div>
  );
}
