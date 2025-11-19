import { readFileSync } from 'fs';
import { loadEnv } from 'vite';

console.log('\n=== Detailed Environment Check ===\n');

// Read .env file directly
try {
    const envFileContent = readFileSync('.env', 'utf8');
    console.log('📄 .env file contents:');
    console.log('---START---');
    console.log(envFileContent);
    console.log('---END---\n');
    
    // Check for common issues
    const lines = envFileContent.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('GEMINI_API_KEY')) {
            console.log(`Line ${index + 1}: ${line}`);
            
            // Check for issues
            if (line.includes('"') || line.includes("'")) {
                console.log('  ⚠️  WARNING: Contains quotes (remove them!)');
            }
            if (line.includes(' = ') || line.startsWith(' ')) {
                console.log('  ⚠️  WARNING: Contains extra spaces');
            }
            const keyPart = line.split('=')[1]?.trim();
            if (keyPart) {
                console.log(`  Key value: "${keyPart}"`);
                console.log(`  Key length: ${keyPart.length} characters`);
                console.log(`  Starts with: ${keyPart.substring(0, 8)}...`);
                console.log(`  Ends with: ...${keyPart.substring(keyPart.length - 4)}`);
                
                if (keyPart.startsWith('AIzaSy')) {
                    console.log('  ✅ Format looks correct!');
                } else {
                    console.log('  ❌ Should start with "AIzaSy"');
                }
                
                if (keyPart.length >= 35 && keyPart.length <= 45) {
                    console.log('  ✅ Length looks correct!');
                } else {
                    console.log('  ❌ Length seems wrong (should be ~39 chars)');
                }
            }
        }
    });
    
} catch (error) {
    console.log('❌ Could not read .env file:', error.message);
}

console.log('\n=== What Vite Sees ===\n');

// Check what Vite loads
const env = loadEnv('development', '.', '');
console.log('GEMINI_API_KEY from Vite:');
console.log(`  Value: "${env.GEMINI_API_KEY}"`);
console.log(`  Length: ${env.GEMINI_API_KEY?.length || 0} characters`);

if (env.GEMINI_API_KEY) {
    console.log(`  Starts with: ${env.GEMINI_API_KEY.substring(0, 10)}...`);
} else {
    console.log('  ❌ NOT LOADED!');
}

console.log('\n=== Recommendations ===\n');

if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY.length < 30) {
    console.log('Your .env file should look EXACTLY like this:');
    console.log('\nGEMINI_API_KEY=AIzaSyYourActualKeyHere\n');
    console.log('Make sure:');
    console.log('  - No spaces around the = sign');
    console.log('  - No quotes around the key');
    console.log('  - The key starts with AIzaSy');
    console.log('  - The file is saved as ".env" (not .env.txt)\n');
}

