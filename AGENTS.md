# Pixel Union website
This is a separate company website; do not replace or change the parent Sovan portfolio.
The supplied Instagram screenshot is the brand reference: Pixel Union, creator partnerships, creator-led campaigns, social content and collaborations. From Odisha, for everywhere.
Official tagline: "Your social media success, united." Use it in the page title, meta description, header logo line, hero note and footer. Use the authentic logo and supplied artwork. Keep the yellow, red, ink and paper editorial direction. Do not invent clients, testimonials, results, metrics, contact details or commercial commitments.
UI lives in src/. Contact links go to the supplied Instagram handle pixel_union_. This initial version is a local preview.

## Instagram
The on-page Instagram feed section was removed on request. Instagram appears only as links (nav, footer, contact sheet). Do not hardcode posts or use the supplied screenshot as website content. The hero must use durable company branding, not a social post.

## Newspaper and character direction
Use torn newspaper pages and friendly stylized 3D cartoon characters representing a cameraman, influencer, shop owner, and related creative/business roles. Integrate them into the existing yellow, red, ink and paper brand style. Preserve the authentic logo. Characters are fictional brand illustrations, not actual team portraits.

Keep the torn newspaper treatment in ONE place: the hero character collage. Never repeat/tile newspaper strips or scatter duplicate paper assets elsewhere. Give the yellow creative-services ribbon a slight editorial tilt, with clean section spacing and no horizontal page overflow.

## Contact text animation
Keep Have a fixed, with query?, feedback?, and question? moving upward in an infinite loop. Hold each word for two seconds before the transition. Follow with a Let's talk CTA. Honour reduced motion. No pause control (removed on request).

## Audience and motion
Primary visitors are shop owners, reel creators, and brands; speak to them directly (hero audience reel, "Who this is for" cards) without inventing results, clients, or metrics. Layered motion is intended: staggered scroll reveals, sticky blurred header, hero line reveal, cursor parallax on collage labels, drawn card/step borders, ribbon marquee with edge fade/blur, slow contact asterisk, and hover micro-gestures. Keep everything static for reduced-motion preferences.

## Contact sheet and WhatsApp
Every "Let's talk" control opens the ContactSheet dialog (src/ContactSheet.jsx) offering Instagram, email (pixelunion55@gmail.com) and WhatsApp, plus a business-brief form for shop owners and brands. Forms without an endpoint open the visitor's mail app addressed to that inbox. The WhatsApp number lives in WHATSAPP_NUMBER there; while it is empty the option shows "Coming soon" and the footer hides the WhatsApp link. Never invent a number.

## Join us form
"Join us" (nav and footer) opens JoinSheet (src/JoinSheet.jsx): name, Instagram/phone, role wanted, city, portfolio link, message. On submit it shows a success greeting and closes itself. Entries POST to JOIN_ENDPOINT when set; otherwise they open the visitor's mail app addressed to pixelunion55@gmail.com. Dialog backdrops use an acrylic blur; keep backdrop-filter off anything that moves continuously (ribbon) for performance.

## Background props
Scattered creator-tool icons (tripod, camera, phone, film reel, mic, clapper, and similar) live in src/Doodles.jsx, placed per section from main.jsx and ContactPrompt.jsx. Default ones are faint ink outlines behind content; `over` ones are small duotone red/yellow/ink props that peek over card corners. They are static and decorative, hidden on mobile where marked, and never carry meaning. Keep main overflow-x clipped.

## SEO
Source PNGs (hero collage, torn newspaper, Instagram reference) live in brand-assets/ and are not shipped; public/ holds the WebP hero, WebP logo, a 1200x630 share image and robots.txt. index.html carries title, description, Open Graph/Twitter tags, and JSON-LD for Organization and FAQPage; keep the FAQPage entries identical to the on-page FAQ. No public domain is known yet, so there is no canonical, sitemap, or absolute image URL: add them when the domain is supplied. Do not add LocalBusiness data, reviews, case studies or pricing until real details exist.

## Deployment
Target is Vercel free tier (vercel.json holds headers). The public origin comes from VITE_SITE_URL; vite.config.js injects canonical, og:url, absolute share URLs, sitemap.xml and the robots Sitemap line only when it is set. README.md is the handoff for the team and dev. Keep launch blockers (domain, WhatsApp number, Join endpoint) in the README table.

## Prerendering
npm run build renders App to static HTML (src/entry-server.jsx + scripts/prerender.mjs) and main.jsx hydrates it. Entrance-animation "start hidden" styles must be scoped under html.js, which App adds in its effect, so prerendered HTML is fully visible before JavaScript runs. Keep App free of browser globals outside effects and handlers.

Fonts are self-hosted in public/fonts (Barlow Condensed 700/800/900, DM Sans 400-700) with @font-face at the top of style.css and preloads in index.html; do not reintroduce the Google Fonts stylesheet. The hero image ships 640/900/1122 WebP variants via srcset.
