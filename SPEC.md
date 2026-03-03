# 🪻 MASTER PROMPT — Trouwwebsite Generator & Editor Platform

## Project: "Altijd Samen" — Wedding Website Builder

> **Doel**: Bouw een compleet, productie-klaar SaaS-platform waarmee koppels hun eigen trouwwebsite kunnen genereren, stylen en beheren. Het platform moet modern, elegant en intuïtief zijn — zoals koppels het verwachten voor de mooiste dag van hun leven.

---

## 📋 INSTRUCTIES VOOR CLAUDE CODE

Je gaat vannacht een volledig werkend platform bouwen. Werk methodisch, commit regelmatig, en zorg dat elk onderdeel werkt voordat je doorgaat naar het volgende. Gebruik de onderstaande specificaties als je complete blauwdruk.

### Tech Stack

```
Frontend:        Next.js 14+ (App Router) + TypeScript + Tailwind CSS 4
UI Components:   shadcn/ui + Radix UI + Framer Motion
State:           Zustand voor editor state
Backend:         Next.js API Routes + Prisma ORM
Database:        PostgreSQL (via Supabase of lokale Docker)
Auth:            NextAuth.js (Google + Email magic link)
File Upload:     UploadThing of Cloudinary (afbeeldingen)
Formulieren:     Ingebouwd RSVP-systeem + Google Forms embed optie
Payments:        Stripe Checkout + Stripe Billing (subscriptions)
Domein:          Custom domain support via Vercel / CNAME instructies
Styling:         CSS Variables voor thema's, Google Fonts dynamisch laden
Hosting:         Vercel-ready (vercel.json meeleveren)
```

---

## 🏗️ ARCHITECTUUR

### Mappenstructuur

```
/
├── app/
│   ├── (marketing)/           # Landing page, prijzen, over ons
│   │   ├── page.tsx           # Homepage / landing
│   │   ├── pricing/page.tsx   # Prijzenpagina
│   │   └── examples/page.tsx  # Voorbeeld trouwwebsites
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx        # Overzicht
│   │   ├── editor/[siteId]/page.tsx  # De visuele editor
│   │   ├── rsvp/[siteId]/page.tsx    # RSVP beheer
│   │   ├── settings/page.tsx         # Account & domein
│   │   └── billing/page.tsx          # Abonnement beheer
│   ├── (wedding-sites)/
│   │   └── [slug]/page.tsx           # Publieke trouwwebsite renderer
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── sites/
│       ├── rsvp/
│       ├── upload/
│       ├── stripe/
│       │   ├── checkout/
│       │   ├── webhook/
│       │   └── portal/
│       └── domains/
├── components/
│   ├── editor/                # Editor componenten
│   ├── templates/             # Trouwwebsite templates
│   ├── ui/                    # shadcn/ui components
│   ├── marketing/             # Landing page componenten
│   └── shared/                # Gedeelde componenten
├── lib/
│   ├── prisma.ts
│   ├── stripe.ts
│   ├── auth.ts
│   ├── templates.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── fonts/
│   └── templates/             # Template preview images
└── styles/
    └── globals.css
```

---

## 🎨 DESIGN SYSTEEM — KRITISCH BELANGRIJK

### Design Filosofie

Het platform moet aanvoelen als een **luxe bruiloftsmagazine** — denk aan Vogue Weddings meets moderne tech. Elk pixel telt.

### Kleurenpalet (Platform zelf)

```css
:root {
  /* Basis — warm, elegant, niet klinisch */
  --bg-primary: #FEFCF9;          /* Warm ivoor */
  --bg-secondary: #F7F3EE;        /* Zacht linnen */
  --bg-accent: #EDE8E1;           /* Warm zand */
  
  /* Tekst */
  --text-primary: #2C2825;        /* Bijna zwart, warm */
  --text-secondary: #6B6560;      /* Warm grijs */
  --text-muted: #9C9590;          /* Gedempte toon */
  
  /* Accent — subtiel luxe */
  --accent-gold: #C4A87C;         /* Goud */
  --accent-rose: #C4918A;         /* Dusty rose */
  --accent-sage: #8FA68A;         /* Sage groen */
  --accent-navy: #2D3A4A;         /* Diep navy */
  
  /* Interactive */
  --button-primary: #2C2825;
  --button-hover: #1A1816;
  --focus-ring: #C4A87C;
}
```

### Typografie

```css
/* Display / Headings — kies TWEE van deze opties */
font-family: 'Playfair Display', serif;      /* Optie A: Klassiek elegant */
font-family: 'Cormorant Garamond', serif;    /* Optie B: Verfijnd */
font-family: 'Libre Caslon Display', serif;  /* Optie C: Editoraal */

/* Body tekst */
font-family: 'DM Sans', sans-serif;          /* Modern, leesbaar */

/* Accent / Script (voor namen etc.) */
font-family: 'Pinyon Script', cursive;       /* Handgeschreven feel */
```

**Gebruik**: Combineer `Cormorant Garamond` voor headings met `DM Sans` voor body op het platform zelf. Templates mogen andere combinaties gebruiken.

### Animaties & Micro-interacties

```
- Page transitions: Zachte fade + slide (200-300ms)
- Hover states: Subtiele scale(1.02) + shadow lift
- Scroll reveals: Stagger met IntersectionObserver
- Editor: Drag-and-drop met smooth spring animations
- Loading states: Skeleton screens met shimmer
- Toast notifications: Slide in van rechts
- Modal transitions: Scale from center met backdrop blur
```

### Visuele Effecten

```
- Achtergronden: Subtiele grain/noise texture overlay
- Cards: Zachte shadows, nooit harde borders
- Foto's: Altijd met subtle rounded corners (8-12px)
- Dividers: Decoratieve lijnen of botanische SVG elementen
- Icons: Lucide icons, consistent 1.5px stroke
```

---

## 📄 TROUWWEBSITE TEMPLATES (Minimaal 6)

Elk template heeft een uniek karakter. Bouw ze als React componenten die data-driven zijn.

### Template 1: "Eternal Bloom"
```
Stijl: Romantisch, bloemrijk, zacht
Kleuren: Dusty rose, crème, sage groen
Fonts: Playfair Display + Lato
Layout: Volledig scrollbare one-pager
Kenmerken: Bloemen SVG borders, parallax foto secties
Secties: Hero (namen+datum), Ons Verhaal, Locatie, Dagprogramma, RSVP, Cadeautips
```

