# Changes Required for Railway + Vercel Deployment

This document summarizes all the code changes made and configuration steps needed to deploy your backend to Railway and frontend to Vercel.

## ✅ Code Changes Made

### 1. Backend Configuration Updates

**File:** `backend/src/main/resources/application.properties`

**Change:** Added support for Spring profile activation via environment variable
```properties
# Active Profile (can be overridden by SPRING_PROFILES_ACTIVE environment variable)
# For Railway deployment, set SPRING_PROFILES_ACTIVE=prod
spring.profiles.active=${SPRING_PROFILES_ACTIVE:}
```

**Why:** This allows Railway to activate the `prod` profile which uses PostgreSQL and production settings.

### 2. Frontend Environment Configuration

**File:** `frontend/.env.example` (created)

**Content:**
```env
VITE_API_BASE_URL=http://localhost:8080
```

**Why:** Provides a template for developers to configure the API base URL.

### 3. Railway Configuration

**File:** `railway.json` (created)

**Why:** Helps Railway understand how to build and deploy your Spring Boot application.

### 4. Deployment Documentation

**File:** `DEPLOYMENT_GUIDE.md` (created)

**Why:** Comprehensive step-by-step guide for deploying to Railway and Vercel.

---

## 🔧 Configuration Required (No Code Changes)

### Backend (Railway) - Environment Variables

You need to set these in Railway Dashboard → Your Service → Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `SPRING_PROFILES_ACTIVE` | `prod` | Activates production profile |
| `SPRING_DATASOURCE_URL` | `${{Postgres.DATABASE_URL}}` | Auto-provided by Railway when you add PostgreSQL |
| `SPRING_DATASOURCE_USERNAME` | `${{Postgres.USERNAME}}` | Auto-provided by Railway |
| `SPRING_DATASOURCE_PASSWORD` | `${{Postgres.PASSWORD}}` | Auto-provided by Railway |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` | **Update after deploying frontend** |
| `PORT` | `${{PORT}}` | Auto-provided by Railway |

### Frontend (Vercel) - Environment Variables

You need to set this in Vercel Dashboard → Your Project → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_API_BASE_URL` | `https://your-backend.railway.app` | Your Railway backend URL (no trailing slash) |

---

## 📋 Deployment Steps Summary

### Step 1: Deploy Backend to Railway
1. Push code to GitHub
2. Create Railway project from GitHub repo
3. Add PostgreSQL database service
4. Set environment variables (except `CORS_ALLOWED_ORIGINS` - do this after Step 2)
5. Deploy and note the backend URL

### Step 2: Deploy Frontend to Vercel
1. Deploy frontend to Vercel (via CLI or Dashboard)
2. Set `VITE_API_BASE_URL` environment variable with Railway backend URL
3. Note the Vercel frontend URL

### Step 3: Connect Frontend and Backend
1. Update `CORS_ALLOWED_ORIGINS` in Railway with Vercel frontend URL
2. Railway will auto-redeploy
3. Test the connection

---

## 🔍 How APIs Connect

### Current Code Analysis

**Backend CORS Configuration:**
- File: `backend/src/main/java/com/zynklabs/config/CorsConfig.java`
- Reads from: `spring.web.cors.allowed-origins` property
- Supports multiple origins (comma-separated)
- Already configured to use environment variables ✅

**Frontend API Configuration:**
- File: `frontend/src/services/api.ts`
- Reads from: `import.meta.env.VITE_API_BASE_URL`
- Falls back to: `http://localhost:8080` if not set
- Already configured to use environment variables ✅

### Connection Flow

```
1. User visits Vercel frontend (https://your-app.vercel.app)
   ↓
2. Frontend makes API call using VITE_API_BASE_URL
   ↓
3. Request goes to Railway backend (https://your-backend.railway.app/api/contact)
   ↓
4. Backend checks CORS_ALLOWED_ORIGINS
   ↓
5. If Vercel URL is in allowed origins → Request succeeds ✅
   ↓
6. Backend processes request and returns response
   ↓
7. Frontend receives response and updates UI
```

---

## ⚠️ Important Notes

1. **No Trailing Slash:** 
   - `VITE_API_BASE_URL` should NOT have a trailing slash
   - ✅ Correct: `https://your-backend.railway.app`
   - ❌ Wrong: `https://your-backend.railway.app/`

2. **CORS Origins:**
   - Must include `https://` protocol
   - Can include multiple URLs separated by commas
   - Example: `https://app.vercel.app,https://app-git-main.vercel.app`

3. **Environment Variables:**
   - Railway variables are set per-service
   - Vercel variables can be set for Production, Preview, and Development separately
   - After changing variables, services may need to redeploy

4. **Profile Activation:**
   - Railway must set `SPRING_PROFILES_ACTIVE=prod` to use PostgreSQL
   - Without this, backend will try to use H2 (in-memory) database

---

## 🧪 Testing Checklist

After deployment, verify:

- [ ] Backend health endpoint works: `https://your-backend.railway.app/api/health`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Contact form submits successfully
- [ ] Book demo form submits successfully
- [ ] No CORS errors in browser console
- [ ] Data is stored in PostgreSQL database
- [ ] API responses are correct

---

## 📚 Additional Resources

- **Full Deployment Guide:** See `DEPLOYMENT_GUIDE.md`
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Spring Boot Profiles:** https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.profiles

---

## 🆘 Troubleshooting

### Common Issues

1. **CORS Error:**
   - Verify `CORS_ALLOWED_ORIGINS` includes exact Vercel URL
   - Check for typos (https vs http, trailing slash, etc.)
   - Ensure Railway has redeployed after variable change

2. **API Connection Failed:**
   - Verify `VITE_API_BASE_URL` is set correctly in Vercel
   - Test backend URL directly in browser
   - Check Railway logs for errors

3. **Database Connection Failed:**
   - Verify PostgreSQL service is added in Railway
   - Check `SPRING_PROFILES_ACTIVE=prod` is set
   - Verify database environment variables are set

For detailed troubleshooting, see `DEPLOYMENT_GUIDE.md`.

