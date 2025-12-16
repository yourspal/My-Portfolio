import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built by Tarun Pal using React Native, Next.js, .NET Core, and SQL Server.",
};
export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-8 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Projects</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </main>
  );
}
