
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Product } from '../types';
import { formatPrice } from '../data';

function buildSystemPrompt(products: Product[]): string {
  const productList = products.slice(0, 40).map(p =>
    `- ${p.name} (${p.category}): ${formatPrice(p.price)}${p.description ? ' — ' + p.description : ''}${p.isNew ? ' [NEW]' : ''}${p.isTrending ? ' [TRENDING]' : ''}`
  ).join('\n');

  return `You are "Sam", a friendly and knowledgeable AI shopping assistant for SAMSTONES — a premium Nigerian marketplace (Samstones Marketplace) selling luxury goods including Shoes, Bags, Clothes, Jewelries, Cars, Phone Accessories, Drinks, Cosmetics, Provisions, and Real Estates.

Our store opening hours are: 8am - 10pm, Monday to Saturday (Closed on Sundays).

Your personality: warm, helpful, enthusiastic about fashion and luxury, professional but conversational. You use natural Nigerian English occasionally (e.g., "you will love this", "very nice", etc.). You speak concisely — keep replies to 2-4 sentences unless listing products.

Your capabilities:
- Help customers find products by category, price range, or description
- Answer questions about the store (Samstones is based in Nigeria. HQ: Iledu Bustop Badagry-Express Way, Lagos State. Branch: Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State. Phone: +234 806 517 9554. Email: support@samstonesresources.com, open Mon-Sat 8am-10pm, checkout via WhatsApp)
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

function parsePriceQuery(message: string): { limit: number; type: 'under' | 'over' } | null {
  // Strip currency symbols and commas
  const cleanMsg = message.toLowerCase().replace(/[,₦]/g, '');
  
  // Match patterns like "50k", "50 k", "50000"
  const match = cleanMsg.match(/(\d+)\s*k\b|(\d+)/);
  if (!match) return null;
  
  let limit = 0;
  if (match[1]) {
    limit = parseInt(match[1]) * 1000;
  } else if (match[2]) {
    limit = parseInt(match[2]);
  }
  
  if (limit <= 0) return null;
  
  let type: 'under' | 'over' = 'under';
  
  if (cleanMsg.includes('under') || 
      cleanMsg.includes('below') || 
      cleanMsg.includes('less than') || 
      cleanMsg.includes('budget') || 
      cleanMsg.includes('max') || 
      cleanMsg.includes('cheap') || 
      cleanMsg.includes('within')) {
    type = 'under';
  } else if (cleanMsg.includes('more than') || 
             cleanMsg.includes('above') || 
             cleanMsg.includes('over') || 
             cleanMsg.includes('greater than') || 
             cleanMsg.includes('not lower') || 
             cleanMsg.includes('not below') || 
             cleanMsg.includes('min') || 
             cleanMsg.includes('higher') || 
             cleanMsg.includes('expensive') || 
             cleanMsg.includes('from')) {
    type = 'over';
  } else {
    // Context fallback: if asking for "best [price]" or "show me [price]"
    if (cleanMsg.includes('best') || cleanMsg.includes('show') || cleanMsg.includes('find')) {
      type = 'under';
    } else {
      return null; // Not a clear price constraint
    }
  }
  
  return { limit, type };
}

function getCategoryProducts(products: Product[], categoryNames: string[], limit = 4): string {
  const matches = products.filter(p =>
    categoryNames.some(cat => p.category?.toLowerCase().includes(cat.toLowerCase()))
  );
  if (matches.length === 0) return '';
  return matches.slice(0, limit).map(p =>
    `- **${p.name}** — ${formatPrice(p.price)}${p.description ? ` _(${p.description.slice(0, 70)}...)_` : ''}`
  ).join('\n');
}

function findPredefinedAnswer(message: string, products: Product[]): string | null {
  const normalized = message.toLowerCase().trim();

  // 0. Price queries
  const priceQuery = parsePriceQuery(normalized);
  if (priceQuery) {
    const { limit, type } = priceQuery;
    let filtered = products.filter(p => type === 'under' ? p.price <= limit : p.price >= limit);
    if (type === 'under') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => a.price - b.price);
    }
    if (filtered.length > 0) {
      let reply = `Here are our finest items **${type === 'under' ? 'under or up to' : 'starting from'} ${formatPrice(limit)}**:\n\n`;
      filtered.slice(0, 8).forEach(p => {
        reply += `- **${p.name}** (${p.category}) — **${formatPrice(p.price)}**\n`;
        if (p.description) reply += `  _${p.description.slice(0, 80)}..._\n`;
      });
      reply += `\nWould you like me to help you add any of these to your cart? 🛍️`;
      return reply;
    } else {
      return `We don't currently have items in that price range, but feel free to browse our full collection on the homepage! 😊`;
    }
  }

  const containsAny = (...words: string[]) => words.some(word => normalized.includes(word));

  // Lowest / highest price
  if (containsAny('lowest price', 'cheapest', 'minimum price', 'least expensive', 'lowest')) {
    if (products.length > 0) {
      const p = [...products].sort((a, b) => a.price - b.price)[0];
      return `Our most affordable item right now is the **${p.name}** at **${formatPrice(p.price)}** in the ${p.category} category!`;
    }
  }

  if (containsAny('highest price', 'most expensive', 'maximum price', 'priciest', 'highest')) {
    if (products.length > 0) {
      const p = [...products].sort((a, b) => b.price - a.price)[0];
      return `Our most premium item right now is the **${p.name}** at **${formatPrice(p.price)}** in the ${p.category} category!`;
    }
  }

  // 1. How to order
  if (containsAny('order', 'buy', 'purchase', 'checkout', 'how to shop', 'how do i shop', 'how can i shop', 'how do i buy', 'how to buy')) {
    return `To order from **SAMSTONES**, simply follow these easy steps:
1. Browse our categories and click on any product you love.
2. Select your preferences (like color, size, or quantity) and click **Add to Cart**.
3. Open your Cart from the top-right header and click **Checkout on WhatsApp**.
4. This will open a pre-filled WhatsApp chat with our sales team so we can finalize delivery details with you! 🛍️`;
  }

  // 2. Location
  if (containsAny('located', 'location', 'address', 'where are you', 'where is', 'office', 'based', 'nigeria', 'lagos', 'headquarter')) {
    return `We are proudly based in **Nigeria**!
Our headquarter is located at **Iledu Bustop Badagry-Express Way, Lagos Nigeria** and our branch office is at **Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State, Nigeria**.
Our luxury physical items (shoes, bags, clothes, cosmetics, etc.) are available for prompt nationwide delivery directly to your doorstep.
For our luxury investments:
- 🚗 **Premium Cars** are available in **Lagos**.
- 🏠 **Real Estate & Lands** are available in premier, high-demand locations both in **Lagos** and across **Nigeria**!
We are open **Monday to Saturday, from 8am to 10pm** (Closed on Sundays).`;
  }

  // 3. Delivery
  if (containsAny('deliver', 'shipping', 'courier', 'send to', 'dispatch', 'transport')) {
    return `Yes, we offer reliable **nationwide delivery** across Nigeria! 📦 
Once you place your order via **Checkout on WhatsApp**, our representative will confirm your delivery address and provide you with direct delivery rates and timelines. For luxury cars and real estate properties, we arrange physical site inspections and secure handovers.`;
  }

  // 4. Contact
  if (containsAny('contact', 'phone', 'whatsapp', 'call you', 'reach you', 'support', 'email')) {
    return `You can reach our team instantly by clicking the **Checkout on WhatsApp** button in your Cart! 
- 📱 **Phone/WhatsApp:** +234 806 517 9554
- ✉️ **Email:** support@samstonesresources.com

Our support is fully active: **Monday to Saturday, 8am - 10pm**.`;
  }

  // 5. Trending / new arrivals — dynamic from real products
  if (containsAny('trending', 'trend', 'popular', 'hot', 'new arrival', 'new arrivals', 'latest', 'what\'s new')) {
    const trending = products.filter(p => p.isTrending || p.isNew).slice(0, 6);
    if (trending.length > 0) {
      let reply = `🔥 Here are our **hottest and newest items** at SAMSTONES right now:\n\n`;
      trending.forEach(p => {
        const badge = p.isNew ? ' 🆕' : p.isTrending ? ' 🔥' : '';
        reply += `- **${p.name}** (${p.category}) — **${formatPrice(p.price)}**${badge}\n`;
      });
      reply += `\nWhich of these would you like to know more about? 😊`;
      return reply;
    }
    // fallback: show a selection across categories
    const sample = products.slice(0, 6);
    if (sample.length > 0) {
      let reply = `Here are some of our featured items right now:\n\n`;
      sample.forEach(p => {
        reply += `- **${p.name}** (${p.category}) — **${formatPrice(p.price)}**\n`;
      });
      reply += `\nExplore our full collection on the homepage! 🛍️`;
      return reply;
    }
  }

  // 6–15. Category-specific — fully dynamic
  if (containsAny('shoes', 'shoe', 'footwear', 'sneakers', 'heels', 'sandals', 'oxford')) {
    const items = getCategoryProducts(products, ['shoes', 'footwear']);
    if (items) return `We have an elite collection of luxury footwear! 👟\n\n${items}\n\nClick the **Shoes** category on our homepage to see the full collection!`;
  }

  if (containsAny('bags', 'bag', 'handbag', 'backpack', 'purse', 'clutch')) {
    const items = getCategoryProducts(products, ['bags', 'bag']);
    if (items) return `We offer premium luxury bags and clutches! 👜\n\n${items}\n\nClick the **Bags** category on our homepage to see the full designer collection!`;
  }

  if (containsAny('clothes', 'clothing', 'suit', 'senator', 'wear', 'outfit', 'native')) {
    const items = getCategoryProducts(products, ['clothes', 'clothing']);
    if (items) return `We offer impeccably tailored luxury outfits! 👗👔\n\n${items}\n\nSelect the **Clothes** category on our homepage to browse all our luxury outfits!`;
  }

  if (containsAny('jewelries', 'jewelry', 'jewellery', 'gold', 'necklace', 'ring', 'bracelet', 'earring', 'bead')) {
    const items = getCategoryProducts(products, ['jewelry', 'jewel']);
    if (items) return `Add a touch of elegance with our premium jewelry pieces! 💎\n\n${items}\n\nBrowse the **Jewelries** category on our homepage!`;
  }

  if (containsAny('cars', 'car', 'vehicle', 'mercedes', 'suv', 'benz', 'g-class', 'g-wagon', 'toyota', 'lexus')) {
    const items = getCategoryProducts(products, ['cars', 'car', 'vehicle']);
    if (items) return `Looking for luxury on wheels? 🚗\n\n${items}\n\nExplore the **Cars** category on our homepage to view all our luxury vehicle listings.`;
  }

  if (containsAny('phone', 'accessories', 'airpods', 'charger', 'power bank', 'smartwatch', 'gadget')) {
    const items = getCategoryProducts(products, ['phone', 'accessories', 'tech']);
    if (items) return `Upgrade your tech collection! 🎧\n\n${items}\n\nClick the **Phone Accessories** category on our homepage to see all our gadgets!`;
  }

  if (containsAny('drinks', 'drink', 'wine', 'champagne', 'beverage', 'whiskey', 'spirits')) {
    const items = getCategoryProducts(products, ['drinks', 'drink', 'beverage']);
    if (items) return `Celebrate in high style! 🍾\n\n${items}\n\nClick the **Drinks** category on our homepage to explore our complete premium beverage collection.`;
  }

  if (containsAny('cosmetics', 'cosmetic', 'perfume', 'fragrance', 'skincare', 'makeup', 'beauty')) {
    const items = getCategoryProducts(products, ['cosmetics', 'cosmetic', 'beauty']);
    if (items) return `Smell and feel premium every single day! ✨\n\n${items}\n\nView all our luxury beauty products under the **Cosmetics** category on our homepage!`;
  }

  if (containsAny('provisions', 'provision', 'groceries', 'grocery', 'food', 'rice')) {
    const items = getCategoryProducts(products, ['provisions', 'provision', 'grocery']);
    if (items) return `Stock up on high-quality kitchen essentials! 🌾\n\n${items}\n\nSelect the **Provisions** category on our homepage to browse all household groceries.`;
  }

  if (containsAny('real estate', 'estate', 'property', 'properties', 'apartment', 'house', 'duplex', 'land')) {
    const items = getCategoryProducts(products, ['real estate', 'property', 'land']);
    if (items) return `Invest in secure, high-yield luxury properties! 🏠\n\n${items}\n\nClick the **Real Estates** category on our homepage to view all available listings and schedule inspections.`;
  }

  // 16. General categories / inventory
  if (containsAny('sell', 'have', 'products', 'category', 'categories', 'items', 'inventory', 'stock', 'what do you do')) {
    const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
    const catList = cats.length > 0
      ? cats.map(c => `- **${c}**`).join('\n')
      : `- 👟 Shoes\n- 👜 Bags\n- 👗 Clothes\n- 💎 Jewelries\n- 🚗 Cars\n- 🎧 Phone Accessories\n- 🍾 Drinks\n- 🧴 Cosmetics\n- 🌾 Provisions\n- 🏠 Real Estates`;
    return `We offer a curated collection of luxury items across these categories:\n\n${catList}\n\nFeel free to click any category on our homepage to see our full inventory! 🛍️`;
  }

  // 17. Hours
  if (containsAny('hours', 'time', 'when are you open', 'opening', 'close', 'schedule', 'open days', 'saturday', 'monday', 'weekdays')) {
    return `We are open **Monday to Saturday, from 8am to 10pm**! 🕙 
Please note that we are closed on Sundays. You can still browse our site and add items to your cart anytime, and we will process your WhatsApp order first thing Monday morning!`;
  }

  return null;
}




