# Company — Enterprise Agentic AI Website

Next.js 16 (App Router) + TypeScript. A marketing website for an agentic-AI software company serving **law, finance and healthcare**, plus a small internal console. No login/auth. The server exposes **no public REST API**: pages are rendered on the server and forms/mutations use Server Actions.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script                            | Purpose             |
| --------------------------------- | ------------------- |
| `npm run dev` / `build` / `start` | Run / build / serve |
| `npm run typecheck`               | `tsc --noEmit`      |
| `npm run lint` / `lint:fix`       | ESLint              |
| `npm run format` / `format:check` | Prettier            |
| `npm test` / `test:watch`         | Vitest              |

## Before you launch (checklist)

1. **Brand & contact:** edit [`src/content/site.ts`](src/content/site.ts) — company name, legal name, emails, address.
2. **Set `SITE_URL`** to your real origin (canonical URLs, sitemap, Open Graph). See `.env.example`.
3. **Verify every claim.** Copy in `src/content/` describes product capabilities, controls and framework alignment (SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, NIST AI RMF, SSO/SCIM, VPC deployment, "never trains on your data", pen-testing…). Keep only what is true for your product today. No customer names, logos, testimonials or metrics are included — add real ones when you have them.
4. **Legal review** of `/privacy` and `/terms` (these are starting templates, not legal advice).
5. **Wire up leads:** demo requests are stored in memory only (lost on restart). Implement `LeadsRepository` in [`src/server/db/leads.repository.ts`](src/server/db/leads.repository.ts) against your CRM/database and add a sales notification in `leads.service.ts`.
6. **Internal console** (`/dashboard`, `/users`) has **no authentication**. It is on in development and **returns 404 in production** unless `ENABLE_CONSOLE=true`. Only enable it on a private deployment, or delete `src/app/(dashboard)`, `src/features/users` and related server files.
7. Add a social/OG image and favicon; add analytics only if you want it (the privacy policy currently states there is none).

## Site map

`/` · `/solutions` · `/solutions/law` · `/solutions/finance` · `/solutions/healthcare` · `/platform` · `/security` · `/how-we-work` · `/engagement` · `/about` · `/contact` (demo request) · `/privacy` · `/terms` · `/sitemap.xml` · `/robots.txt`

## Editing content

All copy is typed data in `src/content/` — no component edits needed:

| File           | Contains                                                        |
| -------------- | --------------------------------------------------------------- |
| `site.ts`      | Brand, contact details, navigation                              |
| `solutions.ts` | Law / Finance / Healthcare: agents, workflows, governance, FAQs |
| `company.ts`   | Platform features, security pillars, process, engagement, FAQs  |

Adding a vertical = add an entry to `SOLUTIONS` (pages, nav, sitemap and cards update automatically).

## Stack

Tailwind CSS 4 · Radix UI + `class-variance-authority` · lucide-react · TanStack Query & Table v9 · Zustand · React Hook Form + Zod 4 · Vitest.

## Structure

```
src/
  app/
    (marketing)/       Public website pages + header/footer layout
    (dashboard)/       Internal console (gated by ENABLE_CONSOLE)
    sitemap.ts robots.ts
  content/             All website copy (typed)
  components/
    marketing/         Section, PageHero, FeatureGrid, Steps, Faq, CtaBanner, header, footer
    shared/            data-table/, form/, modal/, feedback/ (reused across site + console)
    ui/                Primitives
  features/<name>/     leads/ (demo form), users/ (console): schemas, actions, components
  server/              Server-only: env, createAction(), services, repositories, rate limiting
```

**Flow:** form → Server Action (`createAction`: Zod validate → per-IP rate limit → error mapping) → service → repository. Actions return `{ ok, data | error }` and never throw to the client.

## Security & privacy

- No `/api/*` routes; Server Actions are POST-only, same-origin enforced by Next.js, IDs encrypted per build, bodies capped at 100 KB.
- Every action validates with Zod; internals are never returned to the client.
- Demo form: honeypot field + 5 submissions/hour/IP; log lines contain IDs only, never personal data.
- Headers: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy: no-referrer`, COOP/CORP, `Permissions-Policy` (FLoC/Topics off); `X-Powered-By` removed; production source maps off.
- Public pages are indexable; the console is `noindex` and disallowed in `robots.txt`.
- No analytics or cookies; Next.js telemetry disabled in npm scripts.

> **Limits:** anything a browser calls is visible in DevTools — this removes a readable, scriptable API, not network visibility. Rate limiting is per-instance and in-memory (use Redis for multiple instances) and trusts `X-Forwarded-For`, so run behind a proxy you control. CSP allows inline scripts (Next bootstrap); move to nonces to tighten.
