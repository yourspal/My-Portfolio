"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { openPalette, toggleTheme } from "@/lib/events";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#ai", label: "AI" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const noop = () => () => {};

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function currentSection() {
  const line = window.innerHeight * 0.4;
  let active = "";
  for (const n of nav) {
    const el = document.querySelector(n.href);
    if (el && el.getBoundingClientRect().top <= line) active = n.href;
  }
  return active;
}

export default function Header() {
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 12, () => false);
  const active = useSyncExternalStore(subscribeScroll, currentSection, () => "");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const isMac = useSyncExternalStore(noop, () => /Mac|iPhone|iPad/.test(navigator.userAgent), () => true);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl leading-none">Tarun Pal</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted sm:inline">
            / software engineer
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={active === n.href ? "true" : undefined}
              className={`relative transition-colors hover:text-ink ${active === n.href ? "text-ink" : ""}`}
            >
              {n.label}
              <span
                className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand transition-all duration-300 ${
                  active === n.href ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                aria-hidden
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="flex h-8 items-center gap-2 rounded-md border border-line px-2.5 font-mono text-xs text-muted transition-colors hover:border-ink/40 hover:text-ink"
            aria-label="Open command menu"
          >
            <span className="lg:hidden">Menu</span>
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded bg-paper-2 px-1.5 py-0.5 text-[10px] lg:inline">{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-ink/40 hover:text-ink"
            aria-label="Toggle dark mode"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={bar}
        className="bg-brand absolute inset-x-0 -bottom-px h-[2px] origin-left"
        style={{ transform: "scaleX(0)" }}
        aria-hidden
      />
    </header>
  );
}
