# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/neesh-ai` — Neesh AI Landing Page (primary, at `/`)

A cinematic, scroll-driven 3D landing page for Neesh AI — an AI-powered product validation SaaS.

**Tech Stack:**
- React + Vite
- Tailwind CSS
- Framer Motion (UI transitions & scroll animations)
- GSAP + ScrollTrigger (scroll-triggered section animations)
- Lenis smooth scroll
- IBM Plex Sans font, #09daed cyan primary color

**Sections:**
1. Hero — Dark background, floating idea fragment cards, Validation Command Center preview
2. Problem → Solution Loop — Animated 5-node circular loop (Ingest → Generate → Engage → Detect → Refine)
3. Product Simulation — Avatar visitors, chat bubbles, Gap Detection overlay
4. Core Features — 5 glassmorphism feature cards
5. AI Metrics — Circular progress indicators with particle field
6. Persona Insights — 6 hologram-style persona cards
7. Transformation — Split-screen chaos vs clarity with sweep animation
8. Pricing — 3 tier cards (Seedling Free, Founder Pro, Visionary Enterprise)
9. Testimonials — 2 minimal quote cards
10. Final CTA — Cinematic collapse animation
11. Footer — Navigation links and motto

**Design System:**
- Primary: `#09daed` (cyan)
- Background: Dark `#050a12` / white sections for contrast
- Typography: IBM Plex Sans
- Style: Minimal, enterprise, sharp edges (no border-radius), glassmorphism cards

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── neesh-ai/           # Neesh AI Landing Page (primary, /)
│   └── api-server/         # Express API server (/api)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — cross-package imports require `references` in tsconfig.json

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/neesh-ai` (`@workspace/neesh-ai`)

Cinematic landing page. All sections are modular React components under `src/components/sections/`. Uses GSAP ScrollTrigger for scroll-triggered animations and Framer Motion for UI transitions.

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`).

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client.

### `scripts` (`@workspace/scripts`)

Utility scripts package.
