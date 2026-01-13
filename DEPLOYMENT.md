# Deployment Guide for MatchaMate Adelaide

This guide will help you deploy your MatchaMate Adelaide website so others can access it online.

## Quick Start - Deploy to Vercel (Easiest Option)

### Step 1: Configure Git

Before committing your code, set up your Git identity:

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### Step 2: Create Initial Commit

```bash
cd matchamate-adelaide
git add .
git commit -m "Initial commit: MatchaMate Adelaide"
```

### Step 3: Push to GitHub

1. Go to [GitHub](https://github.com/new) and create a new repository
   - Name it: `matchamate-adelaide`
   - Keep it public (or private if you prefer)
   - Don't initialize with README (we already have one)

2. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/matchamate-adelaide.git
   git branch -M main
   git push -u origin main
   ```

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login (you can use your GitHub account)

2. Click **"Add New Project"**

3. Click **"Import Git Repository"**

4. Select your `matchamate-adelaide` repository

5. Vercel will automatically detect it's a Next.js project:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Click **"Deploy"**

7. Wait 2-3 minutes for the build to complete

8. Your site will be live at: `https://matchamate-adelaide.vercel.app`
   (or similar URL)

### Step 5: Share Your Site

Once deployed, you can:
- Share the Vercel URL with anyone
- Add a custom domain in Vercel settings (optional)
- The site will automatically redeploy when you push changes to GitHub

## Alternative: Deploy to Netlify

1. Follow Steps 1-3 above (Git setup and GitHub push)

2. Go to [netlify.com](https://netlify.com) and sign up/login

3. Click **"Add new site"** → **"Import an existing project"**

4. Connect to GitHub and select your repository

5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

6. Click **"Deploy site"**

7. Your site will be live at: `https://your-site-name.netlify.app`

## Updating Your Site

After the initial deployment, any time you make changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

The site will automatically rebuild and deploy your changes!

## Custom Domain (Optional)

### For Vercel:
1. Go to your project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow instructions to update DNS settings

### For Netlify:
1. Go to **"Site settings"** → **"Domain management"**
2. Click **"Add custom domain"**
3. Follow instructions to update DNS settings

## Troubleshooting

### Build Fails
- Make sure all dependencies are in `package.json`
- Check the build logs for specific errors
- Try running `npm run build` locally first

### Site Not Loading
- Check the deployment logs
- Ensure all environment variables are set (if needed)
- Clear your browser cache

### Map Not Showing
- The Leaflet map may take a moment to load
- Check browser console for errors

## Support

If you encounter issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Netlify Documentation](https://docs.netlify.com)
- Review your build logs for specific errors

---

**Your MatchaMate Adelaide site is ready to share with the world!**
