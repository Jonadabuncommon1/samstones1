import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product } from '../types';
import { formatPrice } from '../data';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

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

Ordering process: Customers browse the site, add items to cart, then checkout through WhatsApp. Delivery is arranged after the WhatsApp conversation.

Important rules:
- NEVER make up products not in the inventory above
- If asked about a product not in stock, say it's not currently available and suggest similar alternatives
- If the Gemini API key is missing, still introduce yourself warmly
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
  if (!API_KEY) {
    return "Hi! I'm Sam, your Samstones shopping assistant! 🛍️ I'd love to help you find something amazing today. To enable full AI chat, please add your VITE_GEMINI_API_KEY to the environment settings. In the meantime, feel free to browse our amazing collection of luxury goods!";
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: buildSystemPrompt(products),
    });

    const chat = model.startChat({
      history: history.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini API error:', error);
    if (error.message?.includes('API_KEY')) {
      return "I'm having trouble connecting right now. Please check that the Gemini API key is configured correctly.";
    }
    return "Sorry, I'm experiencing a connection issue. Please try again in a moment! 😊";
  }
}
