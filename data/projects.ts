export type Project = {
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
  
  export const projects: Project[] = [
    {
      title: "Blaze Mobile App",
      description:
        "A telecom mobile application built using React Native with a .NET Core backend and SQL Server, supporting authentication, plans, and payments.",
      techStack: [
        "React Native",
        ".NET Core",
        "SQL Server",
        "Azure",
      ],
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Socially",
      description:
        "A social media application similar to Instagram, built while learning the MERN stack with features like posts, likes, comments, and authentication.",
      techStack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
      ],
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website built using Next.js App Router, Tailwind CSS, and Server Components.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      liveUrl: "https://your-portfolio.vercel.app",
    },
  ];
  