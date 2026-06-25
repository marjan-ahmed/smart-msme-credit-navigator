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
   - Receipt/invoice photos (OCR extracts data via pytesseract)
   - Excel/CSV transaction logs (parsed via Pandas)
3. **Backend processes the data** — extracts transactions, categorizes income/expenses, identifies patterns
4. **Credit score is generated** using 5-factor weighted scoring
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

### Scoring Logic (implemented in `backend/app/services/credit_score.py`)

```
Cash Flow:  min(100, num_income_transactions * 10)
Revenue:    min(100, total_income / 10000 * 100)
Expense:    min(100, (total_income / (total_expense + 1)) * 20)
Longevity:  60 (hardcoded placeholder)
Digital:    min(100, total_transactions * 5)

Final Score = (CashFlow × 0.35) + (Revenue × 0.25) + (Expense × 0.20) + (Longevity × 0.10) + (Digital × 0.10)
```

Score ranges:
- **80-100**: Excellent — ready for bank lending
- **60-79**: Good — may need some documentation
- **40-59**: Fair — needs improvement before bank approval
- **0-39**: Poor — significant financial issues

**Note**: This is rule-based, not AI/ML. The scoring is simple math for hackathon simplicity + explainability.

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

### Backend (DONE — working with MongoDB)
- **Framework**: FastAPI (Python)
- **Package Manager**: uv
- **Server**: Uvicorn
- **Database**: MongoDB (via motor async driver)
- **Auth**: JWT tokens (python-jose) + bcrypt password hashing
- **Data Processing**: Pandas (CSV/Excel), pytesseract (OCR), regex (WhatsApp)
- **Config**: pydantic-settings + .env file
- **Python**: 3.11+

### Backend Directory Structure
```
backend/
├── main.py              # FastAPI app with CORS, route includes, lifespan
├── pyproject.toml       # uv project config + dependencies
├── .env                 # Environment variables (MONGODB_URL, SECRET_KEY, etc.)
├── .gitignore           # Python gitignore
├── app/
│   ├── api/
│   │   ├── auth.py      # Login/signup endpoints (JWT + bcrypt)
│   │   └── score.py     # Upload, score, transactions, profile endpoints
│   ├── models/
│   │   ├── user.py      # UserCreate, UserLogin, UserOut, Token models
│   │   └── business.py  # Transaction, FactorScore, CreditScore, FileUpload models
│   ├── services/
│   │   └── credit_score.py  # CreditScoreService: OCR, CSV, Excel, WhatsApp extraction + scoring
│   └── core/
│       ├── config.py    # Settings via pydantic-settings (MONGODB_URL, SECRET_KEY, etc.)
│       ├── database.py  # MongoDB connection (motor async client)
│       └── auth_utils.py # hash_password, verify_password, create_access_token, decode_access_token
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
│           ├── page.tsx        # Overview: REAL data from backend (profile + score + transactions)
│           ├── upload/page.tsx # File upload with drag-drop → calls backend upload + score
│           ├── score/page.tsx  # Credit score report: REAL data from backend or localStorage
│           ├── transactions/page.tsx  # Transaction list: REAL data from backend
│           └── settings/page.tsx      # Settings placeholder
└── components/
    ├── ui/
    │   └── Button.tsx          # Reusable button (primary/secondary/ghost/outline)
    ├── layout/
    │   ├── Navbar.tsx          # Landing page nav (Login → /login, Request Demo → /signup)
    │   └── Footer.tsx          # Footer with links
    ├── dashboard/
    │   ├── Sidebar.tsx         # Responsive sidebar + REAL user name from localStorage + working sign out
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

All endpoints are implemented and connected.

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
  Headers: Authorization: Bearer <token>
  Response: { user: { id, name, email, type }, score: { score, factors, recommendations, potential_score } }
```

### Frontend API Client
All API calls are in `frontend/src/lib/api.ts`. Base URL:
```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
```

### CORS Configuration
Backend allows:
- `http://localhost:3000` (dev)
- `https://sega-smart-credit.vercel.app` (prod Vercel)
- Additional origins via `FRONTEND_URL` env var

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
  - **Sufyan** — Frontend (DONE ✅)
  - **Saad** — Backend (DONE ✅ — auth, upload, scoring, MongoDB)
  - **Marjan** — Data & Integration (demo data, testing)
