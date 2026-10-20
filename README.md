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

On serverless hosts such as Vercel the file system is temporary, so connect email (or a database) before going live there.

## Before launch

- Replace every **To confirm** placeholder.
- Have the privacy notice reviewed for each country you operate in.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- Replace sample portfolio content only with real participants who have given written consent.
