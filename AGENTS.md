# AGENTS.md

## Project Overview

AI-powered credit scoring platform for Pakistani SMEs. Built with Next.js 16 App Router (frontend) + Python FastAPI (backend).

## Quick Reference

```bash
# All commands run from frontend/ directory
cd frontend
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint (next/core-web-vitals + typescript)
```

**Package manager**: pnpm (not npm). Root `.npmrc` has `shamefully-hoist=true`.

## Architecture

```
frontend/src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, SmoothScroll wrapper
│   ├── page.tsx                # Landing page (all sections)
│   ├── globals.css             # Tailwind v4 theme tokens + base styles
│   ├── (auth)/
│   │   ├── login/page.tsx      # Login with demo credentials card
│   │   └── signup/page.tsx     # Signup with account type selector
│   └── (dashboard)/
│       ├── layout.tsx          # Dashboard layout: responsive sidebar + header
│       └── dashboard/
│           ├── page.tsx        # Overview: stats, score breakdown, activity
│           ├── upload/page.tsx # Data upload with drag-drop
│           ├── score/page.tsx  # Credit score report + recommendations
│           ├── transactions/page.tsx  # Transaction list (table/cards)
│           └── settings/page.tsx      # Settings placeholder
└── components/
    ├── ui/                     # Reusable: Button (variant/size props)
    ├── layout/                 # Navbar (landing), Footer
    ├── dashboard/              # Sidebar, Header (responsive)
    ├── sections/               # Hero, PainPoints, HowItWorks, Features, Demo, DualAudience, SocialProof, CTA
    ├── animations/             # TextReveal, ScrollReveal, AnimatedCounter
    └── SmoothScroll.tsx        # Lenis smooth scroll wrapper (client component)
```

## Key Conventions

- **Tailwind v4**: Uses `@theme inline` in `globals.css` for custom tokens. Custom colors: `ink`, `teal`, `coral`, `amber`, `slate`, `muted`. Font vars: `--font-display`, `--font-body`, `--font-mono`.
- **Fonts**: Space Grotesk (display), DM Sans (body), JetBrains Mono (mono) via `next/font/google` with CSS variable approach.
- **Client components**: Most section/animation/dashboard components use `"use client"` for Framer Motion + Lenis.
- **Path alias**: `@/*` → `./src/*`
- **Icons**: `lucide-react` throughout
- **Animations**: `framer-motion` for scroll-triggered reveals and transitions
- **Route groups**: `(auth)` for login/signup (no sidebar), `(dashboard)` for app pages (with sidebar)

## Gotchas

- **Tailwind v4 `@theme inline`**: Custom CSS rules after `@theme` must be inside `@layer base {}` or they won't compile. Bare CSS rules get stripped.
- **Framer Motion SSR**: Components using `useScroll`, `useTransform`, `motion` need `"use client"` directive.
- **Lenis**: Wraps entire app in root `layout.tsx`. Initializes via `useEffect` — no SSR concerns.
- **Dashboard layout**: Uses `"use client"` + useState for mobile sidebar toggle. Import `globals.css` as `../globals.css` (not `./globals.css`).
- **Next.js 16.2.9**: Uses Turbopack by default for dev. If cache corrupts, delete `.next/` and restart.
- **ESLint**: Flat config format (eslint.config.mjs), not `.eslintrc`.

## Demo Credentials

- Email: `segademo@gmail.com`
- Password: `masasu`
- Displayed on login page card for judges

## Frontend → Backend API Contract

```
POST   /api/auth/login        → { email, password } → { token, user }
POST   /api/auth/signup       → { name, email, password, type } → { token, user }
POST   /api/upload            → multipart file upload → { fileId, status }
POST   /api/score             → { fileId } → { score, factors, recommendations }
GET    /api/transactions      → list of transactions
GET    /api/user/profile      → user info + score
```

**Credit scoring factors (5):**
- Cash Flow Regularity (35%)
- Revenue Trend (25%)
- Expense Management (20%)
- Business Longevity (10%)
- Digital Footprint (10%)

## Backend Tech Stack

- Python FastAPI
- In-memory dict storage (no database for hackathon)
- Pandas for data processing
- OCR for receipt/invoice extraction

## Skills (`.agents/skills/`)

13 skills installed. Key ones for this project:
- `nextjs-developer` — App Router patterns
- `frontend-design` — Design system guidance
- `vercel-react-best-practices` — React/Next.js optimization
- `animated-component-libraries` — Framer Motion patterns
- `implement_lenis_scroll` — Smooth scroll setup
- `banking-expert` — Domain knowledge for credit scoring features
