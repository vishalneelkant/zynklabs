# Deployment Guide - Zynk Labs

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Backend deployed (Railway, Render, etc.)

### Step-by-Step Vercel Deployment

#### 1. Prepare Your Code

```bash
# Make sure your code is committed
cd frontend
git add .
git commit -m "Ready for deployment"
```

#### 2. Deploy via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New Project"**

3. **Import your GitHub repository**
   - Select the repository
   - If not connected, authorize Vercel to access GitHub

4. **Configure Project Settings:**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `VITE_API_BASE_URL`
   - Value: Your backend URL (e.g., `https://zynklabs-backend.railway.app`)
   - Select: Production, Preview, Development

6. **Click "Deploy"**

7. **Wait for deployment** (usually 1-2 minutes)

8. **Your site is live!** Vercel will provide a URL like:
   `https://zynklabs-frontend.vercel.app`

#### 3. Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts, then add environment variable
vercel env add VITE_API_BASE_URL production

# Deploy to production
vercel --prod
```

## Backend Deployment (Railway - Recommended)

### Why Railway?
- Free tier available
- Easy PostgreSQL setup
- Automatic HTTPS
- Simple environment variables

### Steps:

1. **Go to [railway.app](https://railway.app) and sign in with GitHub**

2. **Create New Project → Deploy from GitHub**

3. **Select your repository**

4. **Add PostgreSQL:**
   - Click "+ New"
   - Select "PostgreSQL"
   - Railway will provide connection details

5. **Configure Environment Variables:**
   - Go to Variables tab
   - Add:
     ```
     SPRING_DATASOURCE_URL=jdbc:postgresql://[railway-provided-url]
     SPRING_DATASOURCE_USERNAME=[railway-provided-username]
     SPRING_DATASOURCE_PASSWORD=[railway-provided-password]
     ```

6. **Update application.properties:**
   - Railway uses environment variables
   - Update backend to read from env vars

7. **Deploy:**
   - Railway auto-detects Spring Boot
   - Builds and deploys automatically

8. **Get your backend URL:**
   - Railway provides: `https://your-app.railway.app`
   - Use this in Vercel's `VITE_API_BASE_URL`

## Update CORS for Production

After deploying backend, update CORS to allow Vercel domain:

```java
// In CorsConfig.java or application.properties
config.addAllowedOrigin("https://your-frontend.vercel.app");
config.addAllowedOrigin("https://your-custom-domain.com");
```

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### Backend:
- Use a service like Cloudflare or Route53
- Point subdomain (e.g., `api.yourdomain.com`) to backend

## Environment Variables Summary

### Frontend (Vercel):
- `VITE_API_BASE_URL`: Backend API URL

### Backend (Railway/Render):
- `SPRING_DATASOURCE_URL`: PostgreSQL connection URL
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `SPRING_JPA_HIBERNATE_DDL_AUTO`: `update` (for production)

## Troubleshooting

### Frontend Issues:
- **Build fails:** Check Node.js version (should be 18+)
- **API calls fail:** Verify `VITE_API_BASE_URL` is set correctly
- **CORS errors:** Update backend CORS settings

### Backend Issues:
- **Database connection fails:** Check PostgreSQL credentials
- **Port issues:** Railway/Render handle ports automatically
- **Build fails:** Ensure Java 17+ is available

## Quick Commands Reference

```bash
# Frontend - Local build test
cd frontend
npm run build
npm run preview

# Backend - Local build test
cd backend
mvn clean package
java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar

# Vercel CLI
vercel login
vercel
vercel --prod
vercel env ls
vercel env add VARIABLE_NAME

# Railway CLI
railway login
railway init
railway up
railway logs
```

## Post-Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway/Render
- [ ] Environment variables configured
- [ ] CORS updated for production domain
- [ ] Database connected and working
- [ ] Test contact form submission
- [ ] Test book demo form submission
- [ ] Check browser console for errors
- [ ] Verify API endpoints are accessible
- [ ] Test on mobile devices

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

