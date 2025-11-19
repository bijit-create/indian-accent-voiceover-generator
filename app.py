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

# Start a simple HTTP server for the dist folder in a separate thread
import threading
import http.server
import socketserver
import time

PORT = 8503

def start_server():
    """Start HTTP server for serving static files"""
    os.chdir('dist')
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

# Start server in background thread if not already running
if 'server_started' not in st.session_state:
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1)  # Give server time to start
    st.session_state.server_started = True

# Create an iframe that loads from the local server with API key injected
iframe_html = f"""
<!DOCTYPE html>
<html>
<head>
    <script>
        window.process = {{ 
            env: {{ 
                API_KEY: "{api_key}" 
            }} 
        }};
    </script>
</head>
<body style="margin:0;padding:0;overflow:hidden">
    <iframe src="http://localhost:{PORT}" 
            style="width:100%;height:1000px;border:none;" 
            frameborder="0">
    </iframe>
</body>
</html>
"""

# Render the iframe
components.html(iframe_html, height=1000, scrolling=True)

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

