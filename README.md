# Arjun Rawat — AI & Data Engineering Portfolio

A Next.js portfolio with a dark engineering-console design, built around Arjun’s projects, MSc Artificial Intelligence studies at JMU Würzburg and Werkstudent availability.

## Run locally

Use Node 22.18+ (or Node 24) to run the TypeScript-backed unit tests.

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. `npm run build` creates the production build and `npm start` serves it. The dev wrapper accepts `--host`, `--port` and `--strictPort` for managed preview hosts; when `--strictPort` is supplied and a production build exists, it previews that build.

## Features

- Floating section dock with active-section tracking and compact navigation.
- Germany clock with timezone comparisons for India, Lithuania, London, New York and Tokyo.
- Profile camera frame, education, experience and language information.
- Rotating SVG skill graph: pointer drag, keyboard rotation, category selection, pause and reset. No WebGL dependency.
- Animated project conveyor with manual controls and accessible project detail dialogs. Every project also has a shareable `/projects/[slug]` page.
- Learning milestones and a searchable, filterable library of the 51 records carried over from the previous portfolio. Exam-preparation courses are not represented as vendor certifications.
- Live public GitHub repository counts, stars, followers, primary-language counts and recent public-event heatmap. GitHub events are explicitly distinguished from annual contributions.
- Portfolio Q&A assistant that works without an API key using curated portfolio facts. Optional model-backed answers are supported server-side.
- Validated email contact form, delivery error reporting, honeypot, and per-process request limits.
- Responsive layouts, native modal focus containment, reduced-motion support, direct contact links and existing CV download.

## Configuration

Set these in the deployment provider’s environment settings, or in a gitignored `.env.local` for local development. Never commit secrets.

| Variable               | Purpose                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `RESEND_API_KEY`       | Enables contact-form email delivery.                                                                                           |
| `CONTACT_EMAIL`        | Destination inbox. Defaults to the portfolio’s existing email address.                                                         |
| `CONTACT_FROM`         | A sender authorized by Resend. Defaults to `onboarding@resend.dev` for provider testing; use a verified sender for production. |
| `OPENAI_API_KEY`       | Optional AI answer generation. Without this, portfolio search remains available.                                               |
| `OPENAI_MODEL`         | Model identifier available to your OpenAI account. Both this and the API key must be configured to enable AI mode.             |
| `GITHUB_TOKEN`         | Optional server-only token to increase GitHub API rate limits. Only public endpoints are queried.                              |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, including `https://`, used for metadata and sitemap URLs. Defaults to the Vercel homepage configured on this GitHub repository.                              |

If email is unconfigured or delivery fails, the form returns an error and offers direct email; it never claims successful delivery. AI provider errors fall back to portfolio search. No messages are written to application logs. When AI mode is configured, submitted questions are sent to the model provider; the widget asks visitors not to submit sensitive information.

The request limiter is best-effort and per server process. Production deployments with multiple instances should also configure provider-level rate limiting or a shared rate-limit store. Configure spending limits for a public AI endpoint.

## Editing content

- `lib/portfolio.ts`: profile, project links, skills, work history and education.
- `lib/courses.json`: existing learning records.
- `lib/assistant.ts`: portfolio-search knowledge and matching.
- `components/portfolio/`: individual interactive sections.
- `app/globals.css`: design tokens and responsive styles.
- `public/Arjun-rawat-cv.pdf`: retained CV file; replace separately when updating the downloadable CV.

All project repository links were verified during implementation. Other credentials and experience descriptions are carried over from the existing portfolio or supplied background, not independently certified.

## Validation

```sh
npm test
npm run type-check
npm run build
```

See `docs/redesign-review.md` for the feature mapping and browser verification notes.
