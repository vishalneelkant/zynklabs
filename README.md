# Zynk Labs - Full-Stack AI Automation Platform

A premium AI automation website with a CRED-style UI, built with React (frontend) and Spring Boot (backend).

## Project Structure

```
.
├── frontend/          # React + Vite + TypeScript + Tailwind
├── backend/           # Spring Boot 3.x + Maven + JPA
├── scripts/           # Utility scripts
└── README.md          # This file
```

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Axios (API calls)
- React Router

### Backend
- Spring Boot 3.x
- Java 17+
- Maven
- Spring Data JPA
- H2 Database (dev)
- PostgreSQL (production)
- Jakarta Validation

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 17 or 21
- Maven 3.6+

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL=http://localhost:8080
npm run dev
```

Frontend runs on `http://localhost:5173`

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080
```

### Backend (application.properties)
- Development: Uses H2 in-memory database (configured automatically)
- Production: Update `application.properties` with PostgreSQL credentials

## API Endpoints

### POST /api/contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "Interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "id": "uuid-here",
  "createdAt": "2024-01-01T12:00:00"
}
```

### POST /api/book-demo
Book a demo session.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "company": "Tech Inc",
  "preferredDate": "2024-01-15",
  "notes": "Looking for AI automation solutions"
}
```

**Response:**
```json
{
  "success": true,
  "id": "uuid-here",
  "scheduledAt": "2024-01-15"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00"
}
```

## Database Setup

### Development (H2)
H2 in-memory database is configured by default. No setup required.

### Production (PostgreSQL)
1. Install PostgreSQL
2. Create a database:
   ```sql
   CREATE DATABASE zynklabs;
   ```
3. Update `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/zynklabs
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

## Development

### Frontend
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
mvn spring-boot:run  # Run application
mvn test             # Run tests
mvn clean package    # Build JAR
```

## Deployment

### Frontend - Deploy to Vercel

#### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default or enter custom name)
   - Directory? **./** (current directory)
   - Override settings? **No**

5. **Set Environment Variables:**
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   Enter your backend API URL (e.g., `https://your-backend.railway.app` or `https://api.yourdomain.com`)

6. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

#### Option 2: Deploy via Vercel Dashboard

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import project on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_BASE_URL` with your backend API URL
   - Select environments (Production, Preview, Development)

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy

#### Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

- `VITE_API_BASE_URL`: Your backend API URL
  - Development: `http://localhost:8080`
  - Production: `https://your-backend-domain.com`

**Important:** After adding environment variables, redeploy the project for changes to take effect.

### Backend - Deployment Options

#### Option 1: Railway (Recommended for Spring Boot)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   cd backend
   railway init
   ```

4. **Add PostgreSQL:**
   ```bash
   railway add postgresql
   ```

5. **Set environment variables:**
   - Update `application.properties` to use PostgreSQL
   - Railway automatically provides `DATABASE_URL`

6. **Deploy:**
   ```bash
   railway up
   ```

#### Option 2: Render

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd backend && mvn clean package`
   - **Start Command:** `java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar`
4. Add PostgreSQL database
5. Set environment variables

#### Option 3: AWS/Google Cloud/Azure

Build and run the JAR:
```bash
cd backend
mvn clean package
java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar
```

Or use Docker:
```bash
docker build -t zynklabs-backend ./backend
docker run -p 8080:8080 zynklabs-backend
```

### Post-Deployment Checklist

1. ✅ Update `VITE_API_BASE_URL` in Vercel with production backend URL
2. ✅ Update CORS settings in backend to allow Vercel domain
3. ✅ Configure PostgreSQL database for production
4. ✅ Test API endpoints from deployed frontend
5. ✅ Verify forms are submitting correctly
6. ✅ Check browser console for any errors

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
mvn test
```

## Features

- **Contact Form**: Submit inquiries with validation
- **Book Demo**: Schedule demo sessions
- **CRED-style UI**: Dark theme with cinematic animations
- **Responsive Design**: Mobile-friendly layout
- **API Integration**: Full frontend-backend communication
- **Form Validation**: Client and server-side validation
- **GSAP Animations**: Smooth scroll reveals and transitions
- **Success Modals**: User-friendly confirmation messages

## Project Structure Details

### Frontend Components
- `Header`: Navigation with responsive menu
- `HeroSection`: Animated hero with CTAs
- `TextScroller`: Horizontal scrolling text animation
- `FeatureCards`: Grid of feature highlights
- `CinematicVisualSection`: Full-width visual section
- `CaseStudies`: Horizontal scrollable case studies
- `WhyZynkGrid`: Reasons to choose Zynk Labs
- `ProcessFlow`: Step-by-step process visualization
- `CallToActionBanner`: Prominent CTA section
- `ContactForm`: Contact form with validation
- `BookDemoModal`: Modal for booking demos
- `Footer`: Site footer with links

### Backend Structure
- `entity/`: JPA entities (Contact, DemoRequest)
- `repository/`: Spring Data JPA repositories
- `service/`: Business logic layer
- `dto/`: Data transfer objects with validation
- `controller/`: REST API controllers
- `config/`: Configuration (CORS, etc.)
- `exception/`: Global exception handling

## License

Proprietary - Zynk Labs

