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

    const url = `/api/9router/v1/chat/completions`;

    const messages = [];
    if (systemInstruction) {
        messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const payload = {
        model: 'kr/claude-sonnet-4.6',
        messages: messages,
        stream: false
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        // Check for API errors
        if (data.error) {
            console.error('API Error:', data.error);
            return `API ERROR: ${data.error.message || 'Unknown error'}`;
        }

        return data.choices?.[0]?.message?.content || 'AI OFFLINE - No response.';
    } catch (error) {
        console.error('Connection Error:', error);
        return 'CONNECTION ERROR - Check network.';
    }
}
