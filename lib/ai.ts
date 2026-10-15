import { profile, profileAsText } from "./profile";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type Provider = "anthropic" | "openai" | "local";

export function activeProvider(): Provider {
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "local";
}

export function systemPrompt() {
  return `You are the assistant on ${profile.name}'s portfolio site. Visitors are mostly recruiters, hiring managers and engineers.

Answer questions about Tarun using only the profile below. Rules:
- Refer to him as "Tarun" (third person). Be direct, specific and brief: 2–5 sentences or a short list.
- Never invent employers, dates, metrics, links or skills. If something isn't in the profile, say so and suggest emailing ${profile.email}.
- Plain prose. No emojis, no marketing words like "passionate", "cutting-edge" or "seamless".
- If asked something unrelated to Tarun or hiring him, politely steer back.

${profileAsText()}`;
}

const encoder = new TextEncoder();

function sseLines(body: ReadableStream<Uint8Array>, pick: (json: unknown) => string | undefined) {
  const decoder = new TextDecoder();
  let buffer = "";
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const text = pick(JSON.parse(data));
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // partial or non-JSON keepalive line
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });
}

export async function streamCompletion(messages: ChatMessage[], system: string) {
  const provider = activeProvider();

  if (provider === "anthropic") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "claude-sonnet-4-5",
        max_tokens: 600,
        system,
        messages,
        stream: true,
      }),
    });
    if (!res.ok || !res.body) throw new Error(`Anthropic ${res.status}`);
    return sseLines(res.body, (j) => {
      const e = j as { type?: string; delta?: { text?: string } };
      return e.type === "content_block_delta" ? e.delta?.text : undefined;
    });
  }

  if (provider === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        max_tokens: 600,
        stream: true,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
    if (!res.ok || !res.body) throw new Error(`OpenAI ${res.status}`);
    return sseLines(res.body, (j) => {
      const e = j as { choices?: { delta?: { content?: string } }[] };
      return e.choices?.[0]?.delta?.content;
    });
  }

  return null;
}

export async function complete(messages: ChatMessage[], system: string) {
  const stream = await streamCompletion(messages, system);
  if (!stream) return null;
  return await new Response(stream).text();
}

export function textStream(text: string, chunkDelayMs = 12) {
  const words = text.split(/(\s+)/);
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const w of words) {
        controller.enqueue(encoder.encode(w));
        await new Promise((r) => setTimeout(r, chunkDelayMs));
      }
      controller.close();
    },
  });
}

const hits = new Map<string, { count: number; reset: number }>();

export function rateLimited(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export function clientKey(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anon";
}
