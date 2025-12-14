# Project Setup Preview

## ✅ Complete Full-Stack Monorepo Scaffolding

A production-ready TypeScript monorepo with pnpm workspaces, featuring an Express API backend and React Vite frontend.

---

## 📁 Project Structure

```
op/
├── 📁 apps/
│   ├── 📁 api/                    # Express + TypeScript Backend
│   │   ├── src/
│   │   │   └── index.ts           # Entry point with health & API endpoints
│   │   ├── .env.example           # Environment variables template
│   │   ├── package.json           # Dependencies and scripts
│   │   └── tsconfig.json          # TypeScript config
│   │
│   └── 📁 web/                    # React + Vite Frontend
│       ├── src/
│       │   ├── App.tsx            # Root component
│       │   ├── main.tsx           # Entry point
│       │   └── index.css          # Global styles
│       ├── index.html             # HTML template
│       ├── .env.example           # Environment variables template
│       ├── vite.config.ts         # Vite configuration
│       ├── package.json           # Dependencies and scripts
│       └── tsconfig.json          # TypeScript config
│
├── 🔧 Configuration Files
│   ├── package.json               # Root workspace with pnpm config
│   ├── pnpm-workspace.yaml        # Workspace package definitions
│   ├── tsconfig.json              # Root TypeScript config
│   ├── .eslintrc.json             # ESLint rules
│   ├── .prettierrc                # Prettier formatting
│   ├── .npmrc                     # pnpm settings
│   ├── .gitignore                 # Git ignore patterns
│   └── .env.example               # Root env template
│
├── 🔐 Git & Automation
│   ├── .husky/
│   │   ├── pre-commit             # Auto lint:fix + format
│   │   └── pre-push               # Auto format:check + lint
│   └── .git/                      # Git repository
│
├── 🐳 Infrastructure
│   └── docker-compose.yml         # PostgreSQL 16 service
│
└── 📚 Documentation
    ├── README.md                  # Comprehensive guide
    └── SETUP_PREVIEW.md           # This file
```

---

## 🎯 What's Included

### **Backend (`apps/api`)**
- Express.js server with TypeScript
- CORS enabled for cross-origin requests
- Health check endpoint: `GET /health`
- API endpoint: `GET /api`
- Graceful shutdown handling
- Environment-based configuration with dotenv
- Ready for PostgreSQL integration

### **Frontend (`apps/web`)**
- React 18 with Vite
- Fast HMR (Hot Module Replacement)
- TypeScript strict mode
- API proxy to backend
- Responsive CSS with dark theme base
- Environment variables with `VITE_` prefix

### **Shared Tooling**

#### ESLint
- TypeScript support
- React and React Hooks rules
- Import ordering enforcement
- Prettier integration (no conflicts)

#### Prettier
- 2-space indentation
- Semicolons enabled
- Single quotes
- 100 character print width
- ES5 trailing commas

#### TypeScript
- Strict mode enabled
- ES2020 target
- Source maps and declarations
- Proper JSX configuration

#### Husky Hooks
- **Pre-commit**: Runs `pnpm lint:fix` + `pnpm format`
- **Pre-push**: Runs `pnpm format:check` + `pnpm lint`

### **Docker & Database**
- PostgreSQL 16 Alpine (lightweight)
- Health checks configured
- Persistent volume for data
- Network isolation
- Easy development setup with `docker compose up`

---

## 📋 Available Scripts

### Root Level
```bash
pnpm install              # Install all workspace dependencies
pnpm dev                  # Start all dev servers in parallel
pnpm build                # Build all apps
pnpm type-check           # Type check all apps
pnpm lint                 # Check for linting errors
pnpm lint:fix             # Auto-fix linting errors
pnpm format               # Format all code with Prettier
pnpm format:check         # Check if code is formatted
pnpm setup                # Install + setup Husky hooks
```

### Filter Specific Apps
```bash
pnpm --filter @op/api dev        # Run API dev server only
pnpm --filter @op/web dev        # Run web dev server only
pnpm --filter @op/api build      # Build API only
pnpm --filter @op/web build      # Build web only
```

### Docker
```bash
docker compose up         # Start PostgreSQL
docker compose down       # Stop PostgreSQL
docker compose ps         # Check container status
docker compose logs       # View PostgreSQL logs
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```
Installs all root and workspace dependencies in one command.

