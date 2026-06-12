
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

function findPredefinedAnswer(message: string, products: Product[]): string | null {
  const normalized = message.toLowerCase().trim();

  // 0. Intercept and handle price queries first (Request 3: best under 50k, more than 50k)
  const priceQuery = parsePriceQuery(normalized);
  if (priceQuery) {
    const { limit, type } = priceQuery;
    let filtered = products.filter(p => type === 'under' ? p.price <= limit : p.price >= limit);
    
    if (type === 'under') {
      filtered.sort((a, b) => b.price - a.price); // Show best (most premium but within budget) first
    } else {
      filtered.sort((a, b) => a.price - b.price); // Show starting from budget floor first
    }
    
    if (filtered.length > 0) {
      let reply = `Here are our finest premium items **${type === 'under' ? 'under or up to' : 'starting from'} ${formatPrice(limit)}**:\n\n`;
      filtered.slice(0, 8).forEach(p => {
        reply += `- **${p.name}** (${p.category}) — **${formatPrice(p.price)}**\n`;
        if (p.description) reply += `  _${p.description.slice(0, 80)}..._\n`;
      });
      reply += `\nWould you like me to help you add any of these to your cart? 🛍️`;
      return reply;
    } else {
      return `We don't currently have items in stock that are exactly ${type === 'under' ? 'under' : 'above'} **${formatPrice(limit)}**, but here are some of our trending pieces: \n- **Italian Leather Oxfords** (₦85,000)\n- **Heritage Beaded Clutch** (₦45,000)\n\nFeel free to explore our homepage to see our full premium collection! 😊`;
    }
  }

  // Helper helpers to check if a message matches keywords
  const containsAny = (...words: string[]) => words.some(word => normalized.includes(word));

  if (containsAny('lowest price', 'cheapest', 'minimum price', 'least expensive', 'lowest')) {
    if (products.length > 0) {
      const minProduct = [...products].sort((a, b) => a.price - b.price)[0];
      return `Our most affordable premium item currently in stock is the **${minProduct.name}** at **${formatPrice(minProduct.price)}**. It's located in the ${minProduct.category} category!`;
    }
  }

  if (containsAny('highest price', 'most expensive', 'maximum price', 'priciest', 'highest')) {
    if (products.length > 0) {
      const maxProduct = [...products].sort((a, b) => b.price - a.price)[0];
      return `Our most premium item currently in stock is the **${maxProduct.name}** at **${formatPrice(maxProduct.price)}**. It's located in the ${maxProduct.category} category!`;
    }
  }


  // 1. How to order / buy / checkout
  if (containsAny('order', 'buy', 'purchase', 'checkout', 'how to shop', 'how do i shop', 'how can i shop', 'how do i buy', 'how to buy')) {
    return `To order from **SAMSTONES**, simply follow these easy steps:
1. Browse our categories and click on any product you love.
2. Select your preferences (like color, size, or quantity) and click **Add to Cart**.
3. Open your Cart from the top-right header and click **Checkout on WhatsApp**.
4. This will open a pre-filled WhatsApp chat with our sales team so we can finalize delivery details with you! 🛍️`;
  }

  // 2. Location / address / base
  if (containsAny('located', 'location', 'address', 'where are you', 'where is', 'office', 'based', 'nigeria', 'lagos', 'lekki', 'headquarters')) {
    return `We are proudly based in **Nigeria**!
Our headquarters is located at **Iledu Bustop Badagry-Express Way, Lagos Nigeria** and our branch office is at **Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State, Nigeria**.
Our luxury physical items (shoes, bags, clothes, cosmetics, etc.) are available for prompt nationwide delivery directly to your doorstep.
For our luxury investments:
- 🚗 **Premium Cars** are available in **Lagos**.
- 🏠 **Real Estate & Lands** are available in premier, high-demand locations both in **Lagos** and across **Nigeria**!
We are open **Monday to Saturday, from 8am to 10pm** (Closed on Sundays).`;
  }

  // 3. Delivery / shipping / duration
  if (containsAny('deliver', 'shipping', 'courier', 'send to', 'dispatch', 'transport')) {
    return `Yes, we offer reliable **nationwide delivery** across Nigeria! 📦 
Once you place your order via **Checkout on WhatsApp**, our representative will confirm your delivery address and provide you with direct delivery rates and timelines. For luxury cars and real estate properties, we arrange physical site inspections and secure handovers.`;
  }

  // 4. Contact / phone / whatsapp / number / call
  if (containsAny('contact', 'phone', 'whatsapp', 'number', 'call you', 'reach you', 'support', 'instagram', 'facebook', 'email')) {
    return `You can reach our team instantly by clicking the **Checkout on WhatsApp** button in your Cart! 
If you have a general inquiry or want to chat with us directly, you can click on the WhatsApp icon on any product page, or contact us at:
- 📱 **Phone/WhatsApp:** +234 806 517 9554
- ✉️ **Email:** support@samstonesresources.com

Our support is fully active during opening hours: **Monday to Saturday, 8am - 10pm**.`;
  }

  // 5. Trending / best / popular / hot
  if (containsAny('trending', 'trend', 'best', 'popular', 'hot', 'recommend', 'favorite', 'new')) {
    return `Here are some of our hottest and most popular items at **SAMSTONES** right now:
- 👟 **Italian Leather Oxfords** (₦85,000) — Handcrafted and ultra-sleek
- 👗 **Onyx Black Senator Suit** (₦150,000) — Impeccably tailored Italian wool
- 🚗 **2023 Mercedes-Benz G-Class** (₦150,000,000) — Luxury SUV, pristine condition
- 🏠 **Luxury Detached Duplex** (₦350,000,000) — 5-Bedroom smart home in Lagos (with premium properties/lands available across Nigeria)
- 🎧 **AirPods Pro (2nd Gen)** (₦180,000) — Personalized spatial audio
- 🧴 **Tom Ford Oud Wood** (₦220,000) — Rare, exotic, and distinctive fragrance

Which of these would you like to know more about? or you can add them directly to your cart! 😊`;
  }

  // 6. Shoes
  if (containsAny('shoes', 'shoe', 'footwear', 'sneakers', 'heels', 'sandals', 'oxford', 'oxfords')) {
    return `We have an elite collection of luxury footwear! 👟
Our trending item is the **Italian Leather Oxfords** (₦85,000) — handcrafted from premium leather for gentlemen.
You can view our complete footwear collection by clicking the **Shoes** category on our homepage!`;
  }

  // 7. Bags
  if (containsAny('bags', 'bag', 'handbag', 'handbags', 'backpack', 'backpacks', 'purse', 'clutch')) {
    return `We offer premium luxury bags and clutches! 👜
Check out our gorgeous **Heritage Beaded Clutch** (₦45,000) which features stunning traditional beadwork.
Click the **Bags** category on our homepage to view the full designer collection!`;
  }

  // 8. Clothes
  if (containsAny('clothes', 'clothing', 'suit', 'suits', 'senator', 'wear', 'streetwear', 'outfit', 'outfits', 'native')) {
    return `We offer impeccably tailored luxury outfits! 👗👔
Our top trending item is the **Onyx Black Senator Suit** (₦150,000) — tailored from premium Italian wool with traditional accents.
Select the **Clothes** category on our homepage to browse all our luxury outfits!`;
  }

  // 9. Jewelries
  if (containsAny('jewelries', 'jewelry', 'jewellery', 'gold', 'necklace', 'necklaces', 'ring', 'rings', 'bracelet', 'earrings', 'bead', 'beads')) {
    return `Add a touch of elegance with our premium jewelry pieces! 💎
Our popular **Coral Choker Statement** (₦60,000) features authentic Nigerian coral beads modernized into a structural neckpiece.
Browse the **Jewelries** category on our homepage to see all our gold and traditional items!`;
  }

  // 10. Cars
  if (containsAny('cars', 'car', 'vehicle', 'vehicles', 'mercedes', 'suv', 'benz', 'g-class', 'g-wagon')) {
    return `Looking for luxury on wheels? 🚗
We feature pristine premium vehicles, including our flagship **2023 Mercedes-Benz G-Class** (₦150,000,000) — foreign used, full options, in Obsidian Black!
Explore the **Cars** category on our homepage to view our luxury vehicle listings.`;
  }

  // 11. Phone Accessories
  if (containsAny('phone', 'accessories', 'airpods', 'charger', 'cases', 'power bank', 'smartwatch', 'smartwatches', 'gadgets')) {
    return `Upgrade your tech collection! 🎧
Our top seller is the **AirPods Pro (2nd Gen)** (₦180,000) featuring Active Noise Cancellation and spatial audio.
Click the **Phone Accessories** category on our homepage to see all our chargers, power banks, and gadgets!`;
  }

  // 12. Drinks
  if (containsAny('drinks', 'drink', 'wine', 'wines', 'champagne', 'beverage', 'beverages', 'dom perignon')) {
    return `Celebrate in high style! 🍾
We have the iconic **Dom Pérignon Vintage 2012** (₦250,000) in stock — perfect for grand celebrations!
Click the **Drinks** category on our homepage to explore our complete premium beverage menu.`;
  }

  // 13. Cosmetics
  if (containsAny('cosmetics', 'cosmetic', 'perfume', 'perfumes', 'fragrance', 'fragrances', 'skincare', 'makeup', 'tom ford')) {
    return `Smell and feel premium every single day! ✨
A classic favorite is **Tom Ford Oud Wood (50ml)** (₦220,000) — a rare, exotic, and highly distinctive fragrance.
View all our luxury fragrances and beauty products under the **Cosmetics** category on our homepage!`;
  }

  // 14. Provisions
  if (containsAny('provisions', 'provision', 'groceries', 'grocery', 'food', 'rice', 'basmati')) {
    return `Stock up on high-quality kitchen essentials! 🌾
We stock **Premium Basmati Rice (5kg)** (₦18,500) — premium long-grain, aromatic rice perfect for that special jollof.
Select the **Provisions** category on our homepage to browse all household groceries.`;
  }

  // 15. Real Estates
  if (containsAny('real estate', 'realestates', 'estate', 'property', 'properties', 'apartment', 'apartments', 'house', 'houses', 'duplex', 'duplexes', 'land', 'lands')) {
    return `Invest in secure, high-yield luxury properties and premium lands! 🏠
We offer pristine lands and luxury homes in prime, high-demand areas across both **Lagos** and multiple fast-growing locations within **Nigeria**! Our signature listings include a smart **Luxury 5-Bedroom Detached Duplex** (₦350,000,000) in Lagos.
Click the **Real Estates** category on our homepage to view all our available premium property and land listings and schedule physical inspections.`;
  }

  // 16. Categories / products / what do you sell / what do you have / stock
  if (containsAny('sell', 'have', 'products', 'category', 'categories', 'items', 'inventory', 'what do you do', 'what is this', 'stock')) {
    return `We offer a curated collection of high-end luxury items and premium investments across these categories:
- 👟 **Shoes & Bags**: Luxury designer footwear & handcrafted beaded clutches
- 👗 **Clothes & Jewelries**: Senator suits & authentic structural coral beaded neckpieces
- 🚗 **Cars**: Premium foreign-used luxury vehicles
- 🏠 **Real Estates**: Exquisite properties and duplexes in Lagos
- 🍾 **Drinks & Provisions**: Fine champagnes and premium groceries
- 🧴 **Cosmetics**: Exquisite designer perfumes and skincare
- 🎧 **Phone Accessories**: Premium tech gadgets and smart accessories

Feel free to click any category on our homepage to see our full inventory! 🛍️`;
  }

  // 17. Hours / times / when are you open / closing / schedule
  if (containsAny('hours', 'time', 'when are you open', 'opening', 'close', 'schedule', 'open days', 'work days', 'saturday', 'monday', 'weekdays')) {
    return `We are open **Monday to Saturday, from 8am to 10pm**! 🕙 
Please note that we are closed on Sundays. You can still browse our site and add items to your cart anytime, and we will process your WhatsApp order first thing Monday morning!`;
  }

  // 18. Registration number / legal / company number
  if (containsAny('registration', 'register', 'number', 'legal', 'company', 'licensed')) {
    return `We are a proudly established and professional organization operating in Nigeria as **Samstones Marketplace**. 
You can shop with absolute trust and peace of mind!`;
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
