# Op

A modern full-stack TypeScript monorepo with pnpm workspaces. Built for scalability and developer experience.

## Architecture

```
op/
├── apps/
│   ├── api/          # Express + TypeScript backend
│   └── web/          # React + Vite + TypeScript frontend
├── packages/         # Shared packages (future)
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── README.md
```

### Apps

#### API (`apps/api`)

Node.js/Express server with TypeScript:

- RESTful endpoints
- Environment-based configuration
- Health check endpoint at `/health`
- CORS enabled by default

**Environment Variables:**

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `DB_*` - Database credentials

#### Web (`apps/web`)

React application with Vite and TypeScript:

- Fast HMR (hot module replacement)
- Optimized production builds
- Proxies API requests to backend
- Environment variables prefixed with `VITE_`

**Environment Variables:**

- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)

## Prerequisites

- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 8.0.0 (install via `npm install -g pnpm`)
- **Docker** & **Docker Compose** (for PostgreSQL)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all workspace packages.

### 2. Setup Environment Variables

Copy environment example files to create local `.env` files:

```bash
# Root environment (optional)
cp .env.example .env

# API environment
cp apps/api/.env.example apps/api/.env

# Web environment
cp apps/web/.env.example apps/web/.env
```

Edit the `.env` files as needed for your local setup.

### 3. Start PostgreSQL

```bash
docker compose up -d
```

This starts PostgreSQL on port 5432. Verify with:

```bash
docker compose ps
```

To stop:

```bash
docker compose down
```

### 4. Run Development Servers

Start all apps in parallel:

```bash
pnpm dev
```

Individual servers:

- **API**: http://localhost:3001
- **Web**: http://localhost:5173
- **Postgres**: localhost:5432

To run apps individually:

```bash
# API only
pnpm --filter @op/api dev

# Web only
pnpm --filter @op/web dev
```

## Scripts

### Development

```bash
pnpm dev          # Start all dev servers
pnpm build        # Build all apps
pnpm type-check   # Type check all apps
```

### Code Quality

```bash
pnpm lint         # Check for linting errors
pnpm lint:fix     # Fix linting errors
pnpm format       # Format code with Prettier
pnpm format:check # Check if code is formatted
```

### Setup

```bash
pnpm setup        # Install dependencies and setup git hooks
```

## Code Quality & Formatting

### ESLint

Configuration: `.eslintrc.json`

- TypeScript support
- React/React Hooks rules
- Import ordering
- Prettier integration

Run linter:

```bash
pnpm lint         # Check for errors
pnpm lint:fix     # Auto-fix errors
```

### Prettier

Configuration: `.prettierrc`

Formatting options:

- Semi-colons: enabled
- Single quotes: enabled
- Tab width: 2 spaces
- Trailing comma: ES5
- Print width: 100 characters

Run formatter:

```bash
pnpm format       # Format all files
pnpm format:check # Check formatting
```

### Git Hooks (Husky)

Pre-commit hook runs:

- `pnpm lint:fix` - Auto-fixes linting issues
- `pnpm format` - Formats code

Pre-push hook runs:

- `pnpm format:check` - Ensures code is formatted
- `pnpm lint` - Checks for linting errors

Hooks are configured in `.husky/` directory.

## TypeScript Configuration

Root `tsconfig.json` provides base configuration with:

- ES2020 target
- Strict mode enabled
- Source maps and declarations
- Path aliases (can be added to `compilerOptions`)

Each app extends the root config:

- `apps/api/tsconfig.json`
- `apps/web/tsconfig.json`

## Database

PostgreSQL runs via Docker Compose with:

- Container: `op-postgres`
- Default credentials: user/password
- Default database: `op_db`
- Port: 5432

To connect:

```bash
psql postgresql://user:password@localhost:5432/op_db
```

## Project Management

### pnpm Workspaces

Workspaces defined in root `package.json`:

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

Run commands in specific workspaces:

```bash
pnpm --filter @op/api <command>
pnpm --filter @op/web <command>
```

### .npmrc Configuration

```
shamefully-hoist=true        # Hoist deps to node_modules root
strict-peer-dependencies=false # Allow optional peer deps
```

## Troubleshooting

### Port Already in Use

If port 3001 or 5173 is in use:

```bash
# Change API port
PORT=3002 pnpm --filter @op/api dev

# For web, modify apps/web/vite.config.ts server.port
```

### PostgreSQL Connection Issues

Check if container is running:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs postgres
```

### Clear Cache

```bash
# Remove all node_modules
rm -rf node_modules apps/*/node_modules

# Reinstall
pnpm install
```

## Contributing

1. Create a feature branch
2. Make changes
3. Run `pnpm format` and `pnpm lint:fix`
4. Commit changes (hooks will validate)
5. Push and create a pull request

## License

MIT
