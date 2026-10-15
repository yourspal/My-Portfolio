# tarun pal - portfolio

Single-page portfolio built with Next.js 16, React 19 and Tailwind 4.

```bash
npm install
npm run dev
```

## Editing content

Everything on the page - roles, projects, skills, education - lives in `lib/profile.ts`.
The AI assistant and the role fit check read from the same file, so update it once and
both stay in sync.

Résumé download: `public/Tarun_Pal_Resume.pdf`. Portrait: `public/tarun.jpg`.

## AI features

- **Ask about me** - chat panel (`/api/chat`), streams answers grounded in `lib/profile.ts`.
- **Role fit check** - paste a JD, get matches, gaps and a score (`/api/fit`).
- **⌘K / Ctrl K** - command menu; typing a question there sends it to the assistant.

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` to use a
real model. Without a key both features still work: the chat uses built-in answers
(`lib/local-answers.ts`) and the fit check uses keyword matching (`lib/fit.ts`).

## Contact form

Set `RESEND_API_KEY` to deliver messages by email. Without it, the form opens the
visitor's mail app with the message pre-filled.

## Deploying

Works on Vercel as-is. Set `NEXT_PUBLIC_SITE_URL` to your domain and add the API keys
as environment variables.
