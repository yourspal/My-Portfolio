"use client";

import { useState } from "react";
import type { FitResult } from "@/lib/fit";

const sample = `Senior Full Stack Engineer (.NET / React)
We're looking for 4+ years of experience building web applications with C# and .NET Core, REST APIs and SQL Server.
You'll build React and TypeScript front ends and work on authentication (OAuth, MFA) and payment integrations with Stripe.
Nice to have: Docker, Kubernetes, React Native, experience in fintech.`;

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; result: FitResult & { source: "model" | "keywords" } };

export default function FitCheck() {
  const [jd, setJd] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function run() {
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState({ status: "done", result: data });
    } catch (e) {
      setState({ status: "error", message: e instanceof Error ? e.message : "Something went wrong." });
    }
  }

  return (
    <div className="rounded-xl border border-line bg-paper-2/50">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">Role fit check</p>
        <button
          onClick={() => {
            setJd(sample);
            setState({ status: "idle" });
          }}
          className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Use a sample JD
        </button>
      </div>

      <div className="p-5">
        <label htmlFor="jd" className="sr-only">
          Job description
        </label>
        <textarea
          id="jd"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          rows={7}
          placeholder="Paste a job description. I'll compare it against my actual experience - matches, gaps, and an honest score."
          className="w-full resize-y rounded-md border border-line bg-paper p-3 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-muted focus:border-ink/50"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs text-muted">Nothing you paste is stored.</p>
          <button
            onClick={run}
            disabled={jd.trim().length < 40 || state.status === "loading"}
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {state.status === "loading" ? "Reading…" : "Check fit"}
          </button>
        </div>

        {state.status === "error" && <p className="mt-4 text-sm text-accent">{state.message}</p>}

        {state.status === "loading" && (
          <div className="mt-6 space-y-2" aria-hidden>
            {[80, 64, 72].map((w) => (
              <div key={w} className="h-3 animate-pulse rounded bg-line" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {state.status === "done" && <Result result={state.result} />}
      </div>
    </div>
  );
}

function Result({ result }: { result: FitResult & { source: "model" | "keywords" } }) {
  return (
    <div className="mt-6 border-t border-line pt-6" aria-live="polite">
      <div className="flex items-end gap-4">
        <span className="font-serif text-6xl leading-none tabular-nums">{result.score}</span>
        <div className="pb-1">
          <p className="font-medium">{result.verdict}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {result.source === "model" ? "LLM analysis" : "Keyword analysis"}
          </p>
        </div>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
        <div className="bg-brand h-full rounded-full transition-[width] duration-700" style={{ width: `${result.score}%` }} />
      </div>
      <p className="mt-5 leading-relaxed">{result.summary}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {result.matches.length > 0 && (
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ok">Matches</p>
            <ul className="space-y-2 text-sm">
              {result.matches.map((m) => (
                <li key={m.skill}>
                  <span className="font-medium">{m.skill}</span>
                  {m.evidence && <span className="text-muted"> - {m.evidence}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.gaps.length > 0 && (
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">Gaps</p>
            <ul className="space-y-2 text-sm text-muted">
              {result.gaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
