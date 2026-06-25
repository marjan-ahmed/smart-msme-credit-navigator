# AGENTS.md

> **Purpose**: This file gives any AI agent full context about this project. If you're a new team member's AI agent reading this, treat this as your single source of truth. Understand the problem, the solution, the architecture, and every technical decision before writing any code.

---

## Problem Statement

Pakistan has **5.2 million MSMEs** (Micro, Small & Medium Enterprises) that contribute **40% to GDP** and employ **80% of the non-agricultural workforce**. Despite this:

- **90% of SMEs are unbanked or underbanked** — they can't get loans from banks
- **Reason**: SMEs don't have formal financial records. Their business runs on WhatsApp (sending invoices via chat), paper receipts, hand-written ledgers, and Excel sheets
- **Banks reject them** because they can't assess creditworthiness without formal documentation
- **Result**: SMEs are stuck in a poverty trap — they need capital to grow but can't get capital without formal records

### The Gap

Banks have lending APIs and digital scoring models, but they only work with structured data (bank statements, tax returns). SMEs have data — it's just informal and scattered across WhatsApp chats, receipt photos, and spreadsheets. **Nobody is bridging this gap.**

---

## Our Idea: Smart MSME Credit Navigator

An AI-powered platform that **transforms informal SME business data into bank-ready credit profiles**.

### How It Works (User Journey)

1. **SME Owner** signs up and selects "SME Owner" account type
2. They **upload their business data** — can be:
   - WhatsApp chat exports (text files with invoices)
   - Receipt/invoice photos (OCR extracts data)
   - Excel/CSV transaction logs
3. **AI processes the data** — extracts transactions, categorizes income/expenses, identifies patterns
4. **Credit score is generated** using 5 factors (see below)
5. SME gets a **digital credit profile** they can share with banks
6. **Bank** can log in, view the credit profile, and make lending decisions

### The Dual-Audience

This platform serves TWO audiences:
- **SME Owners**: Get a credit score and digital profile they never had access to
- **Banks**: Get a pipeline of verified, scored SMEs they can lend to confidently

---

## Credit Scoring Model

We use a **5-factor weighted scoring system**. Each factor has a weight that contributes to the final score (0-100):

| Factor | Weight | What It Measures |
|--------|--------|------------------|
| **Cash Flow Regularity** | 35% | How consistent are the money inflows? Regular income = reliable borrower |
| **Revenue Trend** | 25% | Is the business growing, stable, or declining over time? |
| **Expense Management** | 20% | What's the income-to-expense ratio? Healthy margins = lower risk |
| **Business Longevity** | 10% | How long has the business been operating? Older = more stable |
| **Digital Footprint** | 10% | How digitized are their transactions? Digital records = easier to verify |

### Scoring Logic (for Saad to implement)

```
Final Score = (CashFlow × 0.35) + (Revenue × 0.25) + (Expense × 0.20) + (Longevity × 0.10) + (Digital × 0.10)
```

Score ranges:
- **80-100**: Excellent — ready for bank lending
- **60-79**: Good — may need some documentation
- **40-59**: Fair — needs improvement before bank approval
- **0-39**: Poor — significant financial issues

---

## Tech Stack

### Frontend (DONE — deployed on Vercel)
- **Framework**: Next.js 16.2.9 (App Router + Turbopack)
- **Package Manager**: pnpm (NOT npm — root `.npmrc` has `shamefully-hoist=true`)
- **Styling**: Tailwind CSS v4 with `@theme inline` custom tokens
- **Animations**: Framer Motion (scroll reveals, transitions)
- **Smooth Scroll**: Lenis (wraps entire app)
- **Icons**: lucide-react
- **Fonts**: Space Grotesk (display), DM Sans (body), JetBrains Mono (mono)
- **Deployed at**: https://sega-smart-credit.vercel.app

### Backend (Structure done — Saad to implement)
- **Framework**: FastAPI (Python)
- **Package Manager**: uv
- **Server**: Uvicorn
- **Data Processing**: Pandas
- **OCR**: For receipt/invoice extraction
- **Storage**: In-memory Python dict (NO database — hackathon constraint)
- **Config**: pydantic-settings + .env file