### Template 2: "Modern Minimalist"
```
Stijl: Strak, veel witruimte, typografie-gedreven
Kleuren: Zwart, wit, één accentkleur (kiesbaar)
Fonts: Neue Haas Grotesk / Helvetica Neue + Space Mono
Layout: Grid-based, asymmetrisch
Kenmerken: Bold typography, foto in full-bleed, animaties op scroll
Secties: Compact hero, Timeline, Praktische Info, RSVP, Footer
```

### Template 3: "Mediterranean Sun"
```
Stijl: Warm, aards, Italiaans/Grieks geïnspireerd
Kleuren: Terracotta, olijf, warm wit, goud
Fonts: Cormorant Garamond + DM Sans
Layout: Brede secties met overlap-elementen
Kenmerken: Aquarel texturen, boog-vormen (arch shapes), warme foto filters
Secties: Hero met boog, Love Story kaarten, Locatie met kaart, Menu/Dagindeling, RSVP
```

### Template 4: "Nordic Grace"
```
Stijl: Scandinavisch, clean, natuur
Kleuren: Zacht wit, lichtgrijs, eucalyptus, hout-tinten
Fonts: Libre Caslon Display + Inter
Layout: Verticaal ritmisch, veel ademruimte
Kenmerken: Line art illustraties, subtiele animaties, natuur-elementen
Secties: Minimale hero, Wij twee (duo foto), Details cards, RSVP formulier
```

### Template 5: "Art Deco Glamour"
```
Stijl: 1920s geïnspireerd, glamoureus, goud
Kleuren: Diep navy/zwart, goud, champagne
Fonts: Poiret One + Raleway
Layout: Symmetrisch, geometrische patronen
Kenmerken: Gold foil effecten, geometrische borders, art deco patronen in SVG
Secties: Grand entrance hero, Ons Verhaal timeline, The Celebration, RSVP, Registry
```

### Template 6: "Garden Party"
```
Stijl: Speels, kleurrijk, botanisch
Kleuren: Groen, paars, koraal, crème
Fonts: Fraunces + Source Sans 3
Layout: Organisch, vloeiende vormen
Kenmerken: Botanische illustraties, waterverf achtergronden, confetti animatie
Secties: Playful hero, Hoe wij elkaar ontmoetten, De Dag, Praktisch, RSVP, Feest!
```

---

## ✏️ VISUELE EDITOR — Kernfunctionaliteit

### Editor Interface

Bouw een drag-and-drop editor met live preview. Dit is het hart van het product.

```
┌─────────────────────────────────────────────────────┐
│  ← Terug    Trouwwebsite van Anna & Pieter   💾 ⚡  │
├──────────┬──────────────────────────┬───────────────┤
│          │                          │               │
│ SECTIES  │    LIVE PREVIEW          │  PROPERTIES   │
│          │                          │               │
│ □ Hero   │  ┌──────────────────┐   │  Sectie: Hero │
│ □ Verhaal│  │                  │   │               │
│ □ Locatie│  │  Anna & Pieter   │   │  Titel: _____ │
│ □ RSVP   │  │  12 juni 2026    │   │  Datum: _____ │
│ □ Info   │  │                  │   │  Foto:  📷    │
│          │  │  [Hero Image]    │   │               │
│ + Sectie │  │                  │   │  Kleuren:     │
│          │  └──────────────────┘   │  🎨 Primary   │
│ ↕ Sleep  │                          │  🎨 Secondary │
│  om te   │  ┌──────────────────┐   │  🎨 Accent    │
│  sorteren│  │  Ons Verhaal...  │   │               │
│          │  └──────────────────┘   │  Font: [▾]    │
│          │                          │               │
├──────────┴──────────────────────────┴───────────────┤
│  📱 Mobile  |  💻 Desktop  |  📋 Tablet    🌐 Publiceer│
└─────────────────────────────────────────────────────┘
```

### Editor Features

```typescript
// Core editor capabilities
interface EditorCapabilities {
  // Template & Thema
  templateSelection: true;           // Kies uit 6+ templates
  colorPicker: {
    type: 'advanced';                // HSL picker + presets + hex input
    presets: ColorPreset[];          // Curated kleurenschema's per template
    customColors: true;              // Volledig vrije keuze
    livePreview: true;               // Kleuren direct zichtbaar
  };
  fontPicker: {
    curated: GoogleFont[];           // 20+ zorgvuldig gekozen font-paren
    categories: ['serif', 'sans-serif', 'script', 'display'];
    preview: true;                   // Font preview in dropdown
  };
  
  // Content Editing
  inlineTextEditing: true;           // Klik op tekst → direct bewerken
  richTextEditor: true;              // Bold, italic, links
  photoUpload: {
    dragAndDrop: true;
    crop: true;                      // Ingebouwde crop tool
    filters: ['none', 'warm', 'cool', 'bw', 'vintage']; // Foto filters
    maxSize: '10MB';
    formats: ['jpg', 'png', 'webp'];
  };
  
  // Secties
  sectionManagement: {
    add: true;                       // Nieuwe secties toevoegen
    remove: true;                    // Secties verwijderen
    reorder: true;                   // Drag-and-drop volgorde
    duplicate: true;                 // Sectie dupliceren
    visibility: true;                // Sectie tonen/verbergen
  };
  
  // Layout
  responsivePreview: ['mobile', 'tablet', 'desktop'];
  
  // Publicatie
  publishFlow: {
    subdomain: true;                 // gratis: anna-en-pieter.altijdsamen.nl
    customDomain: true;              // premium: onzebruiloft.nl
    sslCertificate: true;            // Automatisch HTTPS
    passwordProtection: true;        // Optioneel wachtwoord
  };
}
```

### Color Picker Component

Bouw een geavanceerde color picker:

```
┌─────────────────────────────┐
│  🎨 Kleurenschema           │
│                              │
│  Voorgestelde schema's:      │
│  ○ Romantic Blush            │
│  ○ Sage & Gold               │
│  ○ Midnight Elegance         │
│  ○ Coastal Breeze            │
│  ○ Lavender Dreams           │
│  ● Eigen kleuren             │
│                              │
│  Primair:    [■ #C4918A] 🎯  │
│  Secundair:  [■ #F7F3EE] 🎯  │
│  Accent:     [■ #C4A87C] 🎯  │
│  Tekst:      [■ #2C2825] 🎯  │
│  Achtergrond:[■ #FEFCF9] 🎯  │
│                              │
│  ┌─────────────────────┐     │
│  │  Kleur picker       │     │
│  │  [gradient square]  │     │
│  │  [hue slider]       │     │
│  │  HEX: #_____ RGB    │     │
│  └─────────────────────┘     │
│                              │
│  Preview:  ✓ Ziet er goed uit│
│  Contrast: ✓ AAA accessible  │
└─────────────────────────────┘
```

