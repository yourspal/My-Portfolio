"use client";

import { useEffect, useMemo, useState } from "react";
import { PALETTE_EVENT, openAssistant, toggleTheme } from "@/lib/events";
import { profile } from "@/lib/profile";

type Command = { id: string; label: string; group: string; hint?: string; run: () => void };

const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      { id: "work", label: "Selected work", group: "Go to", run: go("work") },
      { id: "experience", label: "Experience", group: "Go to", run: go("experience") },
      { id: "stack", label: "Stack", group: "Go to", run: go("stack") },
      { id: "fit", label: "Role fit check", group: "Go to", run: go("ai") },
      { id: "about", label: "About", group: "Go to", run: go("about") },
      { id: "contact", label: "Contact", group: "Go to", run: go("contact") },
      { id: "ask", label: "Ask the assistant", group: "Actions", run: () => openAssistant() },
      {
        id: "email",
        label: "Copy email address",
        group: "Actions",
        hint: profile.email,
        run: () => navigator.clipboard.writeText(profile.email),
      },
      {
        id: "resume",
        label: "Download résumé",
        group: "Actions",
        hint: "PDF",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          a.click();
        },
      },
      { id: "linkedin", label: "Open LinkedIn", group: "Actions", run: () => window.open(profile.linkedin, "_blank") },
      { id: "theme", label: "Toggle dark mode", group: "Actions", run: toggleTheme },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q))
      : commands;
    if (!q) return matched;
    return [
      ...matched,
      { id: "ask-q", label: `Ask: “${query.trim()}”`, group: "Assistant", run: () => openAssistant(query.trim()) },
    ];
  }, [commands, query]);

  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setActive(0);
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = show;
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  function run(c: Command) {
    setOpen(false);
    c.run();
  }

  if (!open) return null;

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/20 px-4 pt-[15vh] backdrop-blur-[2px]" onClick={() => setOpen(false)}>
      <div
        role="dialog"
        aria-label="Command menu"
        className="rise w-full max-w-lg overflow-hidden rounded-xl border border-line bg-paper shadow-2xl shadow-black/20"
        style={{ animationDuration: "0.18s" }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              run(results[active]);
            }
          }}
          placeholder="Jump to a section, or type a question…"
          aria-label="Search commands"
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-muted"
        />
        <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="option" aria-selected={i === active}>
                {header && (
                  <p className="px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted first:pt-1">
                    {header}
                  </p>
                )}
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm ${
                    i === active ? "bg-paper-2 text-ink" : "text-ink/80"
                  }`}
                >
                  <span className="truncate">{c.label}</span>
                  {c.hint && <span className="ml-4 shrink-0 font-mono text-xs text-muted">{c.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4 border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">
          <span>↑↓ move</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
