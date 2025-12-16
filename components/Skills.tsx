import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-semibold mb-8">Skills</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-medium capitalize mb-4">
              {category}
            </h3>

            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-gray-800 text-sm text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
