# Site improvement pass — what changed

Work was done in five phases, one commit each on the `site-improvements` branch.

## Phase 1 — Launch blockers

- **Brand config** (`src/content/site.ts`): every unfilled value is marked `// TODO`. New fields: `brandColor`, `bookingUrl`, `pocStartingPrice`, `sameAs`, `lastUpdated`.
- **Logo:** the `Sparkles` mark is replaced by a text + monogram `Logo` component (`components/marketing/logo.tsx`). Swap its monogram `<span>` for an SVG later.
- **Leads are no longer lost:** each demo request is emailed to your sales inbox through Resend (`server/email/send-email.ts`, no new dependency). In production the server **refuses to start** if `RESEND_API_KEY`, `LEADS_FROM_EMAIL` or `LEADS_TO_EMAIL` is missing (`instrumentation.ts`). Logs contain lead IDs only. If delivery fails the visitor sees a clear message with the sales email.
- **Favicon, Apple icon, Open Graph and Twitter images** are generated (`icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`); the default Next assets are deleted.
- **`/solutions` "Common foundation"** section now has content.
- **Consistency:** "4-week proof of concept" everywhere; "regulated industries" reworded; README updated; British spelling kept (see below).

## Phase 2 — Conversion

- Header is now `Solutions ▾`, `Platform ▾`, `Proof of concept`, `Company ▾`, **Book a demo**; the mobile menu matches.
- `/engagement` moved to **`/proof-of-concept`** with a permanent redirect; sitemap and links updated.
- One primary CTA ("Book a demo" → `/contact`); the secondary is "See the 4-week proof of concept".
- Shorter lead form: industry, company size and message are optional. `?industry=` and `?topic=` pre-fill. Honeypot and rate limit unchanged.
- "Book directly" link on `/contact` appears when `SITE.bookingUrl` is set.
- Social-proof scaffolding (`LogoStrip`, `CaseStudyCard`, `TestimonialCard`) fed by empty arrays in `content/proof.ts`. Nothing renders until real data is added.
- Proof-of-concept page: "Fixed fee, agreed up front", optional "From <price>", and "What you need to provide".
- Security page: "Request security package" (email) + link to `/contact?topic=security`, and a typical review timeline.
- Home page reordered and shortened; FAQs are no longer repeated across pages.

## Phase 3 — Visual design

- Hero: faint branded grid and glow; the agent preview animates with CSS only and respects `prefers-reduced-motion`.
- No orphaned cards: `Steps` and `FeatureGrid` choose columns from the item count (`components/marketing/layout-helpers.ts`); solutions grid is 1 / 2 / 4 columns.
- One dark section (`--surface-inverse`, `.theme-inverse`) for Security & trust on the home page; connected step timelines; per-industry accent on solution cards; a distinct icon per agent.
- Larger hero H1, prose-width paragraphs, global visible focus ring.

## Phase 4 — SEO and measurement

- Open Graph and Twitter metadata on every page, including solution pages (`lib/seo.ts`).
- JSON-LD: Organization (logo, address, `sameAs`), FAQPage, BreadcrumbList and Service per solution.
- `/insights` (and `/insights/[slug]`) driven by `content/insights.ts`. While empty it is noindexed and out of the nav and sitemap.
- Cookie-less Plausible analytics, only when `NEXT_PUBLIC_ANALYTICS_DOMAIN` is set; the CSP and `/privacy` text change with it. Events: `cta_click` (with location) and `lead_submitted`.
- Sitemap `lastModified`.

## Phase 5 — Quality

- 17 new Vitest tests (lead schema, lead service, grid/column logic). All 23 tests pass.
- Layout checked at 360, 768, 1024 and 1440 px on 4 pages: no horizontal scroll.
- Success green darkened to `#15803d` for text contrast.

## Needs real data before launch

- Company name, legal entity, sales and security emails, office address (`content/site.ts`)
- Primary market (decides US vs UK spelling), brand color, booking link, proof-of-concept starting price
- Customer logos, case studies and testimonials (`content/proof.ts`)
- Insights articles (`content/insights.ts`)
- Team information and certifications: none are shown; do not add any that are not true
- Real logo and share-image artwork (current ones are generated placeholders)
- Legal review of `/privacy` and `/terms`

## Environment variables to set before deploying

| Variable                                               | Required         | Purpose                                              |
| ------------------------------------------------------ | ---------------- | ---------------------------------------------------- |
| `SITE_URL`                                             | Yes              | Canonical URLs, sitemap, Open Graph                  |
| `RESEND_API_KEY`, `LEADS_FROM_EMAIL`, `LEADS_TO_EMAIL` | Yes (production) | Delivering demo requests; startup fails without them |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN`                         | No               | Turns on cookie-less analytics                       |
| `DATABASE_URL`                                         | No               | Reserved; no database sink exists yet                |
| `ENABLE_CONSOLE`                                       | No               | Internal console, off in production by default       |

## Not done, and why

- **Database copy of leads:** the brief made it optional and no database driver is installed. `DATABASE_URL` only logs a startup warning; implement a sink in `server/db/leads.repository.ts`.
- **Dark mode (Phase 3, item 7, optional):** skipped. The site was deliberately set to a white theme.
- **Lighthouse:** not run (see the hand-off note). Run `npx lighthouse <url> --form-factor=mobile` against `npm run build && npm start` and fix anything below 95.
- **Spelling:** the primary market was still `TODO`, so the existing British spelling was kept and checked for consistency. Switch to American spelling if you sell mainly in the US.
