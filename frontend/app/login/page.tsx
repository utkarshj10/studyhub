"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import { apiFetch } from "@/lib/api";
import { saveSession } from "@/lib/auth";
import { AuthResponse } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      saveSession(data.access_token, data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Welcome back." subtitle="Pick up where you left off.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-ink py-3.5 font-bold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-ink/55">
        New to StudyHub?{" "}
        <Link href="/register" className="font-bold text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
