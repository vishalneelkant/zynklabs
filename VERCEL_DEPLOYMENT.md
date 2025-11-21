# Vercel Deployment Guide - Zynk Labs Frontend

## Quick Deployment Steps

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com) - free)
- Backend API URL (deploy backend first on Railway/Render)

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Code to GitHub

```bash
# Navigate to project root
cd "/Users/vishanee/langChain/hackathon/new project"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import Project on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"** or **"Import Project"**
3. **Select your GitHub repository** from the list
4. If not connected, click **"Connect GitHub"** and authorize Vercel

### Step 3: Configure Project Settings

In the project configuration page:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Important:** Make sure **Root Directory** is set to `frontend` since your React app is in the `frontend/` folder.

### Step 4: Add Environment Variables

1. Click **"Environment Variables"** section
2. Add the following variable:

   **Name:** `VITE_API_BASE_URL`
   
   **Value:** Your backend API URL (e.g., `https://zynklabs-backend.railway.app`)
   
   **Environments:** Select all (Production, Preview, Development)

3. Click **"Add"**

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 1-2 minutes)
3. Your site will be live at: `https://your-project-name.vercel.app`

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open a browser window for authentication.

### Step 3: Navigate to Frontend Directory

```bash
cd "/Users/vishanee/langChain/hackathon/new project/frontend"
```

### Step 4: Deploy

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

### Step 5: Add Environment Variable

```bash
vercel env add VITE_API_BASE_URL production
```

Enter your backend API URL when prompted (e.g., `https://your-backend.railway.app`)

### Step 6: Deploy to Production

```bash
vercel --prod
```

---

## Environment Variables

### Required Variable

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend-url.com` | Backend API base URL |

### Example Values

- **Development:** `http://localhost:8080`
- **Production:** `https://zynklabs-backend.railway.app` (or your backend URL)

---

## Post-Deployment Checklist

- [ ] Frontend deployed successfully on Vercel
- [ ] Environment variable `VITE_API_BASE_URL` is set
- [ ] Backend is deployed and accessible
- [ ] CORS is configured on backend to allow Vercel domain
- [ ] Test the website: Visit your Vercel URL
- [ ] Test contact form submission
- [ ] Test book demo form submission
- [ ] Check browser console for errors

---

## Update CORS on Backend

After deploying frontend, update your backend CORS configuration to allow your Vercel domain:

### Option 1: Update application.properties

```properties
spring.web.cors.allowed-origins=http://localhost:5173,https://your-project.vercel.app
```

### Option 2: Update CorsConfig.java

```java
config.addAllowedOrigin("https://your-project.vercel.app");
```

---

## Custom Domain (Optional)

1. Go to your project on Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `zynklabs.com`)
4. Follow DNS configuration instructions
5. Update backend CORS to include your custom domain

---

## Troubleshooting

### Build Fails

**Issue:** Build command fails
**Solution:** 
- Check Node.js version (should be 18+)
- Verify `package.json` has correct build script
- Check build logs in Vercel dashboard

### API Calls Fail

**Issue:** Frontend can't connect to backend
**Solution:**
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running and accessible
- Verify CORS is configured on backend
- Check browser console for CORS errors

### Environment Variables Not Working

**Issue:** `VITE_API_BASE_URL` is undefined
**Solution:**
- Environment variables must start with `VITE_` to be exposed to frontend
- After adding env vars, redeploy the project
- Check Vercel dashboard → Settings → Environment Variables

### 404 Errors on Routes

**Issue:** Direct URL access shows 404
**Solution:**
- Vercel should handle this with `vercel.json` rewrites
- Verify `vercel.json` exists in `frontend/` directory
- Check that rewrites are configured correctly

---

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME production

# Remove environment variable
vercel env rm VARIABLE_NAME production

# View deployment logs
vercel logs

# List all deployments
vercel ls
```

---

## Your Deployment URLs

After deployment, you'll have:

- **Production:** `https://your-project.vercel.app`
- **Preview:** `https://your-project-git-branch-username.vercel.app` (for each branch/PR)

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

