import { GoogleGenAI, Modality } from '@google/genai';
import { loadEnv } from 'vite';

const env = loadEnv('development', '.', '');
const apiKey = env.GEMINI_API_KEY;

console.log('\n=== Testing TTS Model Directly ===\n');
console.log('API Key:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 6));

const ai = new GoogleGenAI({ apiKey: apiKey });

try {
    console.log('Sending request to gemini-2.5-flash-preview-tts...\n');
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Say the following in a clear Indian accent: Hello, this is a test." }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
    
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (audioData) {
        console.log('✅ SUCCESS! TTS is working!');
        console.log('✅ Generated audio data length:', audioData.length, 'characters');
        console.log('\n🎉 Your app should work now!\n');
        process.exit(0);
    } else {
        console.log('❌ No audio data received');
        console.log('Response:', JSON.stringify(response, null, 2));
        process.exit(1);
    }
    
} catch (error) {
    console.log('❌ TTS test failed');
    console.log('Error:', error.message);
    
    if (error.message.includes('429') || error.message.includes('quota')) {
        console.log('\n⚠️  QUOTA EXCEEDED');
        console.log('Your API key has run out of free tier requests.');
        console.log('\nOptions:');
        console.log('1. Wait for quota to reset (usually resets daily)');
        console.log('2. Enable billing in Google Cloud Console');
        console.log('3. Create a new project and get a new API key\n');
    } else if (error.message.includes('404') || error.message.includes('not found')) {
        console.log('\n⚠️  Model not available with your API key');
        console.log('The TTS model might not be available in your region or plan\n');
    }
    
    process.exit(1);
}

