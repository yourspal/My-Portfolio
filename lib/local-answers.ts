import { certifications, education, profile, projects, roles, yearsOfExperience } from "./profile";

type Intent = { keys: string[]; answer: () => string; weight?: number };

const intents: Intent[] = [
  {
    keys: ["watchio", "watch and earn", "watch & earn"],
    answer: () =>
      "Watchio is a full web application where users watch content and earn in-app currency. Tarun built it with separate admin and user modules.",
  },
  {
    keys: ["socially", "social media", "social app"],
    answer: () =>
      "Socially is a social media app Tarun built in React Native. It's organised around reusable components (header, search, card, list), and uses Redux Toolkit for likes, shares, comments and the API calls behind them.",
  },
  {
    keys: ["fit", "lead", "senior", "suitable", "good candidate", "why hire", "why should"],
    answer: () =>
      `Tarun has ${yearsOfExperience()}+ years shipping full-stack .NET Core and React / React Native products, with depth in auth (JWT, RBAC, MFA), Stripe payments and SQL Server tuning, and he's moved from trainee to L1 in two years. He's aiming for a senior role. For a specific job, paste the description into the Role fit check on this page - it lists matches and gaps honestly.`,
  },
  {
    keys: ["blaze", "blaze mobile", "telco", "telecom", "app store", "play store", "mobile app", "australia"],
    answer: () => {
      const p = projects.find((x) => x.slug === "blaze")!;
      return `${p.name} is a telecom app for the Australian market - customers buy mobile and data plans, manage active services and check usage. Tarun built the .NET Core + SQL Server backend and the React front end, and integrated Stripe for purchases, renewals and billing. It's live on the App Store and Google Play.`;
    },
  },
  {
    keys: ["optus", "optus portal", "price estimation", "portal", "mfa", "rbac", "role-based", "role based", "authorization", "authentication", "auth", "password", "security", "identity"],
    answer: () =>
      "Security is a recurring theme in Tarun's work. On the Optus Price Estimation Portal (.NET Core) he implemented role-based access control, multi-factor authentication, and password policies with expiry and complexity rules, plus enterprise-style session management. Earlier he built JWT-based authentication for loyalty and recharge APIs.",
  },
  {
    keys: ["stripe", "payment", "payments", "billing", "checkout"],
    answer: () =>
      "Tarun integrated Stripe into a telecom plan-management app (Blaze Mobile), covering plan purchases, renewals and billing workflows, with the payment logic living in .NET Core services.",
  },
  {
    keys: ["sql", "database", "query", "queries", "index", "indexing", "performance", "optimi"],
    answer: () =>
      "SQL Server is Tarun's main database - T-SQL, indexing and query tuning. At Invia he optimised queries and indexing strategies to cut API response times on production services.",
  },
  {
    keys: [".net", "dotnet", "c#", "csharp", "backend", "back end", "api", "apis", "rest"],
    answer: () =>
      "On the backend Tarun works in C# with .NET Core and ASP.NET Web API. He has built modular REST APIs for loyalty programs, recharge workflows, wallets (scratch cards and referrals) and payments, backed by SQL Server.",
  },
  {
    keys: ["react native", "mobile", "ios", "android"],
    answer: () =>
      "Tarun has shipped React Native since his trainee days - reusable component kits, React Navigation stacks, Redux Toolkit for state and API calls. Blaze Mobile, his most recent mobile work, is live on both app stores.",
  },
  {
    keys: ["react", "frontend", "front end", "redux", "typescript", "javascript", "ui"],
    answer: () =>
      "On the front end Tarun uses React and React Native with TypeScript, and Redux / Redux Toolkit for state. He also has Node.js and Express experience.",
  },
  {
    keys: ["azure", "devops", "ci/cd", "cicd", "deploy", "aws", "firebase", "cloud", "tfvc", "pipeline"],
    answer: () =>
      "Tarun deploys and manages builds through Azure DevOps CI/CD with TFVC version control, and has worked with AWS and Firebase for cloud deployments.",
  },
  {
    keys: ["ai", "claude", "cursor", "llm", "copilot", "gpt"],
    answer: () =>
      "Tarun works with AI-assisted development tools - Claude Code, Claude Cowork and Cursor - as part of his everyday workflow. The assistant you're talking to is a small example: it answers from his resume data and nothing else.",
  },
  {
    keys: ["engagement", "impact", "metric", "result", "achievement", "scratch", "referral", "wallet"],
    answer: () =>
      "One concrete result: Tarun launched scratch cards and referral logic inside user wallets, which raised user engagement by 25%. He also reduced API response times through SQL Server query and index tuning.",
  },
  {
    weight: 0.3,
    keys: ["experience", "years", "work history", "career", "job", "jobs", "company", "invia", "current", "role"],
    answer: () => {
      const list = roles.map((r) => `${r.title} at ${r.company} (${r.start} – ${r.end})`).join("; ");
      return `Tarun has ${yearsOfExperience()}+ years of professional experience, all at Invia: ${list}.`;
    },
  },
  {
    weight: 0.3,
    keys: ["project", "projects", "built", "portfolio", "watchio", "socially"],
    answer: () =>
      `Key projects: ${projects.map((p) => `${p.name} (${p.kind.toLowerCase()})`).join(", ")}. Ask about any of them for details.`,
  },
  {
    keys: ["education", "degree", "college", "university", "b.tech", "btech", "study", "school"],
    answer: () => `${education[0].title} from ${education[0].place}. Schooling at ${education[1].place}.`,
  },
  {
    keys: ["certif", "course"],
    answer: () => `Certifications: ${certifications.join("; ")}.`,
  },
  {
    weight: 0.3,
    keys: ["contact", "email", "phone", "reach", "hire", "available", "availability", "notice", "open to", "looking", "relocat", "remote"],
    answer: () =>
      `Tarun is open to senior engineering roles where he can own full-stack architecture and delivery. The fastest way to reach him is ${profile.email}, or LinkedIn: ${profile.linkedin}. For specifics like notice period or relocation, email him directly - I'd rather not guess.`,
  },
  {
    keys: ["where", "location", "based", "city", "live"],
    answer: () => `Tarun is based in ${profile.location} (IST, UTC+5:30).`,
  },
  {
    weight: 0.3,
    keys: ["skill", "skills", "stack", "tech", "technologies", "tools", "strength"],
    answer: () =>
      "Core stack: C#, .NET Core and ASP.NET Web API on the backend; React, React Native and TypeScript on the front; SQL Server for data; Azure DevOps, AWS and Firebase for delivery. Strong areas are auth (JWT, RBAC, MFA), Stripe payments and SQL performance.",
  },
];

const fallback = `I couldn't match that to anything in Tarun's profile. Try asking about his experience, Blaze Mobile, auth and security work, Stripe payments, or his stack - or email ${profile.email} for anything else.`;

export function localAnswer(question: string) {
  const q = ` ${question.toLowerCase()} `;
  let best: { score: number; intent?: Intent } = { score: 0 };
  for (const intent of intents) {
    const score = intent.keys.reduce((s, k) => {
      const re = new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}`, "i");
      return re.test(q) ? s + k.length : s;
    }, 0) * (intent.weight ?? 1);
    if (score > best.score) best = { score, intent };
  }
  if (/^\s*(hi|hello|hey|yo|hola)\b/.test(question.toLowerCase()) && best.score < 4) {
    return "Hi - I can answer questions about Tarun's experience, projects and stack. What would you like to know?";
  }
  return best.intent ? best.intent.answer() : fallback;
}
