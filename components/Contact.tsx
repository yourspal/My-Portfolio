"use client";

import { useState } from "react";
import Section from "./Section";
import { profile } from "@/lib/profile";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-md border border-line bg-paper px-3 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted focus:border-ink/50";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else if (json.fallback === "mailto") {
        const subject = encodeURIComponent(`Hello from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n- ${data.name} (${data.email})`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setStatus({ kind: "sent", message: "Opened your mail app with the message filled in." });
      } else {
        setStatus({ kind: "error", message: json.error });
      }
    } catch {
      setStatus({ kind: "error", message: "Couldn't send. Email me directly instead." });
    }
  }

  return (
    <Section id="contact" index="06" label="Contact" title={<>Hiring, or building something? <em>Say hello.</em></>}>
      <div className="grid gap-12 md:grid-cols-9">
        <div data-reveal="up" className="space-y-6 md:col-span-4">
          <p className="leading-relaxed text-muted">
            I usually reply within a day. Email is best; I&apos;m also happy to talk on LinkedIn.
          </p>
          <div className="divide-y divide-line border-y border-line">
            <div className="flex items-center justify-between gap-4 py-4">
              <a href={`mailto:${profile.email}`} className="link-u min-w-0 truncate text-lg">
                {profile.email}
              </a>
              <button
                onClick={copyEmail}
                className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted hover:text-ink"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex justify-between py-4 hover:text-accent">
              <span>{profile.phone}</span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Phone</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex justify-between py-4 hover:text-accent">
              <span>LinkedIn</span>
              <span aria-hidden>↗</span>
            </a>
            <a href={profile.resume} download className="flex justify-between py-4 hover:text-accent">
              <span>Résumé (PDF)</span>
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} data-reveal="up" style={{ "--d": "120ms" } as React.CSSProperties} className="space-y-4 md:col-span-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Name</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Email</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Message</span>
            <textarea name="message" required rows={6} className={`${field} resize-y`} placeholder="A role, a project, or just a question." />
          </label>
          <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {status.kind === "sending" ? "Sending…" : "Send message"}
            </button>
            <p aria-live="polite" className={`text-sm ${status.kind === "error" ? "text-accent" : "text-ok"}`}>
              {status.kind === "sent" && (status.message || "Thanks - it's in my inbox.")}
              {status.kind === "error" && status.message}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
