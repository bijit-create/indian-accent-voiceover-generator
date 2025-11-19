# AI Voiceover Studio (Batch Generator)

## 📖 Overview
**AI Voiceover Studio** is a specialized, high-performance React application designed to streamline the creation of synthetic voiceovers from Excel spreadsheets. Powered by **Google's Gemini 2.5 Flash API**, it converts text rows into high-quality, Indian-accented English audio files in bulk.

This tool is engineered for efficiency, allowing users to process hundreds of lines, manage API concurrency, and export organized audio files seamlessly.

---

## ✨ Key Features

### 1. Excel Integration
- **Format Support:** Native support for `.xlsx` and `.xls` files.
- **Column Mapping:** Dynamic dropdowns allow you to select which column contains the **Text** to be spoken and which column defines the **Filename**.

### 2. Advanced Batch Control
- **Range Selection:** You don't have to process the whole file at once. Specify a **Start Row** and a **Quantity** to generate small batches (e.g., "Start at row 50, generate 10 files").
- **Concurrency Throttling:** User-selectable concurrency (1, 3, 5, or 10 parallel requests) to balance speed against API rate limits.

### 3. Live Operations Dashboard
- **Real-Time Metrics:** Visual counters for Total Batch Size, Pending, Processing, Completed, and Error states.
- **Pause & Resume:** A global control to immediately pause the processing queue and resume it later without losing progress.

### 4. Quality Assurance & Export
- **Instant Preview:** Listen to generated MP3s directly in the browser list before downloading.
- **Regeneration:** If an audio file isn't quite right, hit the **Regenerate** button to re-process that specific line without restarting the whole batch.
- **Error Retry:** Individual retry buttons for any items that failed due to network or API issues.
- **ZIP Export:** Compresses all successfully generated files into a named ZIP archive (e.g., `voiceovers_1_to_10.zip`) for one-click download.

---

## ⚙️ The Logic Pipeline

Here is how the application functions under the hood:

### Phase 1: Data Ingestion
1.  **Parsing:** The app uses `SheetJS (xlsx)` to parse the binary Excel file into a raw JSON array.
2.  **Validation:** It checks for headers and ensures data exists.
3.  **Configuration:** The user selects the target columns and the specific range of rows to process.

### Phase 2: Queue Orchestration
1.  **State Initialization:** A "Task List" state is created, marking all selected items as `pending`.
2.  **The Queue Engine:** A React `useEffect` hook acts as the engine. It monitors the `results` state:
    *   *Condition:* Is the number of `processing` items < `concurrency` limit? AND is processing not paused?
    *   *Action:* If yes, it grabs the next `pending` item, marks it as `processing`, and triggers the API call.
3.  **Concurrency:** By adjusting the concurrency limit, the `useEffect` naturally allows more or fewer simultaneous asynchronous operations.

### Phase 3: API & Audio Engineering
1.  **Request:** The app sends a request to the `gemini-2.5-flash-preview-tts` model via the Google GenAI SDK.
2.  **Response:** The API returns raw PCM (Pulse Code Modulation) audio data in Base64 format.
3.  **Transcoding (Browser-Side):**
    *   The app decodes the Base64 string into a `Uint8Array`.
    *   It uses `lamejs` to re-encode the raw PCM data into **MP3 format** (128kbps) entirely within the browser.
    *   A `Blob` URL is created for the MP3, making it instantly playable and downloadable.

---

## 🛠 Configuration: API Key

The application is strictly secure and does not store keys. It looks for the API key in the environment variables.

### Local Development
1.  Create a `.env` file in the project root.
2.  Add your key:
    ```env
    API_KEY=AIzaSyYourActualApiKeyHere...
    ```

### Cloud Hosting (Vercel/Netlify)
1.  Navigate to Project Settings > Environment Variables.
2.  Add `API_KEY` as the key and your actual Google GenAI key as the value.

---

## 🚀 Hosting on Streamlit

While this is a React app, you can host it on Streamlit Cloud by wrapping the built assets in a Python script.

### Step 1: Build the React App
Run the build command to generate the static files:
```bash
npm run build
```
*(This will create a `dist` folder containing `index.html` and assets)*

### Step 2: Create `app.py`
Create a Python file in the root directory to serve the HTML and inject the API key securely.

```python
import streamlit as st
import streamlit.components.v1 as components

# 1. Page Config
st.set_page_config(layout="wide", page_title="AI Voiceover Studio")

# 2. Load Static HTML
# Ensure the path points to your built index.html file
with open("dist/index.html", 'r', encoding='utf-8') as f:
    html_content = f.read()

# 3. Securely Inject API Key
# We inject a small script that defines process.env.API_KEY before the app loads.
api_key = st.secrets["API_KEY"]

js_injection = f"""
<script>
  window.process = {{ env: {{ API_KEY: "{api_key}" }} }};
</script>
"""

# Combine injection with the app HTML
full_html = js_injection + html_content

# 4. Render
components.html(full_html, height=900, scrolling=True)
```

### Step 3: Deploy to Streamlit Cloud
1.  Push your code (including `dist` folder and `app.py`) to GitHub.
2.  Connect the repo to Streamlit Cloud.
3.  In Streamlit Cloud **Advanced Settings**, add your secret:
    ```toml
    API_KEY = "AIzaSy..."
    ```
