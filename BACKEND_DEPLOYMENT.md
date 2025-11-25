# Backend Deployment Guide - Spring Boot on Railway/Render

## ⚠️ Important: Vercel Cannot Host Spring Boot Backends

**Vercel is designed for:**
- ✅ Frontend static sites (React, Vue, Next.js, etc.)
- ✅ Serverless functions (Node.js, Python, Go)
- ❌ **NOT for Java/Spring Boot applications**

**Why?**
- Spring Boot requires a JVM (Java Virtual Machine) running continuously
- Vercel only supports serverless functions, not long-running Java processes
- Your backend needs a traditional server environment

## Recommended Architecture

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

## Option 1: Railway (Recommended) 🚀

### Why Railway?
- ✅ Free tier with $5 credit/month
- ✅ Automatic Spring Boot detection
- ✅ Easy PostgreSQL setup
- ✅ Automatic HTTPS
- ✅ Simple environment variable management
- ✅ GitHub integration

### Step-by-Step Deployment

#### 1. Prepare Your Backend

Make sure your `application-prod.properties` is configured to use environment variables (already done ✅).

#### 2. Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Authorize Railway to access your repositories

#### 3. Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository (`zynklabsai`)
4. Railway will detect it's a Spring Boot project

#### 4. Configure Root Directory

1. Go to **Settings** → **Source**
2. Set **Root Directory** to: `backend`
3. This tells Railway where your Spring Boot app is located

#### 5. Add PostgreSQL Database

1. In your project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically:
   - Create a PostgreSQL database
   - Generate connection credentials
   - Add them as environment variables

#### 6. Configure Environment Variables

Go to **Variables** tab and add:

```bash
# These are auto-added by Railway PostgreSQL service:
SPRING_DATASOURCE_URL=jdbc:postgresql://[auto-provided]
SPRING_DATASOURCE_USERNAME=[auto-provided]
SPRING_DATASOURCE_PASSWORD=[auto-provided]

# Additional variables:
SPRING_PROFILES_ACTIVE=prod
PORT=8080
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-custom-domain.com
```

**Note:** Railway automatically provides database connection variables. You just need to add:
- `SPRING_PROFILES_ACTIVE=prod`
- `CORS_ALLOWED_ORIGINS` (your Vercel frontend URL)

#### 7. Configure Build Settings

Railway auto-detects Spring Boot, but verify in **Settings** → **Deploy**:

- **Build Command:** `mvn clean package -DskipTests`
- **Start Command:** `java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar`
- **Root Directory:** `backend`

#### 8. Deploy

1. Railway will automatically build and deploy
2. Watch the build logs in the **Deployments** tab
3. Once deployed, Railway provides a URL like: `https://zynklabs-backend.railway.app`

#### 9. Test Your Backend

```bash
# Health check
curl https://your-backend.railway.app/api/health

# Should return: {"status":"ok"}
```

#### 10. Update Frontend Environment Variable

In Vercel dashboard:
1. Go to your frontend project
2. **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL` to: `https://your-backend.railway.app`

---

## Option 2: Render 🎨

### Why Render?
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ PostgreSQL add-on
- ✅ Good for Spring Boot apps

### Step-by-Step Deployment

#### 1. Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### 2. Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository

#### 3. Configure Service

```
Name: zynklabs-backend
Environment: Java
Build Command: cd backend && mvn clean package -DskipTests
Start Command: cd backend && java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar
```

#### 4. Add PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Create database (free tier available)
3. Note the connection details

#### 5. Add Environment Variables

In your Web Service → **Environment**:

```bash
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://[render-provided-host]:5432/[database-name]
SPRING_DATASOURCE_USERNAME=[render-provided-username]
SPRING_DATASOURCE_PASSWORD=[render-provided-password]
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

#### 6. Deploy

1. Click **"Create Web Service"**
2. Render will build and deploy automatically
3. Get your backend URL: `https://zynklabs-backend.onrender.com`

---

## Option 3: Heroku (Paid)

Heroku removed their free tier, but if you have a paid account:

1. Create `Procfile` in `backend/` directory:
   ```
   web: java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar
   ```

2. Deploy via Heroku CLI or GitHub integration

---

## Build Configuration

### Local Build Test

Before deploying, test the build locally:

```bash
cd backend
mvn clean package -DskipTests
java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar
```

### Production Build

The build creates a JAR file:
- Location: `backend/target/zynklabs-backend-0.0.1-SNAPSHOT.jar`
- This is what gets deployed to Railway/Render

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `prod` |
| `SPRING_DATASOURCE_URL` | PostgreSQL connection URL | `jdbc:postgresql://host:5432/dbname` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `your-password` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://your-app.vercel.app` |
| `PORT` | Server port (auto-set by platform) | `8080` |

### Railway Auto-Provided Variables

Railway automatically provides these when you add PostgreSQL:
- `DATABASE_URL` (full connection string)
- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`

Your `application-prod.properties` already reads from `SPRING_DATASOURCE_*` variables.

---

## Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Health endpoint working: `/api/health`
- [ ] PostgreSQL database connected
- [ ] Environment variables configured
- [ ] CORS updated with frontend URL
- [ ] Test contact form API: `POST /api/contact`
- [ ] Test book demo API: `POST /api/book-demo`
- [ ] Frontend `VITE_API_BASE_URL` updated
- [ ] End-to-end testing complete

---

## Troubleshooting

### Build Fails

**Issue:** Maven build fails
**Solution:**
- Check Java version (needs Java 17+)
- Verify `pom.xml` is valid
- Check build logs for specific errors

### Database Connection Fails

**Issue:** Cannot connect to PostgreSQL
**Solution:**
- Verify environment variables are set correctly
- Check database is running (Railway/Render dashboard)
- Test connection string format
- Ensure `SPRING_PROFILES_ACTIVE=prod` is set

### Port Issues

**Issue:** Application won't start
**Solution:**
- Railway/Render automatically sets `PORT` environment variable
- Your `application-prod.properties` uses `${PORT:8080}` ✅
- No additional configuration needed

### CORS Errors

**Issue:** Frontend can't call backend API
**Solution:**
- Update `CORS_ALLOWED_ORIGINS` with your Vercel URL
- Check `CorsConfig.java` allows your domain
- Verify backend is accessible (not blocked by firewall)

### Application Won't Start

**Issue:** Deployment succeeds but app crashes
**Solution:**
- Check logs in Railway/Render dashboard
- Verify all environment variables are set
- Ensure database is accessible
- Check Java version compatibility

---

## Quick Commands

```bash
# Local build and test
cd backend
mvn clean package -DskipTests
java -jar target/zynklabs-backend-0.0.1-SNAPSHOT.jar

# Railway CLI (optional)
railway login
railway init
railway link
railway up
railway logs

# Test API endpoints
curl https://your-backend.railway.app/api/health
curl -X POST https://your-backend.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

---

## Cost Comparison

| Platform | Free Tier | Paid Tier |
|----------|-----------|-----------|
| **Railway** | $5 credit/month | Pay-as-you-go |
| **Render** | Limited free tier | $7/month+ |
| **Heroku** | None (removed) | $7/month+ |

**Recommendation:** Start with Railway for the best free tier experience.

---

## Support Resources

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Spring Boot Deployment: https://spring.io/guides/gs/spring-boot-for-azure/

---

## Summary

✅ **Frontend:** Deploy to Vercel (React/Vite)  
✅ **Backend:** Deploy to Railway or Render (Spring Boot)  
✅ **Database:** PostgreSQL (provided by Railway/Render)  
❌ **Backend on Vercel:** Not possible (use Railway/Render instead)

