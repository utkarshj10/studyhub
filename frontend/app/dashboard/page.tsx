"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Clock3, LogOut, Plus, Target, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import StatCard from "@/components/StatCard";
import NewTaskModal from "@/components/NewTaskModal";
import { apiFetch } from "@/lib/api";
import { clearSession, getToken, getUser } from "@/lib/auth";
import { DashboardStats, Priority, Task, User } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = getUser();
    const token = getToken();

    if (!currentUser || !token) {
      router.replace("/login");
      return;
    }

    setUser(currentUser);
    loadData(token);
  }, [router]);

  async function loadData(token = getToken()!) {
    try {
      const [taskData, statsData] = await Promise.all([
        apiFetch<Task[]>("/api/tasks", { token }),
        apiFetch<DashboardStats>("/api/tasks/stats/summary", { token }),
      ]);
      setTasks(taskData);
      setStats(statsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load dashboard.";
      setError(message);
      if (message.toLowerCase().includes("token") || message.toLowerCase().includes("authentication")) {
        handleLogout();
      }
    }
  }

  async function createTask(data: {
    title: string;
    subject: string;
    description: string;
    priority: Priority;
    due_date: string | null;
  }) {
    const token = getToken();
    if (!token) return;

    try {
      await apiFetch<Task>("/api/tasks", {
        method: "POST",
        token,
        body: JSON.stringify(data),
      });
      setShowModal(false);
      await loadData(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create task.");
    }
  }

  async function toggleTask(task: Task) {
    const token = getToken();
    if (!token) return;

    try {
      await apiFetch<Task>(`/api/tasks/${task.id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ completed: !task.completed }),
      });
      await loadData(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update task.");
    }
  }

  async function deleteTask(task: Task) {
    const token = getToken();
    if (!token) return;

    try {
      await apiFetch<void>(`/api/tasks/${task.id}`, {
        method: "DELETE",
        token,
      });
      await loadData(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete task.");
    }
  }

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);

      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.subject.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper">
        <div className="text-sm font-bold text-ink/50">Loading your workspace...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper">
      <nav className="border-b border-black/5 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="font-black tracking-tight">
                study<span className="text-accent">hub</span>
              </div>
              <div className="hidden text-[11px] font-medium text-ink/40 sm:block">
                personal study workspace
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-ink/55 hover:bg-black/5 hover:text-ink"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-ink/45">{today}</p>
            <h1 className="mt-1 text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Hey, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-2 text-ink/55">Let's make today's progress count.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5"
          >
            <Plus size={19} />
            New task
          </button>
        </header>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total tasks" value={stats?.total ?? 0} icon={<Target size={18} />} note="Everything on your list" />
          <StatCard label="Completed" value={stats?.completed ?? 0} icon={<CheckCircle2 size={18} />} note="Tasks you've finished" />
          <StatCard label="Pending" value={stats?.pending ?? 0} icon={<Clock3 size={18} />} note="Still waiting on you" />
          <StatCard label="Progress" value={`${stats?.completion_rate ?? 0}%`} icon={<Zap size={18} />} note="Overall completion rate" />
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Your tasks</h2>
              <p className="mt-1 text-sm text-ink/45">
                Keep the list small, clear, and actionable.
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-accent md:w-64"
            />
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {(["all", "pending", "completed"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${
                  filter === value
                    ? "bg-ink text-white"
                    : "bg-white text-ink/50 hover:bg-black/5"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task)}
                  onDelete={() => deleteTask(task)}
                />
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/50 px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent shadow-sm">
                  <BookOpen />
                </div>
                <h3 className="mt-5 text-lg font-black">Nothing here yet.</h3>
                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-ink/45">
                  Add a task and start building your study momentum.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {showModal && (
        <NewTaskModal
          onClose={() => setShowModal(false)}
          onCreate={createTask}
        />
      )}
    </main>
  );
}
