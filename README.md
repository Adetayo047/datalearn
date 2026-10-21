# DataLearn website

Next.js 15 (React, Node.js) site for DataLearn: *From learning to proven work.*

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, for editing
npm run build && npm start   # production build
```

Needs Node.js 20 or newer.

## Where things live

| What | Where |
|---|---|
| All page copy: journey, stages, tracks, FAQs, values, metrics | `content/site.ts` |
| Form questions (apply, project brief, sponsor, contact) | `lib/forms.ts` |
| Colours, fonts, spacing (brand tokens) | `app/globals.css` (top of file) |
| Pages | `app/<page>/page.tsx` |
| Logo | `components/Logo.tsx`, `app/icon.svg` |

Text marked with a yellow **To confirm** label on the site is a placeholder (fees, dates, email, legal form, team). Search for `ToConfirm` to find them all.

## Forms

Submissions are validated on the server and saved one per line in `data/submissions/<form>.jsonl` (not committed to git).
Spam protection: a hidden honeypot field, a minimum fill time and a per-IP rate limit.

To also receive each submission by email, copy `.env.example` to `.env.local` and set the Resend variables.

On Vercel the file system is read-only, so submissions are written to the function logs (Vercel → Project → Logs, search `[submission]`) instead of files. Set the Resend variables so every submission is also emailed to you.

## FAQ chatbot

The "Ask a question" button opens an AI assistant that answers only from the website's own content (`lib/knowledge.ts` builds its instructions from `content/site.ts`, so updating the site updates the bot).

- Set `OPENAI_API_KEY` to switch it on. Without it, the assistant tells visitors to use the contact form.
- `OPENAI_MODEL` is optional (default `gpt-5-mini`). Any chat model your OpenAI account can use will work.
- Each visitor is limited to 20 questions per 10 minutes, and only the last 10 messages are sent to OpenAI.

## Deploying to Vercel

1. If this folder sits inside a larger repository, set **Root Directory** to `website` in the Vercel project settings.
2. Add environment variables in Vercel → Project → Settings → Environment Variables: `OPENAI_API_KEY`, `NEXT_PUBLIC_SITE_URL`, and the three Resend variables.
3. Redeploy. If Vercel reports a vulnerable Next.js version, update `next` to the latest patched release and redeploy with a clean build cache.

## Before launch

- Replace every **To confirm** placeholder.
- Have the privacy notice reviewed for each country you operate in.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- Replace sample portfolio content only with real participants who have given written consent.
