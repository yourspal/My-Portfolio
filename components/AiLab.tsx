"use client";

import Section from "./Section";
import FitCheck from "./FitCheck";
import { openAssistant } from "@/lib/events";

export default function AiLab() {
  return (
    <Section id="ai" index="04" label="AI" title={<>Skip the résumé. <em>Interrogate it.</em></>}>
      <div className="grid gap-10 lg:grid-cols-9">
        <div data-reveal="up" className="space-y-6 lg:col-span-3">
          <p className="leading-relaxed text-muted">
            Two small tools that answer from my real work history and nothing else. If something isn&apos;t on record,
            they say so instead of making it up.
          </p>
          <button
            onClick={() => openAssistant()}
            className="group block w-full rounded-xl border border-line p-5 text-left transition-colors hover:border-ink/50"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-muted">Assistant</p>
            <p className="mt-2 font-serif text-2xl">Ask about my work</p>
            <p className="mt-1 text-sm text-muted">Projects, stack, how I approached auth or payments.</p>
            <span className="mt-4 inline-block text-sm text-accent transition-transform group-hover:translate-x-1">
              Open chat →
            </span>
          </button>
          <p className="text-sm leading-relaxed text-muted">
            I use Claude Code, Claude Cowork and Cursor every day. They speed up the typing; the design decisions and
            code review are still mine.
          </p>
        </div>
        <div data-reveal="up" style={{ "--d": "120ms" } as React.CSSProperties} className="lg:col-span-6">
          <FitCheck />
        </div>
      </div>
    </Section>
  );
}