---

## 📬 RSVP SYSTEEM

### Optie 1: Ingebouwd RSVP (standaard)

```typescript
// Prisma model
model RSVPResponse {
  id          String   @id @default(cuid())
  siteId      String
  site        WeddingSite @relation(fields: [siteId], references: [id])
  
  name        String
  email       String?
  phone       String?
  attending   AttendingStatus  // YES, NO, MAYBE
  plusOne      Boolean  @default(false)
  plusOneName  String?
  dietaryNeeds String?
  message      String?  // Persoonlijk berichtje
  
  guestCount   Int      @default(1)
  ceremony     Boolean  @default(true)
  reception    Boolean  @default(true)
  party        Boolean  @default(true)
  
  submittedAt  DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum AttendingStatus {
  YES
  NO
  MAYBE
}
```

**RSVP Dashboard features:**
- Totaal overzicht: Ja / Nee / Misschien / Geen reactie
- Exporteer naar CSV/Excel
- Filter op dieetwensen
- Stuur herinneringsmail naar niet-reageerders
- Grafische weergave (pie chart, bar chart)
- Deadline instellen

### Optie 2: Google Forms Integratie

```typescript
// In editor: plak Google Forms URL
interface GoogleFormsConfig {
  enabled: boolean;
  formUrl: string;           // Google Forms embed URL
  displayMode: 'embed' | 'popup' | 'link';
  buttonText: string;        // "RSVP via Formulier"
  fallbackText: string;      // Als embed niet werkt
}
```

### Optie 3: Europees Alternatief — Tally.so

```typescript
// Tally.so is een Europees (Belgisch) form-platform, GDPR-compliant
interface TallyConfig {
  enabled: boolean;
  formId: string;            // Tally form ID
  displayMode: 'embed' | 'popup';
  hideTitle: boolean;
  transparentBackground: boolean;
}

// Embed code generator
const tallyEmbed = (formId: string) => `
  <iframe
    data-tally-src="https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1"
    loading="lazy"
    width="100%"
    height="500"
    frameborder="0"
  ></iframe>
`;
```

---

## 💰 BETAALMODEL — Stripe Integration

### Pricing Tiers

```typescript
const PRICING_TIERS = {
  gratis: {
    name: 'Gratis',
    price: 0,
    stripePriceId: null,
    features: [
      'Kies uit alle templates',
      'Basis kleur aanpassing',
      'Subdomein (naam.altijdsamen.nl)',
      'RSVP tot 50 gasten',
      'Watermerk "Gemaakt met Altijd Samen"',
      '1 foto per sectie',
      'Standaard fonts',
    ],
    limitations: {
      maxGuests: 50,
      maxPhotos: 6,
      customDomain: false,
      passwordProtection: false,
      watermark: true,
      analytics: false,
      customFonts: false,
      photoFilters: false,
      googleForms: false,
    }
  },
  
  premium: {
    name: 'Premium',
    price: {
      monthly: 9.99,         // EUR per maand
      oneTime: 49.99,        // EUR eenmalig (geldig 18 maanden)
    },
    stripePriceIds: {
      monthly: 'price_premium_monthly_xxx',
      oneTime: 'price_premium_onetime_xxx',
    },
    features: [
      'Alles van Gratis',
      'Onbeperkt foto\'s uploaden',
      'Alle kleur- en fontopties',
      'Foto filters & crop tool',
      'Geen watermerk',
      'RSVP onbeperkt gasten',
      'RSVP dashboard & export',
      'Wachtwoord beveiliging',
      'Google Forms / Tally.so integratie',
      'Basis statistieken (bezoekers)',
    ],
    limitations: {
      maxGuests: Infinity,
      maxPhotos: Infinity,
      customDomain: false,
      passwordProtection: true,
      watermark: false,
      analytics: 'basic',
      customFonts: true,
      photoFilters: true,
      googleForms: true,
    }
  },
  
  deluxe: {
    name: 'Deluxe',
    price: {
      monthly: 19.99,        // EUR per maand
      oneTime: 89.99,        // EUR eenmalig (geldig 18 maanden)
    },
    stripePriceIds: {
      monthly: 'price_deluxe_monthly_xxx',
      oneTime: 'price_deluxe_onetime_xxx',
    },
    features: [
      'Alles van Premium',
      'Eigen domein koppelen (onzebruiloft.nl)',
      'SSL certificaat automatisch',
      'Geavanceerde statistieken',
      'Gast management systeem',
      'Herinneringsmails versturen',
      'Prioriteit support',
      'Downloaden als PDF (save-the-date)',
      'Muziek achtergrond optie',
      'Fotoalbum / galerij sectie',
      'Countdown timer widget',
      'Google Maps integratie voor locatie',
    ],
    limitations: {
      maxGuests: Infinity,
      maxPhotos: Infinity,
      customDomain: true,
      passwordProtection: true,
      watermark: false,
      analytics: 'advanced',
      customFonts: true,
      photoFilters: true,
      googleForms: true,
      guestManagement: true,
      emailReminders: true,
    }
  }
};
```

