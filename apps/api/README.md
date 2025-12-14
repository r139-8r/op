# API (`apps/api`)

Express + Prisma (PostgreSQL) foundation with auth, basic resources, validation and Swagger stub.

## Setup

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

## Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /budgets` / `POST /budgets` (JWT required)
- `GET /categories` / `POST /categories` (JWT required)
- `GET /expenses` / `POST /expenses` (JWT required)
- `GET /openapi.json` and `GET /docs`

## Prisma

- `npm run db:migrate` creates a migration and applies it (development).
- `npm run db:deploy` applies existing migrations (production/CI).

Ensure `DATABASE_URL` points to a running PostgreSQL instance.
