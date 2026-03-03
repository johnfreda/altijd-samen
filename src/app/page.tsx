'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Palette, Globe, Users, Lock, BarChart3, Smartphone, Sparkles, ChevronDown, Star, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header'
import { MarketingFooter } from '@/components/marketing/footer'
import { templates } from '@/lib/templates'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function HomePage() {
  return (
    <div className="min-h-screen grain-overlay">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose/10 text-rose text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Nu beschikbaar
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-warm-black leading-[1.1] mb-6"
            >
              Jullie liefde verdient
              <br />
              <span className="text-rose italic">een prachtige website</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-warm-gray max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Ontwerp in minuten jullie droomtrouwwebsite. Kies een template,
              pas alles aan, en deel met jullie gasten.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-warm-black hover:bg-warm-black/90 text-ivory text-base px-8 h-12">
                  Begin gratis →
                </Button>
              </Link>
              <Link href="#templates">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 border-sand hover:bg-sand/50">
                  Bekijk voorbeelden
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-6 text-sm text-warm-muted">
              <span className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-rose/40 to-gold/40 border-2 border-ivory" />
                  ))}
                </div>
              </span>
              <span>500+ koppels gingen jullie voor</span>
              <span className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
                <span className="ml-1">4.9</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Hero preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-sand/50">
              <div className="bg-gradient-to-br from-rose/5 via-ivory to-gold/5 p-8 sm:p-16 text-center">
                <p className="font-serif text-sm tracking-[0.3em] uppercase text-warm-muted mb-4">Wij gaan trouwen</p>
                <h2 className="font-serif text-4xl sm:text-6xl font-semibold text-warm-black mb-3">
                  Emma <span className="text-gold">&</span> Lucas
                </h2>
                <p className="text-warm-gray font-light text-lg">12 september 2026 · Amsterdam</p>
                <div className="mt-8 flex justify-center gap-8 text-warm-muted text-sm">
                  <span>Ons Verhaal</span>
                  <span className="text-sand">·</span>
                  <span>Locatie</span>
                  <span className="text-sand">·</span>
                  <span>RSVP</span>
                  <span className="text-sand">·</span>
                  <span>Cadeautips</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 lg:py-32 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-warm-black mb-4">
              Zes prachtige templates
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Van romantisch tot minimalistisch — elk template is zorgvuldig ontworpen
              en volledig aanpasbaar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden border border-sand/50 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Template preview */}
                  <div
                    className="h-64 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
                    style={{ background: template.colors.background }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${template.colors.primary}10, ${template.colors.accent}10)` }}
                    />
                    <p
                      className="text-xs tracking-[0.2em] uppercase mb-2 relative z-10"
                      style={{ color: template.colors.text + '80', fontFamily: template.fonts.body }}
                    >
                      Wij gaan trouwen
                    </p>
                    <h3
                      className="text-3xl font-semibold mb-1 relative z-10"
                      style={{ color: template.colors.text, fontFamily: template.fonts.heading }}
                    >
                      Anna & Pieter
                    </h3>
                    <p
                      className="text-sm relative z-10"
                      style={{ color: template.colors.text + '70', fontFamily: template.fonts.body }}
                    >
                      12 juni 2026
                    </p>
                    {/* Color dots */}
                    <div className="absolute bottom-4 right-4 flex gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ background: template.colors.primary }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: template.colors.accent }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: template.colors.secondary }} />
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-semibold text-warm-black mb-1">
                      {template.name}
                    </h4>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-warm-black mb-4">
              Alles wat jullie nodig hebben
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Van de eerste uitnodiging tot de laatste dans.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: Palette, title: 'Visuele Editor', desc: 'Pas kleuren, fonts en layout aan met onze intuïtieve drag-and-drop editor. Geen technische kennis nodig.' },
              { icon: Users, title: 'RSVP Beheer', desc: 'Ingebouwd RSVP-systeem met dashboard, dieetwensen en exporteer mogelijkheden.' },
              { icon: Smartphone, title: 'Altijd Responsive', desc: 'Jullie website ziet er perfect uit op elk apparaat — van telefoon tot desktop.' },
              { icon: Globe, title: 'Eigen Domein', desc: 'Gebruik jullie eigen domeinnaam voor een persoonlijke touch. SSL inbegrepen.' },
              { icon: Lock, title: 'Privacy & GDPR', desc: 'Optionele wachtwoordbeveiliging en volledig GDPR-compliant. Jullie data is veilig.' },
              { icon: BarChart3, title: 'Statistieken', desc: 'Bekijk hoeveel gasten jullie website bezoeken en hoe ze reageren.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group p-6 rounded-xl border border-sand/50 bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-rose/10 flex items-center justify-center mb-4 group-hover:bg-rose/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-rose" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-warm-black mb-2">{feature.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 lg:py-32 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-warm-black mb-4">
              Simpele, eerlijke prijzen
            </h2>
            <p className="text-warm-gray text-lg">Begin gratis, upgrade wanneer jullie klaar zijn.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Gratis', price: '€0', period: 'voor altijd', popular: false,
                features: ['Alle templates', 'Basis kleuraanpassing', 'Subdomein', 'Tot 50 gasten', 'Standaard fonts'],
              },
              {
                name: 'Premium', price: '€49,99', period: 'eenmalig', popular: true,
                features: ['Alles van Gratis', 'Onbeperkt foto\'s', 'Alle fonts & kleuren', 'Geen watermerk', 'Onbeperkt gasten', 'RSVP dashboard & export'],
              },
              {
                name: 'Deluxe', price: '€89,99', period: 'eenmalig', popular: false,
                features: ['Alles van Premium', 'Eigen domein', 'Geavanceerde statistieken', 'Gastenbeheer', 'Herinneringsmails', 'Prioriteit support'],
              },
            ].map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 ${tier.popular ? 'bg-warm-black text-ivory ring-2 ring-gold shadow-xl scale-105' : 'bg-white border border-sand'}`}
              >
                {tier.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium mb-4">
                    ⭐ Meest gekozen
                  </span>
                )}
                <h3 className={`font-serif text-xl font-semibold mb-2 ${tier.popular ? 'text-ivory' : 'text-warm-black'}`}>
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-3xl font-semibold ${tier.popular ? 'text-ivory' : 'text-warm-black'}`}>{tier.price}</span>
                  <span className={`text-sm ml-1 ${tier.popular ? 'text-ivory/60' : 'text-warm-muted'}`}>{tier.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.popular ? 'text-ivory/80' : 'text-warm-gray'}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.popular ? 'text-gold' : 'text-sage'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button
                    className={`w-full ${tier.popular ? 'bg-gold hover:bg-gold/90 text-warm-black' : 'bg-warm-black hover:bg-warm-black/90 text-ivory'}`}
                  >
                    {tier.price === '€0' ? 'Gratis starten' : `Kies ${tier.name}`}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-warm-black mb-4">
              Wat koppels zeggen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Sophie & Daan', quote: 'Binnen een uur hadden we de perfecte trouwwebsite. Onze gasten waren onder de indruk!', location: 'Utrecht' },
              { name: 'Lisa & Mark', quote: 'Het RSVP-systeem heeft ons zoveel tijd bespaard. Alles op één plek, super overzichtelijk.', location: 'Amsterdam' },
              { name: 'Eva & Thomas', quote: 'De templates zijn werkelijk prachtig. We kregen zoveel complimenten over onze website.', location: 'Den Haag' },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-sand/50 bg-white"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-serif text-sm font-semibold text-warm-black">{t.name}</p>
                  <p className="text-xs text-warm-muted">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-32 bg-linen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-warm-black mb-4">
              Veelgestelde vragen
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: 'Hoe snel kan ik mijn trouwwebsite maken?', a: 'De meeste koppels hebben hun website binnen 30 minuten klaar. Kies een template, vul jullie gegevens in, pas de kleuren aan en publiceer!' },
              { q: 'Kan ik mijn eigen domeinnaam gebruiken?', a: 'Ja! Met het Deluxe plan kun je een eigen domeinnaam koppelen, bijvoorbeeld onzebruiloft.nl. We regelen automatisch het SSL-certificaat.' },
              { q: 'Is het RSVP-systeem echt gratis?', a: 'In het gratis plan kun je tot 50 gasten laten RSVPen. Voor onbeperkt gasten en het volledige dashboard upgrade je naar Premium.' },
              { q: 'Hoe zit het met privacy (GDPR)?', a: 'We nemen privacy zeer serieus. Alle data wordt opgeslagen in de EU, we gebruiken privacy-vriendelijke analytics en jullie gasten moeten toestemming geven voor het RSVP-formulier.' },
              { q: 'Kan ik de website later nog aanpassen?', a: 'Natuurlijk! Jullie kunnen de website op elk moment bewerken — zelfs na publicatie. Wijzigingen zijn direct zichtbaar.' },
              { q: 'Wat gebeurt er na de bruiloft?', a: 'Jullie website blijft gewoon online als herinnering. Bij eenmalige betalingen is de website 18 maanden actief, maar je kunt altijd verlengen.' },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-sand/50 rounded-lg bg-white px-5">
                <AccordionTrigger className="text-left font-serif text-base font-medium text-warm-black hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-warm-gray leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose/5 via-transparent to-gold/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-warm-black mb-4">
              Begin vandaag nog
            </h2>
            <p className="text-warm-gray text-lg mb-8 max-w-xl mx-auto">
              Jullie liefdesverhaal verdient een prachtige plek online. Maak het in minuten.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-warm-black hover:bg-warm-black/90 text-ivory text-base px-10 h-12">
                Maak jullie trouwwebsite →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