### Stripe Implementatie

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Checkout session creator
export async function createCheckoutSession({
  userId,
  priceId,
  mode, // 'subscription' | 'payment'
}: CheckoutParams) {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${BASE_URL}/dashboard?upgrade=success`,
    cancel_url: `${BASE_URL}/pricing?upgrade=cancelled`,
    metadata: { userId },
    allow_promotion_codes: true,     // Kortingscodes!
    billing_address_collection: 'auto',
    tax_id_collection: { enabled: true }, // EU BTW
    automatic_tax: { enabled: true },     // Automatische BTW
  });
  return session;
}

// Webhook handler voor betalingsgebeurtenissen
// POST /api/stripe/webhook
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      // Upgrade user tier
      break;
    case 'customer.subscription.deleted':
      // Downgrade user
      break;
    case 'invoice.payment_failed':
      // Stuur waarschuwing
      break;
  }
}
```

---

## 🗄️ DATABASE SCHEMA

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  tier          Tier      @default(FREE)
  stripeCustomerId  String?   @unique
  stripeSubscriptionId String?
  
  sites         WeddingSite[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Tier {
  FREE
  PREMIUM
  DELUXE
}

model WeddingSite {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  // Basis info
  slug          String    @unique          // anna-en-pieter
  customDomain  String?   @unique          // onzebruiloft.nl
  title         String                     // "Anna & Pieter"
  partner1Name  String
  partner2Name  String
  weddingDate   DateTime?
  weddingVenue  String?
  weddingCity   String?
  
  // Design
  templateId    String                     // eternal-bloom, modern-minimalist, etc.
  colorScheme   Json                       // { primary, secondary, accent, text, bg }
  fontPair      Json                       // { heading, body, accent }
  customCSS     String?                    // Deluxe: eigen CSS
  
  // Content secties (JSON — flexibel)
  sections      Json                       // Array van sectie-objecten
  
  // Settings
  published     Boolean   @default(false)
  password      String?                    // Optionele beveiliging
  locale        String    @default("nl")   // nl, en, de, fr
  
  // SEO
  metaTitle     String?
  metaDescription String?
  ogImage       String?
  
  // Relations
  photos        Photo[]
  rsvpResponses RSVPResponse[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  publishedAt   DateTime?
}

model Photo {
  id          String   @id @default(cuid())
  siteId      String
  site        WeddingSite @relation(fields: [siteId], references: [id])
  
  url         String
  thumbnailUrl String?
  alt         String?
  width       Int?
  height      Int?
  sectionKey  String?          // In welke sectie wordt deze foto gebruikt
  sortOrder   Int     @default(0)
  
  createdAt   DateTime @default(now())
}

model RSVPResponse {
  id            String          @id @default(cuid())
  siteId        String
  site          WeddingSite     @relation(fields: [siteId], references: [id])
  
  name          String
  email         String?
  phone         String?
  attending     AttendingStatus
  plusOne        Boolean         @default(false)
  plusOneName    String?
  guestCount    Int             @default(1)
  dietaryNeeds  String?
  message       String?
  
  ceremony      Boolean         @default(true)
  reception     Boolean         @default(true)
  party         Boolean         @default(true)
  
  submittedAt   DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

enum AttendingStatus {
  YES
  NO
  MAYBE
}

model SiteAnalytics {
  id          String   @id @default(cuid())
  siteId      String
  date        DateTime @db.Date
  pageViews   Int      @default(0)
  uniqueVisitors Int   @default(0)
  rsvpClicks  Int      @default(0)
  
  @@unique([siteId, date])
}
```

---

## 🖥️ LANDING PAGE — Marketing Website

### Hero Sectie

Bouw een adembenemende landing page die koppels direct overtuigt.

```
Headline:     "Jullie liefde verdient een prachtige website"
Subheadline:  "Ontwerp in minuten jullie droomtrouwwebsite. 
               Kies een template, pas alles aan, en deel met jullie gasten."
CTA primair:  "Begin gratis →"
CTA secundair: "Bekijk voorbeelden"

Visueel: Geanimeerde preview van een trouwwebsite die morpht tussen
         verschillende templates. Zacht parallax effect op de achtergrond.
```

### Pagina Secties (Landing)

1. **Hero** — Grote headline + geanimeerde template preview
2. **Templates Showcase** — Horizontaal scrollbare template previews met hover effect
3. **Editor Demo** — Interactieve mini-demo of video van de editor
4. **Features Grid** — Iconen + korte tekst, 3 kolommen
5. **Pricing** — De 3 tiers, aantrekkelijk vormgegeven
6. **Testimonials** — (placeholder quotes, later echte reviews)
7. **FAQ** — Accordion met veelgestelde vragen
8. **Final CTA** — "Begin vandaag nog" + achtergrond afbeelding

### Pricing Page Design

```
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│   GRATIS     │  │  ⭐ PREMIUM       │  │   DELUXE     │
│              │  │   Meest gekozen   │  │              │
│   €0         │  │                   │  │              │
│   voor altijd│  │  €49,99 eenmalig  │  │  €89,99      │
│              │  │  of €9,99/maand   │  │  eenmalig    │
│              │  │                   │  │  of €19,99/m  │
│  ✓ Templates │  │  ✓ Alles gratis + │  │  ✓ Premium + │
│  ✓ Basis     │  │  ✓ Onbeperkt foto │  │  ✓ Eigen     │
│    kleuren   │  │  ✓ Alle fonts     │  │    domein    │
│  ✓ 50 gasten │  │  ✓ Geen watermerk │  │  ✓ Analytics │
│  ✓ Subdomein │  │  ✓ ∞ gasten      │  │  ✓ Gastenbe- │
│              │  │  ✓ RSVP export    │  │    heer      │
│  [Gratis     │  │  ✓ Wachtwoord    │  │  ✓ Herinne-  │
│   starten]   │  │                   │  │    ringsmails│
│              │  │  [Kies Premium →] │  │              │
│              │  │                   │  │  [Kies       │
│              │  │                   │  │   Deluxe →]  │
└──────────────┘  └──────────────────┘  └──────────────┘
```

---

## 🔐 CUSTOM DOMAIN SETUP

### Flow voor gebruikers

```
1. Gebruiker koopt Deluxe plan
2. Gaat naar Settings → Domein
3. Voert gewenst domein in: "onzebruiloft.nl"
4. Systeem toont CNAME instructies:
   
   ┌─────────────────────────────────────────────┐
   │  Koppel je domein in 2 stappen:             │
   │                                              │
   │  1. Ga naar je domein provider               │
   │     (TransIP, Antagonist, Versio, etc.)      │
   │                                              │
   │  2. Voeg dit DNS record toe:                 │
   │     Type:  CNAME                             │
   │     Naam:  www                               │
   │     Doel:  cname.altijdsamen.nl              │
   │                                              │
   │     Type:  A                                 │
   │     Naam:  @                                 │
   │     Doel:  76.76.21.21 (Vercel IP)          │
   │                                              │
   │  3. Klik op "Verifieer domein"              │
   │                                              │
   │  ⏳ DNS kan tot 48 uur duren                 │
   └─────────────────────────────────────────────┘

5. Systeem verifieert DNS periodiek
6. Bij succes: SSL certificaat wordt aangemaakt
7. Domein is live!
```

---

## 📱 RESPONSIVENESS

Alles moet pixel-perfect werken op:
- **Mobile** (375px+) — Editor wordt simplified single-panel
- **Tablet** (768px+) — Editor met collapsible sidebars
- **Desktop** (1024px+) — Volledige 3-panel editor
- **Wide** (1440px+) — Extra ruimte voor preview

De trouwwebsites zelf moeten **mobile-first** zijn — de meeste gasten openen op telefoon!

---

## 🌍 INTERNATIONALISATIE

```typescript
// Ondersteunde talen (minimaal)
const LOCALES = {
  nl: 'Nederlands',    // Standaard
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
};

// Gebruik next-intl of een simpele i18n setup
// Alle UI teksten moeten via een translation key gaan
```

---

## 🔒 PRIVACY & GDPR

```typescript
// Belangrijk voor Europese markt!
const GDPRRequirements = {
  cookieBanner: true,                    // Cookie consent banner
  privacyPolicy: true,                   // Genereer privacy policy pagina
  dataExport: true,                      // Gebruikers kunnen data exporteren
  dataDelete: true,                      // Recht op verwijdering
  rsvpConsent: true,                     // Toestemming bij RSVP invullen
  dataProcessingAgreement: true,         // In Terms of Service
  hosting: 'EU',                         // Data in EU houden
  analytics: 'privacy-friendly',         // Plausible/Fathom ipv Google Analytics
  noThirdPartyTracking: true,
};
```

---

## 🧪 BOUW-VOLGORDE (VOOR CLAUDE CODE)

Volg deze exacte volgorde om het project op te bouwen:

### Fase 1: Fundament (Start hiermee)
```
1. ☐ Next.js project initialiseren met TypeScript
2. ☐ Tailwind CSS 4 + globals.css met design tokens
3. ☐ shadcn/ui installeren en configureren
4. ☐ Prisma setup + database schema
5. ☐ NextAuth.js configureren (Google + Email)
6. ☐ Basis layout componenten (header, footer, sidebar)
7. ☐ Responsieve navigation
```

### Fase 2: Templates
```
8.  ☐ Template data structuur definiëren
9.  ☐ Template 1: "Eternal Bloom" bouwen
10. ☐ Template 2: "Modern Minimalist" bouwen
11. ☐ Template 3: "Mediterranean Sun" bouwen
12. ☐ Template 4: "Nordic Grace" bouwen
13. ☐ Template 5: "Art Deco Glamour" bouwen
14. ☐ Template 6: "Garden Party" bouwen
15. ☐ Template preview/selectie component
```

### Fase 3: Editor
```
16. ☐ Editor layout (3-panel)
17. ☐ Sectie management (toevoegen, verwijderen, herschikken)
18. ☐ Inline tekst bewerking
19. ☐ Color picker component (HSL + presets)
20. ☐ Font picker component (Google Fonts)
21. ☐ Foto upload + crop tool
22. ☐ Live preview renderer
23. ☐ Responsive preview toggle
24. ☐ Opslaan / auto-save functionaliteit
25. ☐ Publiceer flow
```

### Fase 4: RSVP
```
26. ☐ RSVP formulier component (voor gasten)
27. ☐ RSVP API endpoints
28. ☐ RSVP dashboard voor koppels
29. ☐ Export naar CSV
30. ☐ Google Forms / Tally.so embed optie
```

### Fase 5: Betalingen
```
31. ☐ Stripe configureren
32. ☐ Pricing page bouwen
33. ☐ Checkout flow (monthly + one-time)
34. ☐ Webhook handler
35. ☐ Tier-based feature gating
36. ☐ Customer portal link
```

### Fase 6: Domein & Publicatie
```
37. ☐ Subdomein routing ([slug].altijdsamen.nl)
38. ☐ Custom domain configuratie UI
39. ☐ DNS verificatie endpoint
40. ☐ Vercel domein API integratie
41. ☐ SSL certificaat flow
```

### Fase 7: Marketing & Polish
```
42. ☐ Landing page bouwen (alle secties)
43. ☐ Pricing page finaliseren
44. ☐ Voorbeeld websites pagina
45. ☐ SEO optimalisatie (meta tags, OG images)
46. ☐ Cookie banner + privacy pagina
47. ☐ Loading states & skeleton screens
48. ☐ Error handling & toast notificaties
49. ☐ Animaties & micro-interacties toevoegen
50. ☐ Performance optimalisatie (images, lazy loading)
```

---

## ⚙️ ENVIRONMENT VARIABLES

```env
# .env.local (maak .env.example aan)

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/altijdsamen"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret-here"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_PREMIUM_MONTHLY=""
STRIPE_PRICE_PREMIUM_ONETIME=""
STRIPE_PRICE_DELUXE_MONTHLY=""
STRIPE_PRICE_DELUXE_ONETIME=""

# Upload
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
# of
CLOUDINARY_URL=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Altijd Samen"

# Analytics (privacy-friendly)
PLAUSIBLE_DOMAIN=""
```

---

## 🚀 HOSTING, INFRASTRUCTUUR & DEPLOYMENT

### Hosting Architectuur Overzicht

```
┌─────────────────────────────────────────────────────────────┐
│                        GEBRUIKERS                           │
│  anna-en-pieter.altijdsamen.nl  |  onzebruiloft.nl          │
│  altijdsamen.nl (platform)                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     VERCEL (Hosting)                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Next.js App  │  │  Edge        │  │  Serverless      │  │
│  │  (SSR + SSG)  │  │  Middleware  │  │  Functions       │  │
│  │               │  │  (routing,   │  │  (API routes)    │  │
│  │  - Marketing  │  │   auth,      │  │                  │  │
│  │  - Dashboard  │  │   domains)   │  │  - /api/sites    │  │
│  │  - Editor     │  │              │  │  - /api/rsvp     │  │
│  │  - Templates  │  │              │  │  - /api/stripe   │  │
│  └──────────────┘  └──────────────┘  │  - /api/upload   │  │
│                                       │  - /api/domains  │  │
│  Vercel Domains API                   └──────────────────┘  │
│  → Wildcard *.altijdsamen.nl                                │
│  → Custom domains via CNAME                                  │
│  → Automatisch SSL (Let's Encrypt)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│  Supabase    │ │Cloudinary│ │   Stripe     │
│  (Database)  │ │(Fotos)   │ │  (Betalingen)│
│              │ │          │ │              │
│  PostgreSQL  │ │  Upload  │ │  Checkout    │
│  EU-West     │ │  Resize  │ │  Subscriptie │
│  (Frankfurt) │ │  CDN     │ │  Webhooks    │
│  Auth        │ │  Crop    │ │  Facturatie  │
│  Realtime    │ │  Filters │ │  BTW (EU)    │
└──────────────┘ └──────────┘ └──────────────┘
```

---

### 1. VERCEL — Applicatie Hosting

Vercel is de primaire host. De hele Next.js applicatie draait hier.

**Waarom Vercel:**
- Native Next.js support (ze maken Next.js)
- Edge network voor snelle laadtijden wereldwijd
- Serverless functions voor API routes (geen server beheer)
- Ingebouwde Domains API voor custom domains van gebruikers
- Automatische SSL certificaten
- Preview deployments bij elke git push
- Schaalbaar: van 0 tot 100k bezoekers zonder config

**Vercel Plan:** Pro ($20/maand) — nodig voor:
- Vercel Domains API (custom domains van klanten)
- Meer serverless function execution time
- Analytics
- Hogere limieten

**vercel.json configuratie:**
```json
{
  "framework": "nextjs",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' https://res.cloudinary.com https://*.cloudinary.com data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://tally.so; frame-src https://tally.so https://docs.google.com https://open.spotify.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/cron/check-domains",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/send-rsvp-reminders",
      "schedule": "0 9 * * 1"
    },
    {
      "path": "/api/cron/cleanup-expired-trials",
      "schedule": "0 3 * * *"
    }
  ]
}
```

**Wildcard Domain & Subdomein Routing:**

```typescript
// middleware.ts — Edge Middleware voor domein routing
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  // Platform domein — gewoon doorlaten
  const platformDomains = ['altijdsamen.nl', 'www.altijdsamen.nl', 'localhost:3000'];
  if (platformDomains.some(d => hostname.includes(d) && !hostname.replace(d, '').replace('.', ''))) {
    return NextResponse.next();
  }

  // Subdomein check: anna-en-pieter.altijdsamen.nl
  const subdomain = hostname.split('.altijdsamen.nl')[0];
  if (subdomain && subdomain !== 'www' && hostname.endsWith('.altijdsamen.nl')) {
    url.pathname = `/sites/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Custom domein check: onzebruiloft.nl
  // Lookup in database (edge-compatible via Prisma Accelerate of KV cache)
  const customDomainSite = await lookupCustomDomain(hostname);
  if (customDomainSite) {
    url.pathname = `/sites/${customDomainSite.slug}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
```

**Custom Domain API integratie:**

```typescript
// lib/vercel-domains.ts
const VERCEL_API = 'https://api.vercel.com';
const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function addDomainToVercel(domain: string) {
  const response = await fetch(
    `${VERCEL_API}/v10/projects/${VERCEL_PROJECT_ID}/domains?teamId=${VERCEL_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain }),
    }
  );
  return response.json();
}

export async function verifyDomain(domain: string) {
  const response = await fetch(
    `${VERCEL_API}/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}/verify?teamId=${VERCEL_TEAM_ID}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  );
  return response.json();
}

export async function getDomainConfig(domain: string) {
  const response = await fetch(
    `${VERCEL_API}/v6/domains/${domain}/config?teamId=${VERCEL_TEAM_ID}`,
    { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
  );
  return response.json();
}

export async function removeDomainFromVercel(domain: string) {
  const response = await fetch(
    `${VERCEL_API}/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}?teamId=${VERCEL_TEAM_ID}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  );
  return response.json();
}
```

---

### 2. SUPABASE — Database & Auth

PostgreSQL database gehost bij Supabase in **EU-West (Frankfurt)** voor GDPR compliance.

**Waarom Supabase:**
- Managed PostgreSQL (geen database beheer nodig)
- EU datacenter beschikbaar (Frankfurt)
- Gratis tier: 500MB database, 1GB file storage
- Ingebouwde auth (backup voor NextAuth)
- Realtime subscriptions (handig voor live RSVP updates)
- Dashboard voor database beheer
- Automatische backups

**Supabase Setup Instructies:**

```bash
# 1. Maak account aan op supabase.com
# 2. Nieuw project → Regio: EU West (Frankfurt)
# 3. Kopieer de connection string

# In .env.local:
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

```typescript
// prisma/schema.prisma — Supabase-compatibel
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // Pooled connection (voor serverless)
  directUrl = env("DIRECT_URL")        // Direct connection (voor migrations)
}
```

**Supabase Pricing:**
- Free: 500MB DB, 1GB storage, 50k auth users → **Start hiermee**
- Pro ($25/maand): 8GB DB, 100GB storage, dagelijkse backups → **Na ~50 klanten**
- Team ($599/maand): Alleen nodig bij serieuze schaal

**Database Performance Tips:**
```sql
-- Maak indexes aan voor veelgebruikte queries
CREATE INDEX idx_wedding_sites_slug ON "WeddingSite" (slug);
CREATE INDEX idx_wedding_sites_custom_domain ON "WeddingSite" ("customDomain") WHERE "customDomain" IS NOT NULL;
CREATE INDEX idx_wedding_sites_user ON "WeddingSite" ("userId");
CREATE INDEX idx_rsvp_site ON "RSVPResponse" ("siteId");
CREATE INDEX idx_photos_site ON "Photo" ("siteId");
CREATE INDEX idx_analytics_site_date ON "SiteAnalytics" ("siteId", date);
```

---

### 3. CLOUDINARY — Foto Hosting & Verwerking

Alle gebruikersfoto's worden opgeslagen en geserveerd via Cloudinary.

**Waarom Cloudinary:**
- Automatische image optimization (WebP, AVIF)
- On-the-fly resize, crop, filters
- Global CDN (foto's laden snel overal)
- 25GB storage + 25GB bandwidth gratis
- GDPR-compliant (EU processing mogelijk)

**Cloudinary Setup:**

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload preset voor trouwfoto's
export const UPLOAD_PRESET = 'wedding_photos';

// Cloudinary transformaties voor templates
export const imageTransforms = {
  hero: { width: 1920, height: 1080, crop: 'fill', quality: 'auto', format: 'auto' },
  thumbnail: { width: 400, height: 300, crop: 'fill', quality: 'auto', format: 'auto' },
  gallery: { width: 800, height: 600, crop: 'fill', quality: 'auto', format: 'auto' },
  avatar: { width: 200, height: 200, crop: 'thumb', gravity: 'face', quality: 'auto' },
  ogImage: { width: 1200, height: 630, crop: 'fill', quality: 'auto' },
};

// Upload functie
export async function uploadWeddingPhoto(
  file: Buffer,
  siteId: string,
  section: string
) {
  const result = await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${file.toString('base64')}`,
    {
      folder: `wedding-sites/${siteId}/${section}`,
      upload_preset: UPLOAD_PRESET,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 2000, crop: 'limit' }, // Max 2000px breed
      ],
      moderation: 'aws_rek',  // Optioneel: content moderation
    }
  );
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    thumbnailUrl: cloudinary.url(result.public_id, imageTransforms.thumbnail),
  };
}

