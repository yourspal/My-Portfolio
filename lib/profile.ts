export const profile = {
  name: "Tarun Pal",
  role: "Senior Software Engineer",
  focus: "Full stack - .NET Core & React",
  location: "Shahjahanpur, India",
  timezone: "Asia/Kolkata",
  email: "tarunpal703@gmail.com",
  phone: "+91 8090328614",
  linkedin: "https://www.linkedin.com/in/tarun-pal-94b2811bb/",
  resume: "/Tarun_Pal_Resume.pdf",
  careerStart: "2023-08-01",
  summary:
    "Full stack engineer building web and mobile products for telecom and financial services clients. I work across the whole request - React and React Native on the front, .NET Core APIs in the middle, SQL Server underneath - and I care most about the unglamorous parts: auth that holds up, payments that reconcile, and queries that stay fast.",
  lookingFor:
    "A senior engineering role where I can own full-stack architecture and delivery end to end.",
};

export type Role = {
  title: string;
  company: string;
  place: string;
  start: string;
  end: string;
  points: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    title: "Software Engineer L1",
    company: "Invia Private Limited",
    place: "Noida",
    start: "Sep 2025",
    end: "Present",
    points: [
      "Architect and ship full-stack apps for telecom and financial services clients, across both B2B and B2C platforms, with React Native and .NET Core.",
      "Built role-based auth for internal .NET Core portals - MFA, password expiration and complexity policies included.",
      "Integrated Stripe into a telecom plan-management app for plan purchases and service payments.",
      "Tuned SQL Server queries and indexes to bring API response times down.",
    ],
    stack: ["React Native", ".NET Core", "SQL Server", "Stripe", "MFA / RBAC"],
  },
  {
    title: "Associate Software Engineer",
    company: "Invia Private Limited",
    place: "Noida",
    start: "Nov 2023",
    end: "Sep 2025",
    points: [
      "Built and maintained modular REST APIs for loyalty programs, recharge workflows and JWT-based authentication.",
      "Shipped scratch cards and referral logic inside user wallets - user engagement went up 25%.",
      "Managed builds and releases through Azure DevOps CI/CD on TFVC.",
    ],
    stack: ["ASP.NET Web API", "JWT", "SQL Server", "Azure DevOps"],
  },
  {
    title: "Trainee Software Engineer",
    company: "Invia Learning Center",
    place: "Noida",
    start: "Aug 2023",
    end: "Nov 2023",
    points: [
      "Delivered production features with React Native, .NET Core and SQL Server.",
      "Wrote reusable React Native components - a social feed UI and stack navigation with React Navigation.",
      "Consumed REST APIs with Fetch and managed lifecycle and side effects with hooks.",
    ],
    stack: ["React Native", "React Navigation", ".NET Core"],
  },
];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  details: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "blaze",
    name: "Blaze Mobile",
    kind: "Telco app · Australia",
    blurb:
      "A telecom app for the Australian market. Customers browse and buy mobile and data plans, manage active services and check their usage.",
    details: [
      "Stripe for plan purchases, renewals and billing workflows.",
      ".NET Core services on SQL Server, with a responsive React front end for plan and service management.",
      "Live on the App Store and Google Play.",
    ],
    stack: ["React Native", "React", ".NET Core", "SQL Server", "Stripe"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/au/app/blazemobile/id6779590367" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.blazemobile" },
    ],
  },
  {
    slug: "optus",
    name: "Optus Price Estimation Portal",
    kind: "Identity & access · Enterprise",
    blurb:
      "An internal pricing portal built in .NET Core, mostly a showcase of what enterprise-grade identity and access management should look like.",
    details: [
      "Role-based access control with MFA on login.",
      "Password policies with expiry and complexity rules.",
      "Session handling aligned with common enterprise security standards.",
    ],
    stack: [".NET Core", "RBAC", "MFA", "SQL Server"],
    links: [{ label: "Portal", href: "https://dev-priceestimationportal.invia2.com.au" }],
  },
  {
    slug: "watchio",
    name: "Watchio",
    kind: "Watch & earn · Web",
    blurb:
      "A web app where users watch content and earn in-app currency, with separate admin and user modules.",
    details: [
      "Admin module for running the platform; user module for watching and earning.",
    ],
    stack: ["Full-stack web", "Admin + user modules"],
    links: [],
  },
  {
    slug: "socially",
    name: "Socially",
    kind: "Social app · Mobile",
    blurb:
      "A social media app in React Native, built around a small kit of reusable components - header, search, card and list.",
    details: [
      "Likes, shares and comments handled through Redux Toolkit, including the API calls.",
      "Shared components kept the screens consistent and quick to build.",
    ],
    stack: ["React Native", "Redux Toolkit"],
    links: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL", "HTML / CSS"] },
  {
    group: "Frameworks",
    items: [".NET Core", "ASP.NET Web API", "React", "React Native", "Redux / RTK", "Node.js", "Express"],
  },
  { group: "Data", items: ["SQL Server", "T-SQL", "Indexing & query tuning"] },
  { group: "Cloud & DevOps", items: ["Azure DevOps CI/CD", "TFVC", "AWS", "Firebase"] },
  { group: "Security", items: ["JWT", "RBAC", "MFA", "Password policy & expiry"] },
  { group: "Payments", items: ["Stripe", "REST API design"] },
  { group: "AI tooling", items: ["Claude Code", "Claude Cowork", "Cursor"] },
  { group: "Tools", items: ["Git", "GitHub", "TFS", "Visual Studio", "VS Code", "SSMS"] },
];

