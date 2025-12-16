export type Experience = {
    company: string;
    role: string;
    duration: string;
    description: string[];
    techStack: string[];
  };
  
  export const experiences: Experience[] = [
    {
      company: "Invia private Limited",
      role: "Software Engineer L1",
      duration: "2023 – Present",
      description: [
        "Developed and maintained a telecom mobile application using React Native.",
        "Built secure backend APIs using .NET Core and SQL Server.",
        "Implemented authentication, plans management, and payment workflows.",
        "Worked on performance optimization and scalable architecture.",
      ],
      techStack: [
        "React Native",
        ".NET Core Web APIs",
        "SQL Server",
        "Azure",
        "Next.js",
      ],
    },
    {
      company: "Invia private Limited",
      role: "Associate Software Engineer",
      duration: "2022 – 2023",
      description: [
        "Built multiple web and mobile applications while learning full stack development.",
        "Implemented authentication, CRUD APIs, and responsive UIs.",
        "Learnt project architecture and deployment.",
      ],
      techStack: [
        "React",
        "ASP .NET MVC",
        "Web APIs",
        "SQL Server",
      ],
    },
  ];
  