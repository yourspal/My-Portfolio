import Section from "./Section";
import { projects } from "@/lib/profile";

export default function Work() {
  return (
    <Section id="work" index="01" label="Selected work" title="Things I've built that people actually use.">
      <ol className="border-t border-line">
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal="up" className="group relative grid gap-6 py-10 md:grid-cols-9">
            <span data-reveal="line" className="absolute inset-x-0 bottom-0 h-px bg-line" style={{ "--d": "150ms" } as React.CSSProperties} aria-hidden />
            <div className="md:col-span-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-3xl leading-tight transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
              </div>
              <p className="mt-1 pl-8 font-mono text-xs uppercase tracking-wider text-muted">{p.kind}</p>
              {p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 pl-8">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
                    >
                      {l.label}
                      <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="pl-8 md:col-span-5 md:pl-0">
              <p className="text-[17px] leading-relaxed">{p.blurb}</p>
              <ul className="mt-4 space-y-2 text-[15px] text-muted">
                {p.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-muted/60" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs text-muted">{p.stack.join("  ·  ")}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
