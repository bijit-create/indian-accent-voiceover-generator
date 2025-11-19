# How to Run the App Locally

## Option 1: Run React App Directly (Recommended for Local Development)

This is the easiest way to run the app on your local machine.

### Step 1: Create .env file

Create a file named `.env` in the project root with your API key:

```
GEMINI_API_KEY=your-actual-api-key-here
```

Example:
```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Step 2: Run the development server

```bash
npm run dev
```

### Step 3: Open in browser

The app will automatically open at **http://localhost:3000**

---

## Option 2: Run with Streamlit (For Testing Deployment)

If you want to test the Streamlit deployment locally:

### Step 1: Add API key to Streamlit secrets

Edit `.streamlit/secrets.toml` and add:

```toml
API_KEY = "your-actual-api-key-here"
```

### Step 2: Build the React app

```bash
npm run build
```

### Step 3: Run Streamlit

```bash
streamlit run app.py
```

or

```bash
python -m streamlit run app.py
```

---

## Get Your API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIzaSy...`)

---

## Troubleshooting

**Port already in use?**
- Kill the process: `taskkill /F /PID <process-id>`
- Or use a different port: `npm run dev -- --port 3001`

**API key not working?**
- Make sure there are no quotes inside quotes
- Make sure there are no extra spaces
- Restart the dev server after changing .env

**Build fails?**
- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Run `npm run build` again

