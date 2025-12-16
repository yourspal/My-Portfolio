import ExperienceItem from "@/components/ExperienceItem";
import { experiences } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen px-8 py-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">
        Experience
      </h1>

      <div>
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.company+index}
            experience={exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </main>
  );
}
