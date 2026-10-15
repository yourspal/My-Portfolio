import { activeProvider, clientKey, rateLimited, streamCompletion, systemPrompt, textStream, type ChatMessage } from "@/lib/ai";
import { localAnswer } from "@/lib/local-answers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (rateLimited(clientKey(req))) {
    return new Response("Too many questions in a minute - give it a moment.", { status: 429 });
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m: ChatMessage) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-10)
      .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const last = messages.at(-1);
  if (!last || last.role !== "user") return new Response("Bad request", { status: 400 });

  const headers = {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store",
    "x-ai-provider": activeProvider(),
  };

  try {
    const stream = await streamCompletion(messages, systemPrompt());
    if (stream) return new Response(stream, { headers });
  } catch (err) {
    console.error("[chat] provider failed, using local answers", err);
  }

  return new Response(textStream(localAnswer(last.content)), {
    headers: { ...headers, "x-ai-provider": "local" },
  });
}
