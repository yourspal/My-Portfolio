import AskBar from "./AskBar";
import LocalTime from "./LocalTime";
import { profile, roles, yearsOfExperience } from "@/lib/profile";

export default function Hero() {
  const current = roles[0];
  const facts = [
    { value: `${Math.floor(yearsOfExperience())}+ yrs`, label: "shipping production web and mobile apps" },
    { value: "25%", label: "engagement lift from wallet scratch cards and referrals" },
    { value: "iOS + Android", label: "Blaze Mobile, live on both stores" },
    { value: "Trainee → L1", label: "in two years at Invia" },
  ];

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <div className="hero-drift">
      <div className="rise flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          Open to senior roles
        </span>
        <span className="hidden h-3 w-px bg-line sm:block" />
        <span>{profile.location}</span>
        <span className="hidden h-3 w-px bg-line sm:block" />
        <LocalTime />
      </div>

      <h1
        className="rise mt-8 max-w-4xl font-serif text-[clamp(2.75rem,7.5vw,6.25rem)] leading-[0.95] tracking-[-0.01em]"
        style={{ animationDelay: "60ms" }}
      >
        Full-stack engineer for <em className="text-brand">telecom &amp; fintech</em>{" "}
        products.
      </h1>
      </div>

      <div className="rise mt-10 grid gap-10 md:grid-cols-12" style={{ animationDelay: "120ms" }}>
        <div className="md:col-span-6">
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m Tarun. I build with <span className="text-ink">.NET Core</span>,{" "}
            <span className="text-ink">React</span>, <span className="text-ink">React Native</span> and{" "}
            <span className="text-ink">SQL Server</span> - mostly the parts that have to be right: auth, payments, and
            APIs under real traffic. Currently {current.title} at {current.company.replace(" Private Limited", "")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              Download résumé
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v8m0 0L2.5 5.5M6 9l3.5-3.5M1 11h10" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/50"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="md:col-span-6">
          <AskBar />
        </div>
      </div>

      <dl
        className="rise mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4"
        style={{ animationDelay: "180ms" }}
      >
        {facts.map((f) => (
          <div key={f.value} className="bg-paper px-5 py-6">
            <dt className="font-serif text-3xl md:text-4xl">{f.value}</dt>
            <dd className="mt-1 text-sm text-muted">{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