// Verwijder foto's als site wordt verwijderd
export async function deleteAllSitePhotos(siteId: string) {
  await cloudinary.api.delete_resources_by_prefix(`wedding-sites/${siteId}/`);
}
```

**Upload API Route:**

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { uploadWeddingPhoto } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { checkUserTierLimit } from '@/lib/tier-limits';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const siteId = formData.get('siteId') as string;
  const section = formData.get('section') as string;

  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Bestand te groot (max 10MB)' }, { status: 413 });
  }

  // Check tier limiet
  const canUpload = await checkUserTierLimit(session.user.id, 'photos');
  if (!canUpload) {
    return NextResponse.json({ 
      error: 'Upload limiet bereikt. Upgrade naar Premium voor onbeperkt foto\'s.',
      upgradeUrl: '/pricing'
    }, { status: 403 });
  }

  // Upload naar Cloudinary
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadWeddingPhoto(buffer, siteId, section);

  // Sla referentie op in database
  const photo = await prisma.photo.create({
    data: {
      siteId,
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      width: result.width,
      height: result.height,
      sectionKey: section,
    },
  });

  return NextResponse.json(photo);
}
```

**Cloudinary Pricing:**
- Free: 25 credits/maand (~25GB storage of transforms) → **Start hiermee**
- Plus ($89/maand): 225 credits → **Na ~200 actieve sites**

