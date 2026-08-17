"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Priority } from "@/types";

export default function NewTaskModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    subject: string;
    description: string;
    priority: Priority;
    due_date: string | null;
  }) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await onCreate({
        title,
        subject,
        description,
        priority,
        due_date: dueDate || null,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-5 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-accent">
              New task
            </p>
            <h2 className="mt-1 text-2xl font-black">What needs doing?</h2>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 hover:bg-paper">
            <X />
          </button>
        </div>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <Input label="Task title" value={title} onChange={setTitle} placeholder="Finish DSA assignment" required />
          <Input label="Subject" value={subject} onChange={setSubject} placeholder="Data Structures" required />

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-bold">Priority</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full rounded-2xl border border-black/10 bg-paper px-4 py-3 outline-none focus:border-accent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-paper px-4 py-3 outline-none focus:border-accent"
              />
            </label>
          </div>

          <label>
            <span className="mb-2 block text-sm font-bold">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-black/10 bg-paper px-4 py-3 outline-none placeholder:text-ink/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
          </label>

          <button
            disabled={loading}
            className="mt-2 w-full rounded-2xl bg-ink py-3.5 font-bold text-white transition hover:bg-accent disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add task"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-paper px-4 py-3 outline-none placeholder:text-ink/30 focus:border-accent focus:ring-4 focus:ring-accent/10"
      />
    </label>
  );
}