### 2. Setup Environment
```bash
# Copy environment templates
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 3. Start PostgreSQL (Optional)
```bash
docker compose up -d
```
Runs PostgreSQL on port 5432 with user/password credentials.

### 4. Start Development Servers
```bash
pnpm dev
```

- **API**: http://localhost:3001
- **Web**: http://localhost:5173
- **Database**: localhost:5432

---

## ✨ Features Verified

| Feature | Status | Details |
|---------|--------|---------|
| **pnpm Workspaces** | ✅ | All workspace packages configured and working |
| **Installation** | ✅ | `pnpm install` completes successfully |
| **Type Checking** | ✅ | All TypeScript files pass strict type checking |
| **Linting** | ✅ | ESLint passes with no errors |
| **Formatting** | ✅ | Prettier validation passes |
| **Building** | ✅ | Both apps compile and bundle correctly |
| **Docker** | ✅ | PostgreSQL container runs and is healthy |
| **Git Hooks** | ✅ | Husky hooks installed and executable |
| **API Server** | ✅ | Express server starts and responds to requests |
| **Web App** | ✅ | React app builds and runs with Vite |

---

## 📦 Dependencies

### Root (Shared DevDependencies)
- `@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser`
- `eslint` with Prettier integration
- `prettier`
- `typescript` (v5.3.3)
- `husky`
- `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-react-hooks`

### API (`apps/api`)
**Dependencies:**
- `express` - Web framework
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `pg` - PostgreSQL driver

**DevDependencies:**
- `tsx` - TypeScript execution
- `@types/express`, `@types/node`, `@types/cors`

### Web (`apps/web`)
**Dependencies:**
- `react` (v18.2.0)
- `react-dom` (v18.2.0)

**DevDependencies:**
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin
- `@types/react`, `@types/react-dom`

---

## 🔌 Environment Variables

### Root (.env.example)
```env
API_PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/op_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=op_db
DB_USER=user
DB_PASSWORD=password
VITE_API_URL=http://localhost:3001
```

### API (apps/api/.env.example)
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/op_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=op_db
DB_USER=user
DB_PASSWORD=password
```

### Web (apps/web/.env.example)
```env
VITE_API_URL=http://localhost:3001
```

---

## 🛠️ Configuration Details

### TypeScript (`tsconfig.json`)
- **Target**: ES2020
- **Strict Mode**: Enabled
- **Module**: ESNext
- **Declaration Maps**: Enabled for better IDE support
- **Source Maps**: Enabled for debugging

### ESLint (`.eslintrc.json`)
- **Parser**: @typescript-eslint/parser
- **Extends**: ESLint recommended + TypeScript + React rules
- **Key Rules**:
  - `react/react-in-jsx-scope`: Off (React 17+)
  - `import/order`: Enforced grouping and newlines
  - `@typescript-eslint/no-explicit-any`: Warning

### Prettier (`.prettierrc`)
- **Semi**: true
- **SingleQuote**: true
- **TabWidth**: 2
- **PrintWidth**: 100
- **TrailingComma**: es5
- **ArrowParens**: always

### pnpm (`.npmrc`)
- **shamefully-hoist**: true (better DX)
- **strict-peer-dependencies**: false

---

## 🐳 Docker Compose

### PostgreSQL Service
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: op-postgres
    ports: 5432:5432
    volumes: postgres_data (persistent)
    healthcheck: pg_isready checks
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: op_db
```

---

## 📝 Git Hooks (Husky)

### Pre-commit Hook
Runs automatically before each commit:
1. `pnpm lint:fix` - Fixes linting issues
2. `pnpm format` - Formats code with Prettier

### Pre-push Hook
Runs automatically before pushing:
1. `pnpm format:check` - Validates formatting
2. `pnpm lint` - Checks for linting errors

---

## 🎓 Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** to API or web app

3. **Test locally**
   ```bash
   pnpm dev              # Start both servers
   docker compose up -d  # Start database
   ```

4. **Validate code**
   ```bash
   pnpm type-check       # Type checking
   pnpm lint             # Linting
   pnpm format:check     # Formatting
   ```

5. **Commit** (hooks run automatically)
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push** (hooks validate before push)
   ```bash
   git push origin feature/my-feature
   ```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Change API port
PORT=3002 pnpm --filter @op/api dev

# For web, edit apps/web/vite.config.ts server.port
```

### PostgreSQL Connection Issues
```bash
# Check container status
docker compose ps

# View logs
docker compose logs postgres

# Restart container
docker compose restart
```

### Clear Dependencies Cache
```bash
rm -rf node_modules apps/*/node_modules
pnpm install
```

### TypeScript Issues
```bash
# Clear build cache
rm -rf apps/api/dist apps/web/dist
pnpm build
```

---

## 📚 Next Steps

1. **Extend API**:
   - Add more endpoints in `apps/api/src/index.ts`
   - Connect to PostgreSQL using a query builder or ORM
   - Add request validation

2. **Build Web UI**:
   - Add pages and components to `apps/web/src/`
   - Integrate with API endpoints
   - Add routing with React Router

3. **Database Setup**:
   - Create schema in PostgreSQL
   - Set up migrations
   - Use Prisma, TypeORM, or raw SQL

4. **Testing**:
   - Add Jest and testing library
   - Write unit and integration tests
   - Configure test scripts in package.json

5. **CI/CD**:
   - Set up GitHub Actions
   - Add build and test workflows
   - Configure deployment pipelines

---

## ✅ Acceptance Criteria - ALL PASSED

- ✅ Repo installs with `pnpm i`
- ✅ Linting works with `pnpm lint` and `pnpm lint:fix`
- ✅ Formatting works with `pnpm format` and `pnpm format:check`
- ✅ `docker compose up` launches PostgreSQL successfully
- ✅ Both app shells (`apps/api` and `apps/web`) compile
- ✅ Apps share common configs (TypeScript, ESLint, Prettier)
- ✅ Type-checking passes with `pnpm type-check`
- ✅ Building succeeds with `pnpm build`
- ✅ Git hooks configured and working

---

**Created**: December 14, 2024
**Branch**: `chore-setup-monorepo-pnpm-workspace`
**Status**: Production Ready ✨