---

### 4. STRIPE — Betalingen

Alle betalingsverwerking via Stripe. Zie de bestaande Stripe sectie in dit document voor de implementatie.

**Stripe-specifieke hosting/infra zaken:**

```typescript
// Webhook endpoint moet publiek bereikbaar zijn
// Vercel handelt dit automatisch af via: /api/stripe/webhook

// BELANGRIJK: Stel webhook in Stripe Dashboard in:
// Endpoint: https://altijdsamen.nl/api/stripe/webhook
// Events:
//   - checkout.session.completed
//   - customer.subscription.created
//   - customer.subscription.updated
//   - customer.subscription.deleted
//   - invoice.payment_succeeded
//   - invoice.payment_failed
```

**Stripe kosten:** 1,4% + €0,25 per EU-transactie (kaart), 0% setup

---

### 5. EXTRA SERVICES

**Email (transactioneel):**
```
Service:  Resend (resend.com) — of Postmark
Gebruik:  RSVP bevestigingen, herinneringsmails, magic link auth
Pricing:  Gratis tot 3.000 mails/maand, daarna $20/maand
Setup:    Eigen domein verificatie (SPF, DKIM records)

// .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@altijdsamen.nl"
```

**Analytics (privacy-friendly):**
```
Service:  Plausible Analytics (plausible.io) — EU-hosted
Gebruik:  Bezoekersstatistieken voor Deluxe tier
Pricing:  €9/maand voor 10k pageviews
Alternatief: Umami (self-hosted, gratis) op Railway/Fly.io

// Geen cookies nodig = geen cookie banner voor analytics!
```

