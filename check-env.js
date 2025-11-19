// Quick script to check if API key is loaded
import { loadEnv } from 'vite';

const env = loadEnv('development', '.', '');

console.log('\n=== Environment Check ===');
console.log('GEMINI_API_KEY exists:', !!env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY length:', env.GEMINI_API_KEY?.length || 0);
console.log('GEMINI_API_KEY starts with AIzaSy:', env.GEMINI_API_KEY?.startsWith('AIzaSy') || false);

if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'paste-your-api-key-here') {
    console.log('\n❌ ERROR: API key not set!');
    console.log('Please edit .env file and add your actual Google GenAI API key\n');
} else if (env.GEMINI_API_KEY.startsWith('AIzaSy')) {
    console.log('\n✅ API key appears to be valid format');
    console.log('If you still see errors, the key might not have proper permissions\n');
} else {
    console.log('\n⚠️  WARNING: API key format looks incorrect');
    console.log('Google GenAI keys usually start with "AIzaSy"\n');
}

