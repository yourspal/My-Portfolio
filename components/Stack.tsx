import Section from "./Section";
import { skills } from "@/lib/profile";

export default function Stack() {
  return (
    <Section id="stack" index="03" label="Stack" title="What I reach for.">
      <dl className="grid border-t border-line sm:grid-cols-2">
        {skills.map((s, i) => (
          <div
            key={s.group}
            data-reveal="up"
            style={{ "--d": `${(i % 2) * 90 + Math.floor(i / 2) * 40}ms` } as React.CSSProperties}
            className={`border-b border-line py-5 ${i % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8"}`}
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">{s.group}</dt>
            <dd className="mt-2 text-[17px] leading-relaxed">{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
