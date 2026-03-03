# 🪻 Altijd Samen — Wedding Website Builder

Een modern SaaS-platform waarmee koppels hun eigen trouwwebsite kunnen genereren, stylen en beheren.

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS 4 + shadcn/ui + Framer Motion
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth.js (Google + Email magic link)
- **State**: Zustand
- **Hosting**: Vercel-ready

## Getting Started

```bash
# Clone en installeer
git clone https://github.com/[user]/altijd-samen.git
cd altijd-samen
npm install

# Kopieer environment variables
cp .env.example .env.local
# Vul de variabelen in

# Database setup
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- 🎨 **6 prachtige templates** — van romantisch tot minimalistisch
- ✏️ **Visuele editor** — drag-and-drop, live preview, kleuren & fonts
- 💌 **RSVP systeem** — ingebouwd met dashboard en CSV export
- 📱 **Mobile-first** — perfect op elk apparaat
- 🔒 **GDPR-compliant** — data in de EU, privacy-friendly analytics
- 💰 **3 pricing tiers** — Gratis, Premium (€49,99), Deluxe (€89,99)

## Templates

1. **Eternal Bloom** — Romantisch, bloemrijk, zacht
2. **Modern Minimalist** — Strak, typografie-gedreven
3. **Mediterranean Sun** — Warm, Italiaans geïnspireerd
4. **Nordic Grace** — Scandinavisch, clean
5. **Art Deco Glamour** — 1920s, goud & geometrie
6. **Garden Party** — Speels, botanisch

## Project Structuur

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page
│   ├── pricing/          # Pricing page
│   ├── login/            # Auth pages
│   ├── register/
│   ├── dashboard/        # Dashboard, editor, RSVP, settings
│   └── [slug]/           # Publieke trouwwebsites
├── components/
│   ├── editor/           # Editor components
│   ├── templates/        # 6 wedding templates
│   ├── marketing/        # Header, footer
│   └── ui/               # shadcn/ui components
└── lib/
    ├── templates.ts      # Template configs & data
    ├── store.ts          # Zustand editor state
    ├── prisma.ts         # Database client
    └── auth.ts           # NextAuth config
```

## Deployment

Push naar GitHub en verbind met Vercel. Zie `.env.example` voor alle benodigde variabelen.

## License

Proprietary — © Altijd Samen