**Error Monitoring:**
```
Service:  Sentry (sentry.io)
Gebruik:  Crash reporting, performance monitoring
Pricing:  Gratis tot 5k events/maand
```

**DNS voor het platform zelf:**
```
Service:  Cloudflare (gratis) — voor altijdsamen.nl
Gebruik:  DNS management, DDoS protection, caching
Records:
  A     @    76.76.21.21          (Vercel)
  CNAME www  cname.vercel-dns.com (Vercel)
  MX    @    [email provider]
  TXT   @    [SPF record voor email]
```

---

### 6. KOSTENOVERZICHT PER FASE

```
┌─────────────────────────────────────────────────────────────┐
│                    MAANDELIJKSE KOSTEN                       │
├─────────────────────┬───────────┬───────────┬───────────────┤
│ Service             │ Start     │ ~100      │ ~1000         │
│                     │ (0-20     │ klanten   │ klanten       │
│                     │  klanten) │           │               │
├─────────────────────┼───────────┼───────────┼───────────────┤
│ Vercel Pro          │ €20       │ €20       │ €20           │
│ Supabase            │ €0        │ €25       │ €25-75        │
│ Cloudinary          │ €0        │ €0-89     │ €89-200       │
│ Resend (email)      │ €0        │ €0-20     │ €20-50        │
│ Plausible           │ €0-9      │ €9        │ €19-48        │
│ Sentry              │ €0        │ €0        │ €26           │
│ Domein              │ €1        │ €1        │ €1            │
│ Cloudflare          │ €0        │ €0        │ €0            │
├─────────────────────┼───────────┼───────────┼───────────────┤
│ TOTAAL              │ ~€21-30   │ ~€55-165  │ ~€200-420     │
├─────────────────────┼───────────┼───────────┼───────────────┤
│ Potentiële omzet*   │ €0-500    │ €2.5-5k   │ €25-50k       │
│ (* bij 50% premium+ │           │           │               │
│   gem. €50/klant)   │           │           │               │
└─────────────────────┴───────────┴───────────┴───────────────┘
```

---

### 7. DEPLOYMENT PIPELINE

**Git-based deployment via Vercel:**

```bash
# Repository structuur
main        → productie (altijdsamen.nl)
develop     → staging (staging.altijdsamen.nl)
feature/*   → preview URLs (automatisch door Vercel)
```

**Eerste deployment stappen:**

