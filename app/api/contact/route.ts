import { clientKey, rateLimited } from "@/lib/ai";
import { profile } from "@/lib/profile";

export const runtime = "nodejs";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  if (rateLimited(`contact:${clientKey(req)}`, 3, 10 * 60_000)) {
    return Response.json({ ok: false, error: "You've sent a few already - I'll get back to you." }, { status: 429 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const name = body.name?.trim().slice(0, 120);
  const email = body.email?.trim().slice(0, 200);
  const message = body.message?.trim().slice(0, 5000);

  if (body.company) return Response.json({ ok: true });
  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "Name, email and message are all needed." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, fallback: "mailto" });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || profile.email,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      html: `<p><strong>${escape(name)}</strong> &lt;${escape(email)}&gt;</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] resend failed", res.status, await res.text());
    return Response.json({ ok: false, fallback: "mailto" });
  }
  return Response.json({ ok: true });
}
