# Streamlit Deployment Guide

This guide will walk you through deploying the AI Voiceover Studio to Streamlit Cloud.

## Prerequisites

1. A Google GenAI API Key (from Google AI Studio)
2. A GitHub account
3. A Streamlit Cloud account (free - sign up at https://streamlit.io/)

---

## Step 1: Build the React App

Before deploying, you need to build the React application:

```bash
# Install dependencies (if not already done)
npm install

# Build the production version
npm run build
```

This will create a `dist` folder containing the compiled React app.

**Important:** Make sure to commit the `dist` folder to your Git repository!

---

## Step 2: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit with build files"
   ```

2. **Create a GitHub Repository:**
   - Go to https://github.com/new
   - Create a new repository
   - Don't initialize with README (you already have files)

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

**Critical:** Make sure these files are included:
- ✅ `app.py`
- ✅ `requirements.txt`
- ✅ `dist/` folder (with all built files)
- ✅ `.streamlit/config.toml`

---

## Step 3: Deploy to Streamlit Cloud

1. **Go to Streamlit Cloud:**
   - Visit https://share.streamlit.io/
   - Sign in with GitHub

2. **Create New App:**
   - Click "New app"
   - Select your repository
   - Choose the branch (usually `main`)
   - Set main file path: `app.py`

3. **Add Your API Key:**
   - Click "Advanced settings"
   - In the "Secrets" section, add:
   ```toml
   API_KEY = "YOUR_GOOGLE_GENAI_API_KEY_HERE"
   ```
   
   Example:
   ```toml
   API_KEY = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for the app to build and deploy

---

## Step 4: Access Your App

Once deployed, Streamlit will give you a URL like:
```
https://your-app-name.streamlit.app
```

Share this URL with anyone who needs to use the voiceover generator!

---

## Updating Your App

To update the app after making changes:

1. **Rebuild the React app:**
   ```bash
   npm run build
   ```

2. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Update app"
   git push
   ```

3. Streamlit Cloud will automatically detect the changes and redeploy.

---

## Troubleshooting

### "Build files not found" error
- Make sure you ran `npm run build`
- Make sure the `dist` folder is committed to Git
- Check that `dist/index.html` exists

### "API_KEY not found" error
- Go to your Streamlit Cloud app settings
- Click on "Secrets" in the left sidebar
- Add your API key in TOML format

### App is slow or timing out
- This is a client-side heavy app running in an iframe
- Make sure your API key has proper permissions
- Try reducing concurrency in the app settings

### Changes not showing up
- Streamlit Cloud caches deployments
- Go to app settings → Click "Reboot app"
- Or clear your browser cache

---

## Cost Considerations

- **Streamlit Cloud:** Free tier includes 1 app with unlimited visitors
- **Google GenAI API:** Check Google's pricing for the Gemini API
- The app processes audio generation client-side, so Streamlit usage is minimal

---

## Local Testing (Optional)

Test the Streamlit deployment locally before pushing:

```bash
# Create a .streamlit/secrets.toml file (local only, DON'T commit this)
echo 'API_KEY = "your-key-here"' > .streamlit/secrets.toml

# Run Streamlit locally
streamlit run app.py
```

Open http://localhost:8501 in your browser.

**Note:** Add `.streamlit/secrets.toml` to your `.gitignore` to avoid committing your API key!

---

## Security Notes

- Never commit your API key directly in code
- Always use Streamlit Secrets for API keys
- The API key is injected at runtime and not exposed to end users
- Consider setting up API key usage limits in Google Cloud Console

---

## Need Help?

- Streamlit Docs: https://docs.streamlit.io/
- Streamlit Community: https://discuss.streamlit.io/
- Google GenAI Docs: https://ai.google.dev/

