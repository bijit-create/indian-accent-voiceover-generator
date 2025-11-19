import { GoogleGenAI, Modality } from '@google/genai';
import { loadEnv } from 'vite';

const env = loadEnv('development', '.', '');

console.log('\n=== Testing API Key ===\n');

// Check if key exists
const apiKey = env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'paste-your-api-key-here') {
    console.log('❌ ERROR: GEMINI_API_KEY not set in .env file');
    console.log('Please edit .env and add your actual API key\n');
    process.exit(1);
}

console.log('✓ API Key found in .env file');
console.log('✓ Key length:', apiKey.length, 'characters');
console.log('✓ Key starts with:', apiKey.substring(0, 8) + '...\n');

// Test the API key with a simple text generation
console.log('Testing API key with Gemini API...\n');

const ai = new GoogleGenAI({ apiKey: apiKey });

try {
    // First test with basic text generation
    console.log('1. Testing basic Gemini access...');
    const basicResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [{ parts: [{ text: "Say 'Hello'" }] }]
    });
    
    console.log('   ✅ Basic API access works!');
    console.log('   Response:', basicResponse.candidates?.[0]?.content?.parts?.[0]?.text || 'No response');
    
} catch (error) {
    console.log('   ❌ Basic API test failed:', error.message);
    console.log('\n   This means your API key is invalid or doesn\'t have proper permissions\n');
    process.exit(1);
}

// Now test TTS specifically
try {
    console.log('\n2. Testing TTS (Text-to-Speech) model...');
    const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Say the following in a clear Indian accent: Hello world" }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
    
    const audioData = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (audioData) {
        console.log('   ✅ TTS API works! Audio generated successfully');
        console.log('   Audio data length:', audioData.length, 'characters (base64)\n');
        console.log('🎉 SUCCESS! Your API key is working correctly!\n');
    } else {
        console.log('   ⚠️  TTS API responded but no audio data received');
        console.log('   Response:', JSON.stringify(ttsResponse, null, 2));
    }
    
} catch (error) {
    console.log('   ❌ TTS test failed:', error.message);
    
    if (error.message.includes('not found') || error.message.includes('404')) {
        console.log('\n   The TTS model might not be available with your API key.');
        console.log('   You may need to enable it in Google AI Studio or use a different model.\n');
    } else if (error.message.includes('permission') || error.message.includes('403')) {
        console.log('\n   Your API key doesn\'t have permission for TTS.');
        console.log('   Try creating a new API key at: https://aistudio.google.com/app/apikey\n');
    } else {
        console.log('\n   Error details:', error);
    }
    process.exit(1);
}

