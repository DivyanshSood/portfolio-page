const projects = [
  {
    name: 'modernkbs.com',
    hook: 'A 40-year-old school was bleeding admissions to a broken homepage.',
    story: 'The legacy WordPress install had a 6-second TTFB, no responsive layout, and a contact form routing to a dead inbox. We rebuilt it as a server-rendered Next.js application: Supabase-backed CMS, role-based admin panel with granular permissions, a structured admissions flow with automated email triggers, and a live toppers board synced directly from the database. Lighthouse score moved from 34 to 96. Enquiry volume doubled within 30 days of launch.',
    url: 'https://modernkbs.com',
    c: 'var(--neon-green)',
    grad: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(34,211,238,0.06))',
  },
  {
    name: 'In Himalayas',
    hook: 'Every OTA was inflating prices, burying local operators, and lying to travelers.',
    story: 'Commission walls were pricing out authentic Himachal experiences while pushing algorithmically-boosted listings to the top. We engineered a zero-commission platform with direct operator contact, locally-verified listings, and editorial storytelling per destination. The stack: Next.js with ISR for fast, SEO-indexed pages; Supabase with row-level security for operator data; filterable search with URL-persistent state. Traffic from organic search hit 400+ sessions in the first month — no ads.',
    url: 'https://inhimalayas.vercel.app',
    c: 'var(--neon-pink)',
    grad: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(251,146,60,0.06))',
  },
  {
    name: 'Knitting Knife',
    hook: 'Decades of handcraft. Zero digital presence. The internet had never seen her work.',
    story: 'A Himachal artisan producing organic, hand-knitted baby garments — with no storefront, no brand language, and no way to reach international buyers. We built a full-stack e-commerce platform from scratch: product catalogue with story-first pages, Stripe-integrated global checkout, inventory management via admin dashboard, and a brand voice system that treats every SKU as a crafted object, not a listing. The first international order arrived before the launch celebration ended.',
    url: '#',
    c: 'var(--neon-orange)',
    grad: 'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,113,133,0.06))',
  },
  {
    name: 'Red Line Studios',
    hook: 'Premium streetwear with a site that made it look like a dropshipper.',
    story: 'The product line was legitimate — limited drops, 300 GSM cotton, moto-coded aesthetic baked into every release. The old Shopify theme flattened all of it into a generic grid. We rebuilt the commerce layer from scratch: dynamic per-drop inventory with countdown gates, a racing-coded navigation system, cinematic lookbook reveals using GSAP ScrollTrigger, and motion-design that mirrors the weight of the garments. Average session duration increased by 2.4× in the first week.',
    url: 'https://red-line-studios.vercel.app',
    c: 'var(--neon-blue)',
    grad: 'linear-gradient(135deg, rgba(56,189,248,0.12), rgba(167,139,250,0.06))',
  },
  {
    name: 'AI Website Generator',
    hook: 'A single prompt. A deployable website on the other side.',
    story: 'Built to test a concrete question: how close can a language model get to producing structured, production-quality UI without a human in the loop? The generator accepts a natural-language brief, runs it through a custom multi-step prompt chain, and returns a full React component tree — layout, copy, type hierarchy, and colour palette all derived from the input. No template selection. No drag-and-drop. The output renders live in-browser with real-time streaming and exports clean, readable JSX. An experiment in structured generation and making LLMs output something you would actually ship.',
    url: 'https://ai-website-generator-tan.vercel.app',
    c: 'var(--neon-purple)',
    grad: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(34,211,238,0.06))',
  },
];

export default projects;
