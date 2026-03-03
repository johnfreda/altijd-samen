'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header'
import { MarketingFooter } from '@/components/marketing/footer'

const tiers = [
  {
    name: 'Gratis',
    price: '€0',
    period: 'voor altijd',
    monthlyPrice: null,
    description: 'Perfect om te beginnen',
    cta: 'Gratis starten',
    popular: false,
    features: [
      { text: 'Alle 6 templates', included: true },
      { text: 'Basis kleuraanpassing', included: true },
      { text: 'Subdomein (naam.altijdsamen.nl)', included: true },
      { text: 'RSVP tot 50 gasten', included: true },
      { text: 'Standaard fonts', included: true },
      { text: '1 foto per sectie', included: true },
      { text: 'Onbeperkt foto\'s', included: false },
      { text: 'Eigen domein', included: false },
      { text: 'Wachtwoord beveiliging', included: false },
      { text: 'RSVP dashboard & export', included: false },
      { text: 'Statistieken', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '€49,99',
    period: 'eenmalig',
    monthlyPrice: '€9,99/maand',
    description: 'Voor de perfecte website',
    cta: 'Kies Premium',
    popular: true,
    features: [
      { text: 'Alle 6 templates', included: true },
      { text: 'Alle kleuren & fonts', included: true },
      { text: 'Subdomein (naam.altijdsamen.nl)', included: true },
      { text: 'Onbeperkt gasten', included: true },
      { text: 'Onbeperkt foto\'s uploaden', included: true },
      { text: 'Foto filters & crop tool', included: true },
      { text: 'Geen watermerk', included: true },
      { text: 'RSVP dashboard & export', included: true },
      { text: 'Wachtwoord beveiliging', included: true },
      { text: 'Eigen domein', included: false },
      { text: 'Geavanceerde statistieken', included: false },
    ],
  },
  {
    name: 'Deluxe',
    price: '€89,99',
    period: 'eenmalig',
    monthlyPrice: '€19,99/maand',
    description: 'Het complete pakket',
    cta: 'Kies Deluxe',
    popular: false,
    features: [
      { text: 'Alles van Premium', included: true },
      { text: 'Eigen domein koppelen', included: true },
      { text: 'SSL certificaat automatisch', included: true },
      { text: 'Geavanceerde statistieken', included: true },
      { text: 'Gast management systeem', included: true },
      { text: 'Herinneringsmails versturen', included: true },
      { text: 'Prioriteit support', included: true },
      { text: 'Downloaden als PDF', included: true },
      { text: 'Fotoalbum galerij', included: true },
      { text: 'Countdown timer', included: true },
      { text: 'Google Maps integratie', included: true },
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen grain-overlay">
      <MarketingHeader />

      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-warm-black mb-4">
              Simpele, eerlijke prijzen
            </h1>
            <p className="text-warm-gray text-lg max-w-xl mx-auto">
              Geen verborgen kosten. Begin gratis, upgrade wanneer jullie klaar zijn.
              Eenmalig betalen = 18 maanden actief.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 flex flex-col ${
                  tier.popular
                    ? 'bg-warm-black text-ivory ring-2 ring-gold shadow-2xl relative'
                    : 'bg-white border border-sand shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gold text-warm-black text-xs font-semibold">
                      ⭐ Meest gekozen
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-serif text-2xl font-semibold mb-1 ${tier.popular ? 'text-ivory' : 'text-warm-black'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-4 ${tier.popular ? 'text-ivory/60' : 'text-warm-muted'}`}>
                    {tier.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-semibold ${tier.popular ? 'text-ivory' : 'text-warm-black'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ${tier.popular ? 'text-ivory/50' : 'text-warm-muted'}`}>
                      {tier.period}
                    </span>
                  </div>
                  {tier.monthlyPrice && (
                    <p className={`text-xs mt-1 ${tier.popular ? 'text-ivory/40' : 'text-warm-muted'}`}>
                      of {tier.monthlyPrice}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f.text} className={`flex items-start gap-2.5 text-sm ${
                      f.included
                        ? (tier.popular ? 'text-ivory/80' : 'text-warm-gray')
                        : (tier.popular ? 'text-ivory/25' : 'text-warm-muted/50')
                    }`}>
                      {f.included ? (
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.popular ? 'text-gold' : 'text-sage'}`} />
                      ) : (
                        <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {f.text}
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <Button
                    size="lg"
                    className={`w-full ${
                      tier.popular
                        ? 'bg-gold hover:bg-gold/90 text-warm-black font-semibold'
                        : 'bg-warm-black hover:bg-warm-black/90 text-ivory'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Guarantee */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-warm-muted">
              💝 14 dagen niet-goed-geld-terug garantie op alle betaalde plannen
            </p>
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
