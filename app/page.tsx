import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import AiLab from "@/components/AiLab";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { profile } from "@/lib/profile";

export const revalidate = 86400;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location.split(",")[0], addressCountry: "IN" },
  sameAs: [profile.linkedin],
  knowsAbout: [".NET Core", "C#", "React", "React Native", "SQL Server", "Stripe", "Azure DevOps"],
};

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <AiLab />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Next.js, Tailwind, and a lot of chai. Press ⌘K to get around.</span>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