export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  products: Product[]
): Promise<string> {
  // 1. Try local FAQ matcher first to give instant, bulletproof replies even if offline/blocked
  const faqAnswer = findPredefinedAnswer(message, products);
  if (faqAnswer) {
    return faqAnswer;
  }

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY || API_KEY.trim() === '') {
    return "Hi! I'm Sam 👋 I am here to help you explore our collection! Feel free to browse our categories, add items to your cart, and checkout on WhatsApp. You can also chat directly with our team anytime! 🛍️";
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY.trim());
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemMsg = buildSystemPrompt(products);

    // Format the entire history as a single text prompt to completely bypass Gemini's strict history validation rules
    let promptString = `[SYSTEM INSTRUCTIONS]\n${systemMsg}\n\n[CONVERSATION HISTORY]\n`;
    
    for (const msg of history) {
      const speaker = msg.role === 'assistant' ? 'Sam' : 'User';
      promptString += `${speaker}: ${msg.content}\n\n`;
    }
    
    // Add the final prompt for the assistant to reply
    promptString += `Sam: `;

    const result = await model.generateContent(promptString);
    const text = result.response.text();
    return text || "I couldn't generate a response. Please try asking again!";

  } catch (error: any) {
    console.error('Gemini API error:', error);
    const msg = error?.message || '';
    
    if (msg.includes('API_KEY') || msg.includes('api key') || msg.includes('API key')) {
      return "Hi! I'm Sam 👋 I am here to help you explore our collection! Feel free to browse our categories, add items to your cart, and checkout on WhatsApp. You can also chat directly with our team anytime! 🛍️";
    }
    if (msg.includes('quota') || msg.includes('QUOTA')) {
      return "I've hit my usage limit for now. Please try again in a few minutes! 😊";
    }
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('Failed to fetch') || error instanceof TypeError) {
      return `Hi there! I'm having trouble connecting to my AI brain right now. 🧠⚡

This is usually caused by:
1. **Adblockers** (like Brave Shields or uBlock Origin) blocking third-party AI connections.
2. **VPNs** or strict local networks/ISPs.

**How to fix the connection:**
- If you're on **Brave**, try turning off **Shields** for this site.
- Try testing in an **Incognito window** or on a mobile phone using cellular data.

No worries at all, though! Here are answers to our most popular questions:
- **How to Buy:** Add items to your cart, click **Checkout on WhatsApp**, and chat with our team.
- **Location:** We are based in Nigeria! Our luxury cars are available in **Lagos**, and lands/real estates are located in premium areas across both **Lagos** and other parts of **Nigeria**.
- **Delivery:** Yes, safe & prompt nationwide delivery is fully available for all physical goods.

Feel free to browse our premium collection, or click the WhatsApp icon on any product or cart to message our human sales team directly! 💬`;
    }
    // Return the actual error to help debugging
    return `Error: ${msg || 'Unknown error. Check browser console for details.'}`;
  }
}
