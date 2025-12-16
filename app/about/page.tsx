import Skills from "@/components/Skills";
import Image from "next/image";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Tarun Pal, a Full Stack Developer with experience in React Native, Next.js, and .NET Core.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-8 py-24 max-w-5xl mx-auto">
      <div className="relative mb-8 flex items-end gap-4">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg">
          <Image
            src="/profile.jpg"
            alt="Tarun Pal"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">About Me</h1>
      </div>

      <p className="text-gray-400 text-lg leading-relaxed">
        I am a Full Stack Developer with over 2 years of experience building scalable 
        applications across the entire technology stack. My expertise spans both frontend 
        and backend development, allowing me to deliver end-to-end solutions that combine 
        exceptional user experiences with robust, maintainable architectures.
      </p>

      <p className="text-gray-400 text-lg leading-relaxed mt-6">
        On the backend, I specialize in <strong className="text-white">.NET Core</strong> and <strong className="text-white">C#</strong>, 
        architecting RESTful APIs, microservices, and enterprise applications. I have 
        extensive experience with <strong className="text-white">SQL Server</strong> for database design, optimization, 
        and complex query development. On the frontend, I excel in <strong className="text-white">React Native</strong> 
        for cross-platform mobile development and leverage <strong className="text-white">TypeScript</strong> to write 
        type-safe, maintainable code.
      </p>

      <p className="text-gray-400 text-lg leading-relaxed mt-6">
        I am well-versed in modern development practices including version control with 
        <strong className="text-white"> GitHub</strong>, CI/CD pipelines, and collaborative workflows. I enjoy 
        working on end-to-end products, from UI design and database architecture to 
        implementing business logic and performance optimization. I am committed to 
        continuous learning and thrive in collaborative environments where I can contribute 
        to team success while growing my skills.
      </p>

      <Skills />
    </main>
  );
}