### Backend Directory Structure
```
backend/
├── main.py              # FastAPI app with CORS, route includes
├── pyproject.toml       # uv project config
├── .env                 # Environment variables
├── .gitignore           # Python gitignore
├── app/
│   ├── api/
│   │   ├── auth.py      # Login/signup endpoints (PLACEHOLDER)
│   │   └── score.py     # Upload, score, transactions, profile (PLACEHOLDER)
│   ├── models/
│   │   ├── user.py      # User, Token, UserCreate Pydantic models
│   │   └── business.py  # Transaction, CreditScore, FileUpload models
│   ├── services/
│   │   └── credit_score.py  # CreditScoreService with 5-factor logic
│   └── core/
│       └── config.py    # Settings via pydantic-settings
```

---

## Frontend Architecture

```
frontend/src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, SmoothScroll wrapper
│   ├── page.tsx                # Landing page (composes all sections)
│   ├── globals.css             # Tailwind v4 theme tokens + base styles
│   ├── (auth)/                 # Route group — NO sidebar
│   │   ├── login/page.tsx      # Login form + demo credentials card
│   │   └── signup/page.tsx     # Signup with SME/Bank account type selector
│   └── (dashboard)/            # Route group — WITH sidebar
│       ├── layout.tsx          # Dashboard layout: responsive sidebar + header
│       └── dashboard/
│           ├── page.tsx        # Overview: stats, score breakdown, activity
│           ├── upload/page.tsx # File upload with drag-drop zone
│           ├── score/page.tsx  # Credit score report + factor breakdown
│           ├── transactions/page.tsx  # Transaction list (table + cards)
│           └── settings/page.tsx      # Settings placeholder
└── components/
    ├── ui/
    │   └── Button.tsx          # Reusable button (primary/secondary/ghost/outline)
    ├── layout/
    │   ├── Navbar.tsx          # Landing page nav (Login → /login, Request Demo → /signup)
    │   └── Footer.tsx          # Footer with links
    ├── dashboard/
    │   ├── Sidebar.tsx         # Responsive sidebar (slide-in mobile, fixed desktop)
    │   └── Header.tsx          # Responsive header with hamburger + search
    ├── sections/
    │   ├── Hero.tsx            # Hero with animated SVG score gauge, particles
    │   ├── PainPoints.tsx      # 6 pain points with icons
    │   ├── HowItWorks.tsx      # 4-step process flow
    │   ├── Features.tsx        # 6 feature cards
    │   ├── Demo.tsx            # Interactive demo walkthrough
    │   ├── DualAudience.tsx    # Tabbed section (Banks / SMEs)
    │   ├── SocialProof.tsx     # Stats + testimonials
    │   └── CTA.tsx             # Call to action → /signup
    ├── animations/
    │   ├── ScrollReveal.tsx    # Fade-in on scroll
    │   ├── AnimatedCounter.tsx # Number counting animation
    │   └── TextReveal.tsx      # Staggered text reveal
    └── SmoothScroll.tsx        # Lenis smooth scroll wrapper (client component)
```

---

## Design System

### Color Palette (Midnight Ocean theme)
- **ink** `#0A1628` — Primary background (dark navy)
- **teal** `#00D4AA` — Primary accent (vibrant teal)
- **coral** `#FF6B6B` — Secondary accent (warm coral)
- **amber** `#FBBF24` — Highlight (golden yellow)
- **slate** `#64748B` — Muted text
- **muted** `#94A3B8` — Subtle text

### Typography
- **Display**: Space Grotesk — headings, hero text
- **Body**: DM Sans — paragraphs, UI text
- **Mono**: JetBrains Mono — code, numbers, scores

### UI Conventions
- Dark theme throughout (ink background)
- Gradient borders using `border-gradient` pattern
- Glass morphism cards: `bg-white/5 backdrop-blur-sm border border-white/10`
- Hover states: `hover:bg-white/10 transition-all duration-300`

---

## API Contract (Frontend ↔ Backend)

The frontend expects these endpoints. Backend must implement them exactly:

### Auth
```
POST /api/auth/login
  Body: { email: string, password: string }
  Response: { token: string, user: { id, name, email, type } }

POST /api/auth/signup
  Body: { name: string, email: string, password: string, type: "sme" | "bank" }
  Response: { token: string, user: { id, name, email, type } }
```

