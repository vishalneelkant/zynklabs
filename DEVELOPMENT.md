# Development Guide

This guide covers local development setup and workflows for the Zynk Labs monorepo.

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Java** 17 or 21
- **Maven** 3.6+
- **Docker** and Docker Compose (optional, for containerized development)

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd zynklabsai
   ```

2. **Install dependencies:**
   ```bash
   # Using npm (recommended)
   npm run setup
   
   # Or using Make
   make setup
   ```

3. **Configure environment variables:**
   ```bash
   # Frontend
   cd frontend
   cp .env.example .env
   # Edit .env and set VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Start development servers:**
   ```bash
   # Using npm (runs both services)
   npm run dev
   
   # Or using Make
   make dev
   
   # Or start individually
   npm run dev:backend   # Backend only
   npm run dev:frontend # Frontend only
   ```

## Development Commands

### Using npm scripts (Root level)

```bash
# Development
npm run dev              # Start both backend and frontend
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend

# Building
npm run build            # Build both
npm run build:backend    # Build backend only
npm run build:frontend   # Build frontend only

# Testing
npm run test             # Run all tests
npm run test:backend     # Backend tests only
npm run test:frontend    # Frontend tests only

# Code Quality
npm run lint             # Lint frontend code

# Cleanup
npm run clean            # Clean all build artifacts
npm run clean:backend    # Clean backend only
npm run clean:frontend   # Clean frontend only
```

### Using Make

```bash
make help                # Show all available commands
make dev                 # Start both services
make backend             # Start backend only
make frontend            # Start frontend only
make build               # Build both
make test                # Run all tests
make lint                # Lint frontend
make clean               # Clean everything
```

### Individual Service Commands

**Backend:**
```bash
cd backend
mvn spring-boot:run      # Run development server
mvn test                 # Run tests
mvn clean package        # Build JAR
```

**Frontend:**
```bash
cd frontend
npm run dev              # Development server
npm run build            # Production build
npm run test             # Run tests
npm run lint             # Lint code
npm run preview          # Preview production build
```

## Docker Development

### Using Docker Compose

Start all services (backend, frontend, PostgreSQL):

```bash
docker-compose up
```

Or run in detached mode:

```bash
docker-compose up -d
```

Stop services:

```bash
docker-compose down
```

Stop and remove volumes:

```bash
docker-compose down -v
```

### Individual Docker Services

**Build backend:**
```bash
cd backend
docker build -t zynklabs-backend .
docker run -p 8080:8080 zynklabs-backend
```

**Build frontend:**
```bash
cd frontend
docker build -t zynklabs-frontend .
docker run -p 5173:80 zynklabs-frontend
```

## Project Structure

```
zynklabsai/
├── backend/              # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/             # React/Vite frontend
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── .github/
│   └── workflows/       # CI/CD pipelines
├── docker-compose.yml    # Docker Compose configuration
├── Makefile             # Convenience commands
├── package.json         # Root-level scripts
└── README.md
```

## Environment Variables

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Backend

Backend uses Spring profiles:
- **Development:** `application.properties` (H2 database)
- **Production:** `application-prod.properties` (PostgreSQL)
- **Docker:** `application-docker.properties` (PostgreSQL in Docker)

## API Endpoints

- **Health Check:** `GET /api/health`
- **Contact Form:** `POST /api/contact`
- **Book Demo:** `POST /api/book-demo`

## Development Workflow

### 1. Feature Development

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Start development servers
npm run dev

# Make changes and test
# ...

# Run tests
npm run test

# Commit changes
git add .
git commit -m "feat: your feature description"
```

### 2. Testing

```bash
# Run all tests
npm run test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend

# Run with coverage
cd frontend && npm test -- --coverage
cd backend && mvn test jacoco:report
```

### 3. Code Quality

```bash
# Lint frontend code
npm run lint

# Format code (if configured)
# Frontend uses ESLint
# Backend uses default Java formatting
```

### 4. Building for Production

```bash
# Build both
npm run build

# Build individually
npm run build:backend
npm run build:frontend
```

## Troubleshooting

### Port Already in Use

**Backend (8080):**
```bash
# Find process using port 8080
lsof -i :8080
# Kill process
kill -9 <PID>
```

**Frontend (5173):**
```bash
# Find process using port 5173
lsof -i :5173
# Kill process
kill -9 <PID>
```

### Database Connection Issues

**H2 (Development):**
- H2 is in-memory, no setup needed
- Access console at: `http://localhost:8080/h2-console`

**PostgreSQL (Docker):**
```bash
# Check if PostgreSQL is running
docker-compose ps

# View logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Dependency Issues

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
cd backend
mvn clean
mvn dependency:resolve
```

### Build Failures

**Clear all caches:**
```bash
npm run clean
cd backend && mvn clean
cd frontend && rm -rf node_modules .vite
npm run setup
```

## IDE Setup

### VSCode

Recommended extensions:
- **Java Extension Pack** (for backend)
- **ESLint** (for frontend)
- **Prettier** (for formatting)
- **Docker** (for containerized development)

### IntelliJ IDEA

1. Open project root
2. Mark `backend` as Maven project
3. Mark `frontend` as Node.js project
4. Configure run configurations for both services

## Git Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Commit Messages

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build/tooling changes

## CI/CD

The project uses GitHub Actions for CI:

- **Backend CI:** Runs on push/PR to `backend/` directory
- **Frontend CI:** Runs on push/PR to `frontend/` directory

See `.github/workflows/` for details.

## Additional Resources

- [Backend Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [API Documentation](./README.md#api-endpoints)
- [Project README](./README.md)

