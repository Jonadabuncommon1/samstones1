import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product } from '../types';
import { formatPrice } from '../data';

function buildSystemPrompt(products: Product[]): string {
  const productList = products.slice(0, 40).map(p =>
    `- ${p.name} (${p.category}): ${formatPrice(p.price)}${p.description ? ' — ' + p.description : ''}${p.isNew ? ' [NEW]' : ''}${p.isTrending ? ' [TRENDING]' : ''}`
  ).join('\n');

  return `You are "Sam", a friendly and knowledgeable AI shopping assistant for SAMSTONES — a premium Nigerian marketplace selling luxury goods including Shoes, Bags, Clothes, Jewelries, Cars, Phone Accessories, Drinks, Cosmetics, Provisions, and Real Estates.

Your personality: warm, helpful, enthusiastic about fashion and luxury, professional but conversational. You use natural Nigerian English occasionally (e.g., "you will love this", "very nice", etc.). You speak concisely — keep replies to 2-4 sentences unless listing products.

Your capabilities:
- Help customers find products by category, price range, or description
- Answer questions about the store (Samstones is based in Nigeria, payments via order through WhatsApp, checkout via WhatsApp chat)
- Suggest trending/new arrival products
- Explain how ordering works (add to cart → checkout on WhatsApp)
- Give general fashion/style advice
- Recommend products based on customer needs or budget

Current store inventory:
${productList}

Ordering process: Customers browse the site, add items to cart, then click "Checkout on WhatsApp". A WhatsApp message with their full order is sent to the Samstones team. Delivery is arranged after the WhatsApp conversation.

Important rules:
- NEVER make up products not in the inventory above
- If asked about a product not in stock, say it's not currently available and suggest similar alternatives
- Keep responses concise and helpful
- Always end with a helpful follow-up question or suggestion when appropriate`;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  products: Product[]
): Promise<string> {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY || API_KEY.trim() === '') {
    return "Hi! I'm Sam 👋 The AI assistant is almost ready — the Gemini API key just needs to be added to Vercel environment variables. In the meantime, feel free to browse the store or contact us on WhatsApp for help!";
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY.trim());

    // Use system instruction via the chat config
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemMsg = buildSystemPrompt(products);

    // Build chat history excluding the last (current) user message
    // Gemini requires history to start with a 'user' role message, so we drop any leading assistant messages
    const priorMessages = history.slice(0, -1);
    const firstUserIdx = priorMessages.findIndex(m => m.role === 'user');
    const trimmedHistory = firstUserIdx >= 0 ? priorMessages.slice(firstUserIdx) : [];

    const chatHistory = trimmedHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { maxOutputTokens: 400 },
    });

    // Prepend system context to the first message if it's the first real exchange
    const fullMessage = firstUserIdx < 0
      ? `[SYSTEM CONTEXT - follow this always]: ${systemMsg}\n\nUser: ${message}`
      : message;

    const result = await chat.sendMessage(fullMessage);
    const text = result.response.text();
    return text || "I couldn't generate a response. Please try asking again!";

  } catch (error: any) {
    console.error('Gemini API error:', error);
    const msg = error?.message || '';
    if (msg.includes('API_KEY') || msg.includes('api key') || msg.includes('API key')) {
      return "⚠️ The API key seems invalid. Please double-check that VITE_GEMINI_API_KEY is set correctly in Vercel and redeploy.";
    }
    if (msg.includes('quota') || msg.includes('QUOTA')) {
      return "I've hit my usage limit for now. Please try again in a few minutes! 😊";
    }
    if (msg.includes('network') || msg.includes('fetch')) {
      return "Network error — please check your internet connection and try again.";
    }
    // Return the actual error to help debugging
    return `Error: ${msg || 'Unknown error. Check browser console for details.'}`;
  }
}
