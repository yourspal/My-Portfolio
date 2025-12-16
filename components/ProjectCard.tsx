import { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
      <h3 className="text-2xl font-semibold mb-2">
        {project.title}
      </h3>

      <p className="text-gray-400 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
