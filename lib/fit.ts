import { yearsOfExperience } from "./profile";

export type FitResult = {
  score: number;
  verdict: string;
  matches: { skill: string; evidence: string }[];
  gaps: string[];
  summary: string;
};

type Term = { name: string; patterns: string[]; evidence?: string };

const catalog: Term[] = [
  { name: "C#", patterns: ["c#", "csharp"], evidence: "Primary backend language at Invia" },
  { name: ".NET Core", patterns: [".net", "dotnet", "asp.net", "net core"], evidence: "All backend services at Invia; Optus portal" },
  { name: "REST APIs", patterns: ["rest api", "rest apis", "restful", "web api", "api design"], evidence: "Loyalty, recharge and wallet APIs" },
  { name: "SQL Server", patterns: ["sql server", "t-sql", "tsql", "mssql"], evidence: "Query and index tuning that cut API latency" },
  { name: "SQL", patterns: ["sql", "relational database", "rdbms"], evidence: "Daily T-SQL work" },
  { name: "React", patterns: ["react", "react.js", "reactjs"], evidence: "Blaze Mobile web front end" },
  { name: "React Native", patterns: ["react native", "react-native"], evidence: "Blaze Mobile, Socially" },
  { name: "TypeScript", patterns: ["typescript"], evidence: "Front-end codebases" },
  { name: "JavaScript", patterns: ["javascript", "es6"], evidence: "Front-end and Node work" },
  { name: "Redux", patterns: ["redux", "rtk"], evidence: "Redux Toolkit in Socially" },
  { name: "Node.js", patterns: ["node", "node.js", "express"], evidence: "Node.js and Express" },
  { name: "Azure DevOps / CI/CD", patterns: ["azure devops", "ci/cd", "cicd", "pipelines", "continuous integration"], evidence: "Builds and releases via Azure DevOps" },
  { name: "Azure", patterns: ["azure"], evidence: "Azure DevOps delivery" },
  { name: "AWS", patterns: ["aws", "amazon web services"], evidence: "Cloud deployments" },
  { name: "Firebase", patterns: ["firebase"], evidence: "Cloud deployments" },
  { name: "Authentication / JWT", patterns: ["jwt", "oauth", "authentication", "identity"], evidence: "JWT auth APIs; Optus identity work" },
  { name: "RBAC / MFA", patterns: ["rbac", "role-based", "role based", "mfa", "multi-factor", "2fa", "authorization"], evidence: "Optus Price Estimation Portal" },
  { name: "Payments / Stripe", patterns: ["stripe", "payment", "payments", "billing"], evidence: "Stripe in Blaze Mobile" },
  { name: "Git", patterns: ["git", "github", "version control"], evidence: "Git, GitHub, TFS" },
  { name: "Mobile", patterns: ["mobile", "ios", "android"], evidence: "Two React Native apps, one live on both stores" },
  { name: "Fintech / Telecom", patterns: ["fintech", "financial services", "telecom", "telco"], evidence: "Current client domains" },
  { name: "AI-assisted development", patterns: ["ai tools", "copilot", "cursor", "claude", "llm", "genai", "generative ai"], evidence: "Claude Code, Cursor in daily workflow" },
  { name: "Full stack", patterns: ["full stack", "full-stack", "fullstack"], evidence: "Owns features from UI to database" },

  { name: "Java", patterns: ["java", "spring"] },
  { name: "Python", patterns: ["python", "django", "flask", "fastapi"] },
  { name: "Go", patterns: ["golang"] },
  { name: "Angular", patterns: ["angular"] },
  { name: "Vue", patterns: ["vue"] },
  { name: "Next.js", patterns: ["next.js", "nextjs"] },
  { name: "PostgreSQL", patterns: ["postgres", "postgresql"] },
  { name: "MongoDB", patterns: ["mongo", "mongodb"] },
  { name: "Kubernetes", patterns: ["kubernetes", "k8s"] },
  { name: "Docker", patterns: ["docker", "containers", "containerization"] },
  { name: "Microservices", patterns: ["microservice"] },
  { name: "GraphQL", patterns: ["graphql"] },
  { name: "Kafka / messaging", patterns: ["kafka", "rabbitmq", "service bus", "message queue"] },
  { name: "Terraform / IaC", patterns: ["terraform", "infrastructure as code", "bicep"] },
  { name: "Swift / Kotlin native", patterns: ["swift", "kotlin"] },
  { name: "Team leadership", patterns: ["lead a team", "people management", "manage a team", "mentoring", "mentor"] },
];

function mentions(text: string, pattern: string) {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9+#])`, "i").test(text);
}

export function localFit(jd: string): FitResult {
  const text = jd.toLowerCase();
  const found = catalog.filter((t) => t.patterns.some((p) => mentions(text, p)));

  const deduped = found.filter((t) => {
    if (t.name === "SQL" && found.some((f) => f.name === "SQL Server")) return false;
    if (t.name === "Azure" && found.some((f) => f.name === "Azure DevOps / CI/CD")) return false;
    if (t.name === "React" && found.some((f) => f.name === "React Native") && !/react(?!\s*native)/i.test(jd)) return false;
    return true;
  });

  const matches = deduped.filter((t) => t.evidence).map((t) => ({ skill: t.name, evidence: t.evidence! }));
  const gaps = deduped.filter((t) => !t.evidence).map((t) => t.name);

  const yearsAsked = [...text.matchAll(/(\d{1,2})\s*\+?\s*(?:-\s*\d{1,2}\s*)?(?:years|yrs)/g)].map((m) => Number(m[1]));
  const minYears = yearsAsked.length ? Math.min(...yearsAsked) : 0;
  const have = yearsOfExperience();
  if (minYears > have) gaps.push(`${minYears}+ years asked (Tarun has ${have}+)`);

  const total = matches.length + gaps.length;
  let score = total === 0 ? 0 : Math.round((matches.length / total) * 100);
  if (minYears > have + 2) score = Math.max(0, score - 15);
  if (total === 0) {
    return {
      score: 0,
      verdict: "Not enough to go on",
      matches: [],
      gaps: [],
      summary: "I couldn't find recognisable requirements in that text. Paste the full job description, including the skills and experience sections.",
    };
  }

  const verdict = score >= 75 ? "Strong fit" : score >= 50 ? "Good fit with gaps" : "Partial fit";
  const top = matches.slice(0, 4).map((m) => m.skill).join(", ");
  const summary =
    matches.length === 0
      ? "Very little overlap with Tarun's stack - this role leans on technologies he hasn't worked with professionally."
      : `Overlap on ${top}${matches.length > 4 ? ` and ${matches.length - 4} more` : ""}.` +
        (gaps.length ? ` Gaps: ${gaps.slice(0, 3).join(", ")}${gaps.length > 3 ? ` and ${gaps.length - 3} more` : ""}.` : " No obvious gaps against the listed requirements.");

  return { score, verdict, matches, gaps, summary };
}