export const education = [
  {
    title: "B.Tech, Information Technology",
    place: "Ajay Kumar Garg Engineering College, Ghaziabad",
  },
  { title: "Intermediate", place: "Kendriya Vidyalaya No. 2 OCF, Shahjahanpur" },
  { title: "High School", place: "Kendriya Vidyalaya No. 2 OCF, Shahjahanpur" },
];

export const certifications = [
  "Full Stack Web Development in .NET Core and SQL Server",
  "Hybrid Mobile Application Development using React Native CLI",
];

export function yearsOfExperience(now = new Date()) {
  const start = new Date(profile.careerStart);
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000);
  return Math.floor(years * 2) / 2;
}

export function profileAsText() {
  const lines: string[] = [];
  lines.push(`# ${profile.name} - ${profile.role} (${profile.focus})`);
  lines.push(`Location: ${profile.location}. Email: ${profile.email}. Phone: ${profile.phone}. LinkedIn: ${profile.linkedin}`);
  lines.push(`Experience: ${yearsOfExperience()}+ years, professional since Aug 2023.`);
  lines.push(`Summary: ${profile.summary}`);
  lines.push(`Looking for: ${profile.lookingFor}`);
  lines.push("\n## Work history");
  for (const r of roles) {
    lines.push(`### ${r.title} - ${r.company}, ${r.place} (${r.start} – ${r.end})`);
    r.points.forEach((p) => lines.push(`- ${p}`));
    lines.push(`Stack: ${r.stack.join(", ")}`);
  }
  lines.push("\n## Projects");
  for (const p of projects) {
    lines.push(`### ${p.name} (${p.kind})`);
    lines.push(p.blurb);
    p.details.forEach((d) => lines.push(`- ${d}`));
    lines.push(`Stack: ${p.stack.join(", ")}`);
    p.links.forEach((l) => lines.push(`${l.label}: ${l.href}`));
  }
  lines.push("\n## Skills");
  skills.forEach((s) => lines.push(`${s.group}: ${s.items.join(", ")}`));
  lines.push("\n## Education");
  education.forEach((e) => lines.push(`${e.title} - ${e.place}`));
  lines.push("\n## Certifications");
  certifications.forEach((c) => lines.push(`- ${c}`));
  return lines.join("\n");
}
