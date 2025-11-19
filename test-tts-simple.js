import { GoogleGenAI } from '@google/genai';
import { loadEnv } from 'vite';

const env = loadEnv('development', '.', '');
const apiKey = env.GEMINI_API_KEY;

console.log('\n=== Simple TTS Test ===\n');

const ai = new GoogleGenAI({ apiKey: apiKey });

try {
    // Try with a simpler prompt
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ 
            parts: [{ 
                text: "Say hello in a clear Indian accent." 
            }] 
        }],
        config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { 
                        voiceName: 'Kore' 
                    },
                },
            },
        },
    });
    
    console.log('Full Response:');
    console.log(JSON.stringify(response, null, 2));
    
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (audioData) {
        console.log('\n✅ SUCCESS! Got audio data:', audioData.length, 'chars\n');
    } else {
        console.log('\n❌ No audio data in response\n');
        console.log('Finish Reason:', response.candidates?.[0]?.finishReason);
    }
    
} catch (error) {
    console.log('❌ Error:', error.message);
}

