# Samstones Marketplace

Samstones International Resources Limited's marketplace site — a converged storefront for premium footwear, native fashion, designer bags, jewelry, cosmetics, drinks, provisions, cars, and real estate, with WhatsApp-based ordering and a custom admin panel for managing products, categories, and media.

Built with React 19, Vite, Tailwind CSS v4, and Supabase (data/storage) with Firebase (visitor tracking/messaging).

## Run locally

**Prerequisites:** Node.js >= 20 (see `.nvmrc`)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own values:
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — Supabase project credentials
   - `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` — admin panel login (accessible at `/#admin`)
   - `VITE_EMAILJS_SERVICE_ID` / `VITE_EMAILJS_TEMPLATE_ID` / `VITE_EMAILJS_PUBLIC_KEY` — EmailJS config for visitor sign-in alerts
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run TypeScript's type checker

## Deployment

The site deploys to Vercel (see `vercel.json`) as a static Vite build with SPA rewrites.
