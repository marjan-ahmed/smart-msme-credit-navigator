<div align="center">

# Smart MSME Credit Navigator

**AI-powered credit scoring for Pakistan's 5.2 million unbanked SMEs**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://sega-smart-credit.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

[The Problem](#the-problem) • [Our Solution](#our-solution) • [Get Started](#get-started) • [Architecture](#architecture) • [API Contract](#api-contract)

</div>

---

## The Problem

Pakistan's MSMEs contribute **40% to GDP** and employ **80% of the workforce**, yet **90% remain unbanked**.

Why? Their business data is informal — scattered across WhatsApp invoices, paper receipts, and Excel sheets. Banks can't assess creditworthiness without formal records, leaving millions of SMEs trapped without access to capital.

## Our Solution

Smart MSME Credit Navigator transforms informal business data into **bank-ready credit profiles** using AI.

### How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  SME Owner  │────▶│  Upload     │────▶│  AI Process │────▶│  Credit     │
│  Signs Up   │     │  Data       │     │  & Score    │     │  Profile    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                            │
                          ┌─────────────────┼─────────────────┐
                          ▼                 ▼                 ▼
                    WhatsApp          Receipts           Excel/CSV
                    Exports           Photos             Logs
```

### Credit Scoring Model

| Factor | Weight | Description |
|--------|--------|-------------|
| Cash Flow Regularity | 35% | Consistency of money inflows |
| Revenue Trend | 25% | Business growth trajectory |
| Expense Management | 20% | Income-to-expense ratio |
| Business Longevity | 10% | Operating history |
| Digital Footprint | 10% | Transaction digitization level |

**Score Range**: 0-100 (80+ = bank-ready)

---

## Get Started

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.11+ and uv
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/marjan-ahmed/smart-msme-credit-navigator.git
cd smart-msme-credit-navigator/frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd ../backend

# Install dependencies
uv sync

# Start development server
uv run main.py
```

Open [http://localhost:8000](http://localhost:8000)

### Demo Credentials

For hackathon judges:

- **Email**: `segademo@gmail.com`
- **Password**: `masasu`

---

## Architecture

```
smart-msme-credit-navigator/
├── frontend/                 # Next.js 16 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       # Login, Signup pages
│   │   │   └── (dashboard)/  # Dashboard, Score, Upload, Transactions
│   │   └── components/
│   │       ├── sections/     # Landing page sections
│   │       ├── dashboard/    # Dashboard components
│   │       └── ui/           # Reusable UI elements
│   └── public/               # Static assets
│
├── backend/                  # FastAPI + uv
│   ├── app/
│   │   ├── api/              # Route handlers
│   │   ├── models/           # Pydantic models
│   │   ├── services/         # Business logic
│   │   └── core/             # Configuration
│   └── main.py               # App entry point
│
└── AGENTS.md                 # Full project documentation
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Animations | Framer Motion, Lenis Smooth Scroll |
| Backend | FastAPI, Python 3.11 |
| Package Managers | pnpm (frontend), uv (backend) |
| Deployment | Vercel (frontend), FastAPI Cloud (backend) |

---

## API Contract

### Auth Endpoints

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response: { "token": "...", "user": { "id", "name", "email", "type" } }
```

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "type": "sme" | "bank"
}

Response: { "token": "...", "user": { "id", "name", "email", "type" } }
```

### Core Endpoints

```http
POST /api/upload
Content-Type: multipart/form-data

file: <binary>

Response: { "fileId": "...", "status": "processing" }
```

```http
POST /api/score
Content-Type: application/json

{ "fileId": "..." }

Response: {
  "score": 85,
  "factors": { ... },
  "recommendations": [ ... ],
  "potential_score": 98
}
```

```http
GET /api/transactions
Response: { "transactions": [...] }
```

```http
GET /api/user/profile
Response: { "user": {...}, "score": {...} }
```

---

## Features

### For SME Owners

- **Simple Data Upload** — Drag-and-drop WhatsApp exports, receipts, or Excel files
- **Instant Credit Score** — AI-powered scoring with detailed breakdown
- **Bank-Ready Profile** — Share digital profile with lending institutions
- **Recommendations** — Actionable tips to improve credit score

### For Banks

- **Verified SME Profiles** — AI-processed and scored business data
- **Risk Assessment** — 5-factor scoring model for informed lending decisions
- **Digital Pipeline** — Streamlined SME onboarding process

---

## Development

### Available Scripts

```bash
# Frontend
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run ESLint

# Backend
uv sync           # Install dependencies
uv run main.py    # Start dev server
```

### Environment Variables

**Backend** (`.env`):

```env
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:3000
DEBUG=True
```

---

## Known Issues

> [!WARNING]
> **Tailwind v4**: Custom CSS rules after `@theme` MUST be inside `@layer base {}` or they get stripped.

> [!NOTE]
> **Framer Motion**: Components using `motion`, `useScroll`, or `useTransform` need `"use client"` directive.

> [!TIP]
> **pnpm**: Must use pnpm, not npm. Root `.npmrc` has `shamefully-hoist=true`.

---

## Team

| Name | Role | Focus |
|------|------|-------|
| Sufyan | Frontend | UI/UX, Animations, Responsive Design |
| Saad | Backend | API, Data Processing, Credit Scoring |
| Marjan | Data & Integration | Demo Data, Testing, Deployment |

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built for UBL Hackathon Pakistan**

Transforming informal business data into financial opportunities

</div>