- **Database**: MongoDB (via motor async driver) — NOT in-memory
- **Auth**: Real JWT tokens with bcrypt password hashing
- **Deployment**: Vercel (frontend) + FastAPI Cloud (backend, public beta)
- **Scoring**: Rule-based math (not AI/ML) for hackathon simplicity

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

### Windows + Python Emoji Encoding
- **CRITICAL**: Never use emoji characters in Python `print()` statements on Windows
- Windows cp1252 encoding can't encode characters like `✅`, `🔌`
- Use plain text instead: `print("Connected to MongoDB")` not `print("✅ Connected to MongoDB")`
- This applies to ALL Python print statements in the backend

### MongoDB Connection
- Default: `mongodb://localhost:27017` (local dev)
- Production: Set `MONGODB_URL` env var to cloud MongoDB Atlas connection string
- Database name: `smart_msme` (set via `DATABASE_NAME` env var)

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
uv run python -m uvicorn main:app --host 127.0.0.1 --port 8000  # Run dev server
uvicorn main:app --reload  # Alternative run command

# Deploy to FastAPI Cloud
cd backend
fastapi login         # Authenticate (opens browser)
fastapi deploy        # Deploy to cloud
fastapi cloud env set MONGODB_URL "your-atlas-connection-string"  # Set env var
```

---

## What's Done vs What's Left

### Done — Frontend (Sufyan)
- [x] Landing page with 8 animated sections
- [x] Auth pages (login + signup) with demo credentials
- [x] Dashboard (overview with real data, upload, score with real data, transactions, settings)
- [x] Responsive sidebar with real user name + working sign out
- [x] Framer Motion animations + Lenis smooth scroll
- [x] Tailwind v4 custom theme
- [x] Deployed to Vercel
- [x] Frontend connected to backend (api.ts → all endpoints)

### Done — Backend (Saad)
- [x] FastAPI app with CORS configuration
- [x] JWT auth (login + signup with bcrypt password hashing)
- [x] File upload endpoint (saves to /tmp/msme_uploads)
- [x] Credit score calculation (5-factor weighted scoring)
- [x] File processing: CSV, Excel, WhatsApp txt, OCR (pytesseract)
- [x] Transactions endpoint
- [x] User profile endpoint (returns real user + latest score from MongoDB)
- [x] MongoDB integration (motor async driver)
- [x] Pydantic models (User, Business, Score)

### Done — Integration
- [x] Frontend → Backend connection verified (all 5 endpoints working)
- [x] Demo credentials work end-to-end (signup → login → upload → score → dashboard)
- [x] Dashboard shows real user name, score, transactions
- [x] Sidebar shows real user name + email from localStorage
- [x] Sign out clears localStorage and redirects to login

### Left — Deployment
- [ ] Create MongoDB Atlas account (free) — needed for cloud database
- [ ] Deploy backend to FastAPI Cloud (`fastapi deploy`)
- [ ] Set MONGODB_URL env var on FastAPI Cloud
- [ ] Set NEXT_PUBLIC_API_URL env var on Vercel (point to FastAPI Cloud URL)
- [ ] Update CORS on backend to allow Vercel domain

### Left — Polish
- [ ] AI-powered analysis (currently rule-based scoring)
- [ ] Better OCR accuracy for receipt processing
- [ ] WhatsApp chat parsing improvements
- [ ] Bank dashboard view (currently only SME view)
- [ ] Settings page functionality
- [ ] Error handling improvements
- [ ] Loading states for all pages

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

- `main` — Production (frontend + backend, all connected)
- `backend-setup` — Backend structure (merged into main)

---

## Deployment Architecture

```
┌─────────────────┐         ┌─────────────────────┐
│  Vercel (Frontend)│  HTTPS │  FastAPI Cloud (Backend)│
│  localhost:3000  │ ──────> │  *.fastapicloud.dev  │
│                  │         │                       │
│  NEXT_PUBLIC_    │         │  MONGODB_URL env var  │
│  API_URL env var │         │  → connects to Atlas  │
└─────────────────┘         └──────────┬────────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │  MongoDB Atlas (Cloud)│
                            │  Cluster: smart_msme │
                            └─────────────────────┘
```
