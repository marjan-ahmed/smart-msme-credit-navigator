# Smart MSME Credit Navigator Backend

AI-powered credit scoring API for Pakistani SMEs.

## Setup

```bash
# Install dependencies
uv sync

# Run development server
uv run main.py

# Or with uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - API root
- `GET /health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/upload` - File upload
- `POST /api/score` - Credit score calculation
- `GET /api/transactions` - Get transactions
- `GET /api/user/profile` - Get user profile

## Project Structure

```
backend/
├── app/
│   ├── api/          # API route handlers
│   ├── models/       # Pydantic models
│   ├── services/     # Business logic
│   └── core/         # Config and utilities
├── main.py           # FastAPI app entry point
├── pyproject.toml    # Project configuration
└── .env              # Environment variables
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS
- `DEBUG` - Debug mode (True/False)

## Tech Stack

- **Framework**: FastAPI
- **Package Manager**: uv
- **Validation**: Pydantic
- **Server**: Uvicorn
