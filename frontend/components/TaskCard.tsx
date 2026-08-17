"use client";

import { Check, Circle, Clock3, Trash2 } from "lucide-react";
import { Task } from "@/types";

const priorityStyles = {
  low: "bg-sage/20 text-ink",
  medium: "bg-sand text-ink",
  high: "bg-accent/10 text-accent",
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <article
      className={`group rounded-3xl border border-black/8 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-soft ${
        task.completed ? "opacity-65" : ""
      }`}
    >
      <div className="flex gap-4">
        <button
          onClick={onToggle}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
          className="mt-0.5 shrink-0 text-ink/25 transition hover:text-accent"
        >
          {task.completed ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
              <Check size={15} />
            </span>
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-bold ${
                task.completed ? "line-through text-ink/45" : ""
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${priorityStyles[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-ink/45">
            <span>{task.subject}</span>
            {task.due_date && (
              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {new Date(task.due_date + "T00:00:00").toLocaleDateString()}
              </span>
            )}
          </div>

          {task.description && (
            <p className="mt-3 text-sm leading-6 text-ink/55">
              {task.description}
            </p>
          )}
        </div>

        <button
          onClick={onDelete}
          aria-label="Delete task"
          className="self-start rounded-xl p-2 text-ink/20 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}
