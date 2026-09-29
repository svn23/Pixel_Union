# Pixel Union website

Single-page React + Vite site. Yellow, red, ink and paper editorial style. Contact via Instagram and WhatsApp, a Join us form for creators, and static creator-tool illustrations.

## Run locally

    npm install
    npm run dev        # http://127.0.0.1:5180
    npm run build      # output in dist/
    npm run preview

## Deploy on Vercel (free)

1. Push this folder to a Git repo and import it in Vercel. Framework is detected as Vite; build command is vite build, output is dist. vercel.json adds cache and security headers.
2. Add the custom domain in Vercel > Domains.
3. Set the environment variable VITE_SITE_URL to the public origin, for example https://example.com (no trailing slash), then redeploy. This turns on canonical, og:url, absolute share-image URLs, sitemap.xml and the robots Sitemap line.
4. Submit the sitemap in Google Search Console.

## Things that need real values before launch

| What | Where | Notes |
|---|---|---|
| Public domain | VITE_SITE_URL env var | See above |
| WhatsApp number | src/ContactSheet.jsx, WHATSAPP_NUMBER | Country code plus digits, no spaces. Until set, the option shows Coming soon and the footer hides the link |
| Form destination (optional) | src/JoinSheet.jsx, JOIN_ENDPOINT | Both forms open the visitor's mail app addressed to pixelunion55@gmail.com. Set an endpoint (Formspree, Google Apps Script, or a Vercel function) for silent submissions instead |
| Instagram feed | not on the page | Removed by request. Add back only via a server-side Meta API connection, never hardcoded posts |

## Content rules

See AGENTS.md. Short version: no invented clients, testimonials, metrics, prices or contact details. Tagline is "Your social media success, united." Keep the real logo and supplied artwork; source PNGs live in brand-assets/ and are not shipped.

## Structure

- src/App.jsx: page sections, nav, footer, scroll reveal observer; src/main.jsx hydrates the prerendered HTML; src/entry-server.jsx and scripts/prerender.mjs produce it at build time
- src/HeroCollage.jsx: hero characters and labels
- src/ContactPrompt.jsx: yellow contact block with the rotating word
- src/ContactSheet.jsx and src/JoinSheet.jsx: popup cards
- src/Doodles.jsx: background creator-tool icons, positioned inline where used
- index.html: meta, Open Graph, JSON-LD (Organization, FAQPage). FAQ schema must match the on-page FAQ in main.jsx
