"use client";

import { useState } from "react";
import { openAssistant } from "@/lib/events";

const prompts = [
  "What did he build for Blaze Mobile?",
  "How has he handled MFA and RBAC?",
  "Any Stripe experience?",
  "Is he a fit for a .NET lead role?",
];

export default function AskBar() {
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    openAssistant(q.trim() || undefined);
    setQ("");
  }

  return (
    <div>
      <form
        onSubmit={submit}
        className="group flex items-center gap-3 rounded-lg border border-line bg-paper-2/60 py-2 pl-4 pr-2 transition-colors focus-within:border-ink/50"
      >
        <span className="font-mono text-sm text-accent" aria-hidden>
          &gt;
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask anything about my work…"
          aria-label="Ask the assistant about Tarun's work"
          className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          Ask
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
        {prompts.map((p) => (
          <button key={p} onClick={() => openAssistant(p)} className="link-u text-left hover:text-ink">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
