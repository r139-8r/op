# op

## Backend API

The API lives in `apps/api`.

### Quickstart

```bash
cd apps/api
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

### Environment variables

See `apps/api/.env.example`.

### Useful scripts

From repo root:

```bash
npm test
```

From `apps/api`:

- `npm run dev` – start API with hot reload
- `npm run build` – TypeScript build to `dist/`
- `npm run start` – run compiled server
- `npm run db:migrate` – create/apply local migrations (requires PostgreSQL)
- `npm run db:deploy` – apply migrations in CI/production
- `npm run prisma:generate` – generate Prisma client
- `npm test` – run tests