### Core
```
POST /api/upload
  Body: multipart/form-data (file)
  Response: { fileId: string, status: "processing" | "completed" }

POST /api/score
  Body: { fileId: string }
  Response: {
    score: number,
    factors: {
      cash_flow: { score, weight, name },
      revenue_trend: { score, weight, name },
      expense_management: { score, weight, name },
      longevity: { score, weight, name },
      digital_footprint: { score, weight, name }
    },
    recommendations: string[],
    potential_score: number
  }

GET /api/transactions
  Response: { transactions: [{ id, date, amount, description, type, category }] }

GET /api/user/profile
  Response: { user: { id, name, email, type }, score: { score, factors } }
```

### CORS Configuration
Frontend runs on `http://localhost:3000` (dev) and `https://sega-smart-credit.vercel.app` (prod).
Backend must allow both origins.

---

## Demo Credentials

For hackathon judges to demo without creating accounts:

- **Email**: `segademo@gmail.com`
- **Password**: `masasu`
- **Displayed on**: Login page as a visible card

---

## Hackathon Constraints

- **Duration**: 48 hours
- **Team**: 3 people
  - **Sufyan** (you) — Frontend (DONE ✅)
  - **Saad** — Backend (structure ready, needs implementation)
  - **Marjan** — Data & Integration (demo data, testing)
- **No database**: In-memory Python dict storage only
- **No real auth**: JWT tokens are placeholder strings
- **Deployment**: Vercel (frontend) + FastAPI Cloud or similar (backend)

---

## Known Gotchas (Read Before Changing Anything!)

### Tailwind v4
- Custom CSS rules after `@theme` MUST be inside `@layer base {}` or they get stripped
- Never use bare CSS rules outside `@layer` blocks

### Framer Motion
- Any component using `useScroll`, `useTransform`, `motion` needs `"use client"` directive
- SSR will crash without it

### Lenis Smooth Scroll
- Wraps entire app in root `layout.tsx`
- Initializes via `useEffect` — no SSR concerns
- If scroll breaks, check `SmoothScroll.tsx` client component

### Dashboard Layout
- Uses `"use client"` + useState for mobile sidebar toggle
- CSS import: `../globals.css` (NOT `./globals.css` — different from other pages)

### Next.js 16
- Turbopack by default for dev
- If cache corrupts: kill node, delete `.next/`, restart `pnpm dev`
- ESLint uses flat config (`eslint.config.mjs`), not `.eslintrc`

### pnpm
- Must use pnpm, not npm
- Root `.npmrc` has `shamefully-hoist=true` — critical for module resolution
- If you get module not found errors, run `pnpm install` from `frontend/` directory

---

## Quick Commands

```bash
# Frontend (from frontend/ directory)
cd frontend
pnpm dev              # Dev server on localhost:3000
pnpm build            # Production build
pnpm lint             # ESLint check

# Backend (from backend/ directory)
cd backend
uv sync               # Install dependencies
uv run main.py        # Run dev server on localhost:8000
uvicorn main:app --reload  # Alternative run command
```

---

## What's Done vs What's Left

### Done (Sufyan)
- [x] Landing page with 8 animated sections
- [x] Auth pages (login + signup) with demo credentials
- [x] Dashboard (overview, upload, score, transactions, settings)
- [x] Responsive sidebar + mobile hamburger
- [x] Framer Motion animations + Lenis smooth scroll
- [x] Tailwind v4 custom theme
- [x] Deployed to Vercel
- [x] Backend structure (uv + FastAPI + CORS)

### Left (Saad — Backend)
- [ ] Implement actual auth (JWT tokens, password hashing)
- [ ] Connect upload endpoint to file processing
- [ ] Implement credit score calculation with real data
- [ ] Pandas data processing pipeline
- [ ] OCR integration for receipt/invoice extraction
- [ ] In-memory storage (users dict, transactions dict)
- [ ] Connect frontend to backend API calls

### Left (Marjan — Data & Integration)
- [ ] Prepare demo data (WhatsApp exports, receipts, Excel files)
- [ ] End-to-end testing
- [ ] Demo flow rehearsal

---

## Skills Installed

13 skills in `.agents/skills/`. Key ones:
- `nextjs-developer` — App Router patterns
- `frontend-design` — Design system guidance
- `vercel-react-best-practices` — React/Next.js optimization
- `animated-component-libraries` — Framer Motion patterns
- `implement_lenis_scroll` — Smooth scroll setup
- `banking-expert` — Domain knowledge for credit scoring
- `fastapi-templates` — FastAPI project patterns

---

## Git Branches

- `main` — Production (frontend complete)
- `backend-setup` — Backend structure (PR pending)
