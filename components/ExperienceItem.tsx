import { Experience } from "@/data/experience";

type Props = {
  experience: Experience;
  isLast?: boolean;
};

export default function ExperienceItem({ experience, isLast }: Props) {
  return (
    <div className="relative pl-10 pb-12">
      {/* Timeline line */}
      {!isLast && (
        <span className="absolute left-3 top-3 h-full w-px bg-gray-700"></span>
      )}

      {/* Dot */}
      <span className="absolute left-1 top-2 h-5 w-5 rounded-full bg-blue-500"></span>

      <h3 className="text-xl font-semibold">
        {experience.role}
      </h3>

      <p className="text-gray-400">
        {experience.company} • {experience.duration}
      </p>

      <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
        {experience.description.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-4">
        {experience.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
