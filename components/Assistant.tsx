"use client";

import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ASK_EVENT } from "@/lib/events";

type Msg = { role: "user" | "assistant"; content: string };

const starters = [
  "Summarise his experience in three lines",
  "What did he do on the Optus portal?",
  "How strong is his SQL Server work?",
  "How do I contact him?",
];

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (/^\*\*.+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part))
      return (
        <a key={i} href={part.replace(/[).,]+$/, "")} target="_blank" rel="noreferrer" className="break-all underline underline-offset-2">
          {part}
        </a>
      );
    if (/@/.test(part) && /^[\w.+-]+@/.test(part))
      return (
        <a key={i} href={`mailto:${part.replace(/[.]+$/, "")}`} className="underline underline-offset-2">
          {part}
        </a>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Rendered({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))) {
          return (
            <ul key={i} className="my-2 space-y-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-muted">–</span>
                  <span>{inline(l.replace(/^\s*([-*•]|\d+\.)\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-2 first:mt-0 last:mb-0">
            {inline(block.replace(/^#+\s*/gm, ""))}
          </p>
        );
      })}
    </>
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export default function Assistant() {
  const pastHero = useSyncExternalStore(subscribeScroll, () => window.scrollY > window.innerHeight * 0.8, () => false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const history = useRef<Msg[]>([]);

  const send = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q) return;
    const next: Msg[] = [...history.current, { role: "user", content: q }];
    history.current = [...next, { role: "assistant", content: "" }];
    setMessages(history.current);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      setProvider(res.headers.get("x-ai-provider"));
      if (!res.ok || !res.body) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        history.current = [...next, { role: "assistant", content: acc }];
        setMessages(history.current);
      }
    } catch (e) {
      const msg = e instanceof Error && e.message ? e.message : "Something went wrong. Try again in a moment.";
      history.current = [...next, { role: "assistant", content: msg }];
      setMessages(history.current);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) send(q);
      else setTimeout(() => inputRef.current?.focus(), 50);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(ASK_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(ASK_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [send]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => {
          setOpen((o) => !o);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-line bg-ink py-2.5 pl-3 pr-4 text-sm font-medium text-paper shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 ${
          open || !pastHero ? "pointer-events-none translate-y-2 opacity-0" : ""
        }`}
        aria-label="Ask about Tarun"
        tabIndex={open || !pastHero ? -1 : 0}
      >
        <span className="grid h-5 w-5 place-items-center bg-brand rounded-full font-mono text-[10px] text-white">
          ?
        </span>
        Ask about me
      </button>

      <div
        role="dialog"
        aria-label="Ask about Tarun"
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-paper transition-all duration-200 sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(600px,calc(100vh-6rem))] sm:w-[400px] sm:rounded-xl sm:border sm:border-line sm:shadow-2xl sm:shadow-black/15 ${
          open ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div>
            <p className="font-serif text-xl leading-none">Ask about Tarun</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
              {provider === "local" || provider === null ? "Answers from résumé data" : "AI · grounded in résumé data"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={() => {
                  history.current = [];
                  setMessages([]);
                }}
                className="rounded px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-ink"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded text-muted hover:text-ink"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-4 text-[15px] leading-relaxed">
          {messages.length === 0 ? (
            <div>
              <p className="text-muted">
                I answer from Tarun&apos;s work history - roles, projects, stack. If it&apos;s not on record I&apos;ll say
                so.
              </p>
              <div className="mt-5 space-y-2">
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-md border border-line px-3 py-2 text-left text-sm transition-colors hover:border-ink/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-lg bg-paper-2 px-3 py-2">{m.content}</p>
                  </div>
                ) : (
                  <div key={i} className={busy && i === messages.length - 1 ? "caret" : ""}>
                    {m.content ? <Rendered text={m.content} /> : <span className="text-muted">Thinking</span>}
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!busy) send(input);
          }}
          className="border-t border-line p-3"
        >
          <div className="flex items-end gap-2 rounded-lg border border-line bg-paper-2/50 p-2 focus-within:border-ink/50">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!busy) send(input);
                }
              }}
              rows={1}
              maxLength={2000}
              placeholder="Ask a question…"
              aria-label="Your question"
              className="max-h-32 min-h-[1.75rem] flex-1 resize-none bg-transparent px-1 py-0.5 outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-md bg-ink px-3 py-1 text-sm text-paper transition-opacity disabled:opacity-30"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
