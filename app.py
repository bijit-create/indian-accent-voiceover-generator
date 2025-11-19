import streamlit as st
import streamlit.components.v1 as components
import os
from pathlib import Path

# Page Configuration
st.set_page_config(
    page_title="AI Voiceover Studio",
    page_icon="🎙️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Get API key from Streamlit secrets
try:
    api_key = st.secrets["API_KEY"]
except (KeyError, FileNotFoundError):
    st.error("⚠️ API_KEY not found in Streamlit secrets. Please add it in your Streamlit Cloud settings.")
    st.info("""
    ### How to add your API key:
    1. Go to your Streamlit Cloud dashboard
    2. Click on your app settings
    3. Go to "Secrets" section
    4. Add the following:
    ```toml
    API_KEY = "your-google-genai-api-key-here"
    ```
    """)
    st.stop()

# Load the built React app
dist_path = Path("dist/index.html")

if not dist_path.exists():
    st.error("❌ Build files not found. Please run `npm run build` first to generate the dist folder.")
    st.info("""
    ### Build the React app:
    ```bash
    npm install
    npm run build
    ```
    This will create a `dist` folder with the built app.
    """)
    st.stop()

# Read all necessary files
with open(dist_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read the JavaScript files
assets_dir = Path("dist/assets")
js_files = list(assets_dir.glob("*.js"))

# Read all JS content
js_contents = {}
for js_file in js_files:
    with open(js_file, 'r', encoding='utf-8') as f:
        js_contents[js_file.name] = f.read()

# Create a complete standalone HTML with everything embedded
full_html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Voiceover Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {{
        theme: {{
          extend: {{
            fontFamily: {{
              sans: ['Inter', 'sans-serif'],
            }},
          }},
        }},
      }}
    </script>
    <script type="importmap">
    {{
      "imports": {{
        "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
        "@google/genai": "https://aistudiocdn.com/@google/genai@^1.30.0",
        "react/": "https://aistudiocdn.com/react@^19.2.0/",
        "react": "https://aistudiocdn.com/react@^19.2.0"
      }}
    }}
    </script>
    <script>
      window.process = {{ 
        env: {{ 
          API_KEY: "{api_key}" 
        }} 
      }};
    </script>
</head>
<body>
    <div id="root"></div>
    <script src="https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.all.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script type="module">
{js_contents.get('index-1j-paCA_.js', '')}
    </script>
    <script type="module">
{js_contents.get('index-vanFsCzP.js', '')}
    </script>
</body>
</html>
"""

# Render the complete HTML
components.html(full_html, height=1000, scrolling=True)

# Optional: Add footer
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666; font-size: 12px; padding: 20px;'>
        <p>🎙️ AI Voiceover Studio - Powered by Google Gemini 2.5 Flash TTS</p>
    </div>
    """,
    unsafe_allow_html=True
)

