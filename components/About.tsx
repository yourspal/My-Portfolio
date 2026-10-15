import Image from "next/image";
import Section from "./Section";
import { certifications, education, profile } from "@/lib/profile";

export default function About() {
  return (
    <Section id="about" index="05" label="About">
      <div className="grid gap-10 md:grid-cols-9">
        <figure className="md:col-span-3">
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-2">
            <Image
              src="/tarun.jpg"
              alt="Tarun Pal"
              fill
              sizes="(min-width: 768px) 280px, 100vw"
              className="parallax object-cover grayscale-[15%] transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            {profile.location}
          </figcaption>
        </figure>

        <div data-reveal="up" style={{ "--d": "120ms" } as React.CSSProperties} className="md:col-span-6">
          <p className="font-serif text-3xl leading-snug md:text-[2.1rem]">
            I started as a trainee writing React Native screens and now design the backend, the database and the app
            on top of it.
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>{profile.summary}</p>
            <p>
              Most of my work is for telecom and financial services clients - plan purchases, wallets, loyalty,
              recharges, and the access control around all of it. {profile.lookingFor}
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Education</h3>
              <ul className="space-y-3">
                {education.map((e) => (
                  <li key={e.title}>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-muted">{e.place}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Certifications</h3>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="font-medium">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
