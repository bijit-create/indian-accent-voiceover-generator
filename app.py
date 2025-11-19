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

# Read the built HTML
with open(dist_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read the JavaScript files and inline them
assets_dir = Path("dist/assets")
js_files = sorted(assets_dir.glob("*.js"))

js_scripts = ""
for js_file in js_files:
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
        js_scripts += f'<script type="module">{js_content}</script>\n'

# Inject API key and inline scripts
injection = f"""
<script>
  window.process = {{ 
    env: {{ 
      API_KEY: "{api_key}" 
    }} 
  }};
</script>
{js_scripts}
"""

# Remove external script references from HTML
import re
html_content = re.sub(r'<script[^>]*src="[^"]*"[^>]*></script>', '', html_content)
html_content = re.sub(r'<link[^>]*href="/index\.css"[^>]*>', '', html_content)

# Inject before closing body tag
html_content = html_content.replace('</body>', injection + '</body>')

# Render the complete HTML
components.html(html_content, height=1000, scrolling=True)

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

