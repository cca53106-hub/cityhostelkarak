import { GoogleGenAI } from '@google/genai';

// Initialize lazy client to prevent startup runtime crashes
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is missing. Please make sure to configure GEMINI_API_KEY as an Environment Variable in your Vercel Dashboard Settings under "Environment Variables".');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build-vercel',
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // Support CORS headers if required, handle only POST method for safety
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message payload is required.' });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are the "Karak Hostel Gem Concierge"—the extraordinarily helpful, polished iOS-style digital concierge for our premium residential house in Jail Chowk, Karak, Pakistan.
CRITICAL CONSTRAINT: Keep your answers extremely short, compact, and premium. Answer in maximum 1 to 2 conversational, helpful sentences. Use clean typography and elegant emojis.
Provide direct facts about:
- Accommodation: Triple Shared (Rs 7,500/mo), Double Shared (Rs 12,000/mo), Private Suite (Rs 22,000/mo).
- Key Perks: 24/7 backup power, fiber WiFi, double-guard security, twice-daily meals, study lounge.
- Local: Close to KKKUK University and Karak General Bus Adda.
Gently encourage users to use our booking form below or chat on WhatsApp. Keep it sweet, welcoming, and immediate.`;

    const formattedHistory = history ? history.map((h: any) => ({
      role: h.role,
      parts: [{ text: h.text }]
    })) : [];

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `System Context:\n${systemPrompt}` }] },
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
      }
    });

    return res.status(200).json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini chatbot Vercel runtime error:', error);
    return res.status(500).json({ error: error.message || 'Apologies! Our digital concierge is undergoing updates. Please use our WhatsApp helpline.' });
  }
}
