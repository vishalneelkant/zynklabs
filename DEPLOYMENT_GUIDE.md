# Deployment Guide: Railway (Backend) + Vercel (Frontend)

This guide will help you deploy your backend to Railway and frontend to Vercel, ensuring they can communicate with each other.

## Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend      │
│   (React/Vite)  │────────▶│  (Spring Boot)  │
│   on Vercel     │  HTTP   │  on Railway     │
└─────────────────┘         └─────────────────┘
                                    │
                                    ▼
                            ┌─────────────────┐
                            │   PostgreSQL    │
                            │   Database      │
                            └─────────────────┘
```

---

## Part 1: Deploy Backend to Railway

### Prerequisites
- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- PostgreSQL database (Railway provides this)

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy Backend to Railway

1. **Login to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project:**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository (`zynklabsai`)
   - Railway will detect it's a Java/Maven project

3. **Configure Build Settings:**
   - Railway should auto-detect the backend folder
   - If not, set **Root Directory** to `backend`
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar`

4. **Add PostgreSQL Database:**
   - In your Railway project, click **"+ New"**
   - Select **"Database"** → **"Add PostgreSQL"**
   - Railway will automatically create a PostgreSQL database
   - Note the connection details (you'll need them for environment variables)

5. **Set Environment Variables:**
   
   Click on your backend service → **Variables** tab → Add these variables:

   ```bash
   # Activate production profile
   SPRING_PROFILES_ACTIVE=prod
   
   # Database Configuration (Railway provides these automatically)
   SPRING_DATASOURCE_URL=${{Postgres.DATABASE_URL}}
   SPRING_DATASOURCE_USERNAME=${{Postgres.USERNAME}}
   SPRING_DATASOURCE_PASSWORD=${{Postgres.PASSWORD}}
   
   # CORS Configuration (Update with your Vercel URL after deployment)
   # Format: https://your-app.vercel.app
   # You can add multiple origins separated by commas
   CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
   
   # Port (Railway sets this automatically, but include for safety)
   PORT=${{PORT}}
   ```

   **Important:** 
   - Railway automatically provides `${{Postgres.DATABASE_URL}}` when you add a PostgreSQL service
   - For `CORS_ALLOWED_ORIGINS`, you'll update this after deploying the frontend to get the actual Vercel URL

6. **Deploy:**
   - Railway will automatically build and deploy
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://your-backend.railway.app`)

### Step 3: Test Backend

1. **Get your Railway backend URL:**
   - In Railway dashboard, click on your service
   - Go to **Settings** → **Networking**
   - Copy the **Public Domain** (e.g., `https://your-backend.railway.app`)

2. **Test the health endpoint:**
   ```bash
   curl https://your-backend.railway.app/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-01T12:00:00"
   }
   ```

---

## Part 2: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your Railway backend URL from Part 1

### Step 1: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel CLI

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (first time)
   - Project name? (Press Enter for default or enter custom name)
   - Directory? **./** (current directory)
   - Override settings? **No**

4. **Set Environment Variable:**
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   
   When prompted:
   - **Environment:** Select `Production` (and optionally `Preview` and `Development`)
   - **Value:** Enter your Railway backend URL (e.g., `https://your-backend.railway.app`)
   
   **Important:** Do NOT include a trailing slash in the URL!

5. **Redeploy with environment variable:**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. **Push code to GitHub** (if not already done)

2. **Import Project:**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New"** → **"Project"**
   - Import your GitHub repository
   - Select the repository

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add Environment Variable:**
   - Go to **Settings** → **Environment Variables**
   - Add:
     - **Name:** `VITE_API_BASE_URL`
     - **Value:** Your Railway backend URL (e.g., `https://your-backend.railway.app`)
     - **Environment:** Select `Production`, `Preview`, and `Development`

5. **Deploy:**
   - Click **"Deploy"**
   - Wait for deployment to complete
   - Note your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## Part 3: Connect Frontend and Backend

### Step 1: Update CORS in Railway

Now that you have your Vercel frontend URL, update the CORS configuration in Railway:

1. **Go to Railway Dashboard:**
   - Click on your backend service
   - Go to **Variables** tab

2. **Update CORS_ALLOWED_ORIGINS:**
   - Find `CORS_ALLOWED_ORIGINS`
   - Update the value to your actual Vercel URL:
     ```
     CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
     ```
   - If you have multiple environments (preview, production), add them separated by commas:
     ```
     CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app-git-main.vercel.app
     ```

3. **Redeploy:**
   - Railway will automatically redeploy when you save the environment variable

### Step 2: Verify Connection

1. **Test from Browser:**
   - Open your Vercel frontend URL
   - Open browser DevTools (F12) → **Console** tab
   - Try submitting the contact form or booking a demo
   - Check for any CORS errors

2. **Test API Connection:**
   - In browser DevTools → **Network** tab
   - Submit a form
   - Check the API request:
     - Should go to your Railway backend URL
     - Should return status 200 (success)
     - Should not show CORS errors

---

## Environment Variables Summary

### Railway (Backend) Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `SPRING_PROFILES_ACTIVE` | `prod` | Activates production profile |
| `SPRING_DATASOURCE_URL` | `${{Postgres.DATABASE_URL}}` | PostgreSQL connection URL (auto-provided) |
| `SPRING_DATASOURCE_USERNAME` | `${{Postgres.USERNAME}}` | Database username (auto-provided) |
| `SPRING_DATASOURCE_PASSWORD` | `${{Postgres.PASSWORD}}` | Database password (auto-provided) |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` | Your Vercel frontend URL(s) |
| `PORT` | `${{PORT}}` | Server port (auto-provided by Railway) |

### Vercel (Frontend) Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend.railway.app` | Your Railway backend URL |

---

## Troubleshooting

### CORS Errors

**Problem:** Browser shows CORS error when frontend tries to call backend API.

**Solutions:**
1. Verify `CORS_ALLOWED_ORIGINS` in Railway includes your exact Vercel URL (with `https://`)
2. Ensure no trailing slash in the Vercel URL
3. Check that Railway backend has been redeployed after updating CORS
4. Clear browser cache and try again

### API Connection Failed

**Problem:** Frontend cannot reach backend API.

**Solutions:**
1. Verify `VITE_API_BASE_URL` in Vercel is set correctly
2. Test backend health endpoint directly: `curl https://your-backend.railway.app/api/health`
3. Check Railway logs for any errors
4. Ensure backend is deployed and running

### Database Connection Issues

**Problem:** Backend cannot connect to PostgreSQL.

**Solutions:**
1. Verify PostgreSQL service is added in Railway
2. Check that `SPRING_DATASOURCE_URL` uses `${{Postgres.DATABASE_URL}}`
3. Verify `SPRING_PROFILES_ACTIVE=prod` is set
4. Check Railway logs for database connection errors

### Build Failures

**Problem:** Railway build fails.

**Solutions:**
1. Check Railway build logs for specific errors
2. Verify `pom.xml` is in the `backend` directory
3. Ensure Java 17+ is available (Railway auto-detects)
4. Check that Root Directory is set to `backend` in Railway settings

---

## Post-Deployment Checklist

- [ ] Backend deployed to Railway and accessible
- [ ] PostgreSQL database connected
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_BASE_URL` set in Vercel with Railway backend URL
- [ ] `CORS_ALLOWED_ORIGINS` set in Railway with Vercel frontend URL
- [ ] Health endpoint working: `https://your-backend.railway.app/api/health`
- [ ] Contact form submitting successfully
- [ ] Book demo form submitting successfully
- [ ] No CORS errors in browser console
- [ ] Database storing data correctly

---

## Quick Reference URLs

After deployment, you'll have:

- **Backend API:** `https://your-backend.railway.app`
- **Frontend App:** `https://your-app.vercel.app`
- **Health Check:** `https://your-backend.railway.app/api/health`
- **API Endpoints:**
  - `POST /api/contact`
  - `POST /api/book-demo`
  - `GET /api/health`

---

## Support

If you encounter issues:
1. Check Railway logs: Railway Dashboard → Your Service → **Deployments** → Click on deployment → **View Logs**
2. Check Vercel logs: Vercel Dashboard → Your Project → **Deployments** → Click on deployment → **View Function Logs**
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Happy Deploying! 🚀**

