.PHONY: help install dev build test clean setup backend frontend lint

# Default target
help:
	@echo "Zynk Labs - Monorepo Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make setup          - Install all dependencies"
	@echo "  make install        - Install all dependencies (alias for setup)"
	@echo ""
	@echo "Development:"
	@echo "  make dev            - Start both backend and frontend in development mode"
	@echo "  make backend        - Start only backend"
	@echo "  make frontend       - Start only frontend"
	@echo ""
	@echo "Build:"
	@echo "  make build          - Build both backend and frontend"
	@echo "  make build-backend  - Build only backend"
	@echo "  make build-frontend - Build only frontend"
	@echo ""
	@echo "Testing:"
	@echo "  make test           - Run all tests"
	@echo "  make test-backend   - Run backend tests"
	@echo "  make test-frontend  - Run frontend tests"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint           - Lint frontend code"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean          - Clean all build artifacts and dependencies"
	@echo "  make clean-backend  - Clean backend build artifacts"
	@echo "  make clean-frontend - Clean frontend build artifacts"

# Setup
setup:
	@echo "📦 Installing dependencies..."
	cd frontend && npm install
	@echo "✅ Setup complete!"
	@echo "Run 'make dev' to start both services"

install: setup

# Development
dev:
	@echo "🚀 Starting development servers..."
	npm run dev

backend:
	@echo "🔧 Starting backend..."
	cd backend && mvn spring-boot:run

frontend:
	@echo "🎨 Starting frontend..."
	cd frontend && npm run dev

# Build
build:
	@echo "🏗️  Building backend and frontend..."
	npm run build

build-backend:
	@echo "🏗️  Building backend..."
	cd backend && mvn clean package -DskipTests

build-frontend:
	@echo "🏗️  Building frontend..."
	cd frontend && npm run build

# Testing
test:
	@echo "🧪 Running all tests..."
	npm run test

test-backend:
	@echo "🧪 Running backend tests..."
	cd backend && mvn test

test-frontend:
	@echo "🧪 Running frontend tests..."
	cd frontend && npm test -- --run

# Linting
lint:
	@echo "🔍 Linting frontend code..."
	cd frontend && npm run lint

# Cleanup
clean:
	@echo "🧹 Cleaning build artifacts..."
	npm run clean

clean-backend:
	@echo "🧹 Cleaning backend..."
	cd backend && mvn clean && rm -rf target

clean-frontend:
	@echo "🧹 Cleaning frontend..."
	cd frontend && rm -rf node_modules dist .vite

