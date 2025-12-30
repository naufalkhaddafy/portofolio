/// <reference types="astro/client" />
// Gemini API integration - API key loaded from environment variable
const API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY;

export async function callGeminiAPI(
    prompt: string,
    systemInstruction: string = ''
): Promise<string> {
    if (!API_KEY) {
        console.warn('API Key missing.');
        return 'ERROR: API KEY MISSING.';
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        // Check for API errors
        if (data.error) {
            console.error('Gemini API Error:', data.error);
            return `API ERROR: ${data.error.message || 'Unknown error'}`;
        }

        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI OFFLINE - No response.';
    } catch (error) {
        console.error('Connection Error:', error);
        return 'CONNECTION ERROR - Check network.';
    }
}