```bash
# 1. Push naar GitHub
git init
git remote add origin https://github.com/[user]/altijd-samen.git
git push -u origin main

# 2. Verbind met Vercel
#    → vercel.com → New Project → Import git repo
#    → Framework: Next.js (auto-detected)
#    → Root Directory: ./
#    → Environment Variables: kopieer alles uit .env.local

# 3. Configureer domein in Vercel Dashboard
#    → altijdsamen.nl (primair)
#    → *.altijdsamen.nl (wildcard voor subdomeinen)

# 4. Supabase database
#    → Maak project aan in EU-West (Frankfurt)
#    → Kopieer connection string naar Vercel env vars
#    → Run: npx prisma migrate deploy

# 5. Stripe webhook
#    → Stripe Dashboard → Developers → Webhooks
#    → Endpoint: https://altijdsamen.nl/api/stripe/webhook
#    → Selecteer events (zie boven)
#    → Kopieer webhook secret naar Vercel env vars

# 6. Cloudinary
#    → Maak account aan
#    → Settings → Upload Presets → Maak "wedding_photos" preset
#    → Kopieer credentials naar Vercel env vars

# 7. DNS (Cloudflare)
#    → Voeg altijdsamen.nl toe
#    → Stel A en CNAME records in (zie boven)
#    → Zet Proxy status op DNS only (grijs wolkje) voor Vercel
```

**Automatische checks bij deployment:**

```json
// package.json scripts
{
  "scripts": {
    "build": "next build",
    "postbuild": "prisma generate",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "db:migrate": "prisma migrate deploy",
    "db:seed": "prisma db seed"
  }
}
```

---

### 8. MONITORING & ONDERHOUD

```typescript
// Health check endpoint
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: false,
    timestamp: new Date().toISOString(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (e) {
    checks.database = false;
  }

  const healthy = checks.database;

  return NextResponse.json(checks, { status: healthy ? 200 : 503 });
}
```

**Uptime monitoring:**
- Gebruik BetterStack (betterstack.com) of UptimeRobot (gratis)
- Monitor: `/api/health`, homepage, een voorbeeld trouwsite
- Alert via email + Slack/Telegram

**Backup strategie:**
- Database: Supabase doet automatische dagelijkse backups (Pro plan)
- Foto's: Cloudinary heeft eigen redundantie
- Code: Git repository is je backup
- Extra: Wekelijkse database export naar S3/Backblaze (optioneel)

---

### 9. SCHAALSTRATEGIE

```
Fase 1 (0-100 klanten):
  → Alles op free/starter tiers
  → Vercel Pro is de enige vaste kost
  → Focus op product-market fit

Fase 2 (100-1000 klanten):
  → Upgrade Supabase naar Pro
  → Cloudinary betaald plan
  → Overweeg Prisma Accelerate voor connection pooling
  → Voeg caching toe (Vercel KV of Upstash Redis)

Fase 3 (1000+ klanten):
  → Edge caching voor trouwwebsites (ISR + on-demand revalidation)
  → CDN caching headers optimaliseren
  → Database read replicas overwegen
  → Mogelijk: dedicated Vercel Enterprise
```

**Caching strategie voor trouwwebsites:**

```typescript
// app/sites/[slug]/page.tsx
// Gebruik ISR (Incremental Static Regeneration) voor trouwwebsites
export const revalidate = 3600; // Hervalideer elk uur

// Of on-demand revalidatie wanneer koppel hun site update:
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  revalidatePath(`/sites/${slug}`);
  return NextResponse.json({ revalidated: true });
}
```

---

### DEPLOYMENT CHECKLIST

```
☐ GitHub repository aangemaakt en code gepusht
☐ Vercel project aangemaakt en gekoppeld aan repo
☐ Vercel Pro plan geactiveerd
☐ Supabase project aangemaakt (EU-West Frankfurt)
☐ DATABASE_URL en DIRECT_URL in Vercel env vars
☐ Prisma migrations gedraaid (npx prisma migrate deploy)
☐ NextAuth NEXTAUTH_SECRET en NEXTAUTH_URL ingesteld
☐ Google OAuth credentials aangemaakt en ingesteld
☐ Cloudinary account + upload preset "wedding_photos"
☐ Cloudinary credentials in Vercel env vars
☐ Stripe account + producten/prijzen aangemaakt
☐ Stripe webhook endpoint geconfigureerd
☐ Stripe credentials in Vercel env vars
☐ Resend account + domein geverifieerd
☐ DNS records ingesteld bij Cloudflare
☐ Wildcard domein *.altijdsamen.nl in Vercel
☐ vercel.json met security headers en cron jobs
☐ Health check endpoint werkt (/api/health)
☐ Uptime monitoring ingesteld
☐ Sentry error tracking geconfigureerd
☐ .env.example bijgewerkt met alle benodigde variabelen
☐ README.md met setup instructies voor development
☐ Eerste testbetaling via Stripe (test mode)
☐ Eerste trouwwebsite aangemaakt en gepubliceerd (test)
☐ Custom domein flow getest (test domein)
☐ Mobile responsive getest op echte devices
☐ Lighthouse score ≥90 op alle metrics
```

---

## 💡 EXTRA FEATURES (NICE TO HAVE)

Als er tijd over is, bouw dan ook:

```
- [ ] Countdown timer widget (dagen tot bruiloft)
- [ ] Achtergrondmuziek optie (Spotify embed)
- [ ] Foto galerij met lightbox
- [ ] Gastenboek (digitaal)
- [ ] Save-the-date PDF generator
- [ ] QR code generator voor uitnodigingen
- [ ] Multi-taal per website (nl + en)
- [ ] Kaart integratie (Google Maps / Mapbox) voor locatie
- [ ] Weer-widget voor de trouwdag
- [ ] Gift registry / cadeau wensenlijst link
- [ ] Aftellen animatie op de website
- [ ] Social sharing (WhatsApp, email)
```

---

## 📝 FINAL NOTES

### Kwaliteitsstandaarden
- **Code**: TypeScript strict mode, ESLint + Prettier
- **Accessibility**: WCAG 2.1 AA minimum
- **Performance**: Lighthouse score 90+ op alle metrics
- **SEO**: Complete meta tags, structured data voor events
- **Security**: Input validatie, CSRF protection, rate limiting

### Design Mantra
> *"Als het niet mooi genoeg is voor op een trouwuitnodiging, is het niet mooi genoeg voor dit platform."*

Elk component, elke pagina, elke animatie moet die standaard halen. Koppels investeren emotioneel in hun trouwdag — de website moet dat gevoel weerspiegelen.

---

**Start nu met Fase 1. Commit na elke werkende fase. Test alles. Maak het prachtig.** 🪻
