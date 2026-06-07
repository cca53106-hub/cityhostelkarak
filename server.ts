/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy client initialization to prevent server startup crashes
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is missing. Please add it in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health status endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', api_key_configured: !!process.env.GEMINI_API_KEY });
});

// Secure API endpoint for Gemini Smart Residency Assistant
app.post('/api/gemini/chat', async (req, res) => {
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

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini chatbot server runtime error:', error);
    res.status(500).json({ error: error.message || 'Apologies! Our digital concierge is undergoing updates. Let us direct you to the dial/whatsapp helpline instead.' });
  }
});

// Main Vite Server Bootstrap
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
