import Section from "./Section";
import { roles } from "@/lib/profile";

function highlight(text: string) {
  const parts = text.split(/(\d+%)/);
  return parts.map((part, i) =>
    /^\d+%$/.test(part) ? (
      <mark key={i} className="bg-transparent font-medium text-accent">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" title="Three roles, one company, steadily more ownership.">
      <div className="relative space-y-14">
        <div className="absolute bottom-2 left-[3px] top-2 w-[2px] rounded-full bg-line" aria-hidden>
          <div className="timeline-fill bg-brand-y h-full w-full" />
        </div>
        {roles.map((r) => (
          <article key={r.title} data-reveal="up" className="group/role relative grid gap-4 pl-8 md:grid-cols-9">
            <span
              className="absolute left-0 top-1 h-2 w-2 rounded-full border border-accent bg-paper transition-colors duration-700 group-[.is-in]/role:bg-accent"
              aria-hidden
            />
            <div className="md:col-span-3">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {r.start} - {r.end}
              </p>
              {r.end === "Present" && (
                <span className="mt-2 inline-block rounded-sm bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Current
                </span>
              )}
            </div>
            <div className="md:col-span-6">
              <h3 className="text-xl font-medium">{r.title}</h3>
              <p className="text-muted">
                {r.company}, {r.place}
              </p>
              <ul className="mt-5 space-y-3 leading-relaxed">
                {r.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden />
                    <span>{highlight(pt)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs text-muted">{r.stack.join("  ·  ")}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
