import { clientKey, complete, rateLimited, systemPrompt } from "@/lib/ai";
import { localFit, type FitResult } from "@/lib/fit";

export const runtime = "nodejs";

const instructions = `Compare the job description against Tarun's profile and reply with JSON only, no code fences:
{"score": 0-100, "verdict": "Strong fit" | "Good fit with gaps" | "Partial fit", "matches": [{"skill": string, "evidence": string}], "gaps": [string], "summary": string}
- "evidence" must point to something real in the profile (a role, project or result), under 12 words.
- "gaps" lists requirements from the JD that the profile does not show. Be honest; don't stretch.
- "summary" is 2 sentences, written for a recruiter.
- Score fairly: required skills weigh more than nice-to-haves.`;

function parse(raw: string): FitResult | null {
  try {
    const json = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
    if (typeof json.score !== "number" || !Array.isArray(json.matches) || !Array.isArray(json.gaps)) return null;
    return {
      score: Math.max(0, Math.min(100, Math.round(json.score))),
      verdict: String(json.verdict ?? ""),
      matches: json.matches.slice(0, 12).map((m: { skill: unknown; evidence: unknown }) => ({
        skill: String(m.skill),
        evidence: String(m.evidence ?? ""),
      })),
      gaps: json.gaps.slice(0, 10).map(String),
      summary: String(json.summary ?? ""),
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (rateLimited(`fit:${clientKey(req)}`, 8)) {
    return Response.json({ error: "Too many requests - try again in a minute." }, { status: 429 });
  }

  const { jd } = (await req.json().catch(() => ({}))) as { jd?: string };
  if (!jd || jd.trim().length < 40) {
    return Response.json({ error: "Paste a bit more of the job description." }, { status: 400 });
  }
  const text = jd.slice(0, 8000);

  try {
    const raw = await complete(
      [{ role: "user", content: `${instructions}\n\nJob description:\n"""${text}"""` }],
      systemPrompt(),
    );
    const parsed = raw ? parse(raw) : null;
    if (parsed) return Response.json({ ...parsed, source: "model" });
  } catch (err) {
    console.error("[fit] provider failed, using keyword analysis", err);
  }

  return Response.json({ ...localFit(text), source: "keywords" });
}
