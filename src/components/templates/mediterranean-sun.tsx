'use client'

import { motion } from 'framer-motion'
import type { TemplateProps } from './renderer'
import { Section, RSVPForm, formatDate, Countdown } from './shared'

// Arch shape decoration
function Arch({ color, children, className }: { color: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className || ''}`}>
      <div
        className="rounded-t-full overflow-hidden p-8 sm:p-12 text-center"
        style={{ background: color + '08', border: `1px solid ${color}15` }}
      >
        {children}
      </div>
    </div>
  )
}

export function MediterraneanSun({ partner1, partner2, date, venue, city, sections, colors, fonts }: TemplateProps) {
  const getSection = (type: string) => sections.find(s => s.type === type)

  return (
    <div style={{ background: colors.background, color: colors.text, fontFamily: fonts.body }}>
      {/* Hero with arch */}
      {getSection('hero') && (
        <section className="px-6 py-16 sm:py-24">
          <div className="max-w-xl mx-auto">
            <Arch color={colors.primary}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: colors.accent }}>
                  {(getSection('hero')?.content.subtitle as string) || 'Wij gaan trouwen!'}
                </p>
                <h1 className="text-4xl sm:text-6xl font-semibold leading-tight" style={{ fontFamily: fonts.heading }}>
                  {partner1}
                  <span className="block text-2xl font-normal my-3" style={{ color: colors.accent }}>&amp;</span>
                  {partner2}
                </h1>
                {date && (
                  <div className="mt-6">
                    <p className="text-sm" style={{ opacity: 0.7 }}>{formatDate(date)}</p>
                    <Countdown date={date} />
                  </div>
                )}
                {(venue || city) && (
                  <p className="text-sm mt-2" style={{ opacity: 0.5 }}>
                    {[venue, city].filter(Boolean).join(' · ')}
                  </p>
                )}
              </motion.div>
            </Arch>
          </div>
        </section>
      )}

      {/* Story cards */}
      {getSection('story') && (
        <Section bg={colors.secondary}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8" style={{ fontFamily: fonts.heading }}>
              {(getSection('story')?.content.heading as string) || 'Ons Verhaal'}
            </h2>
            <div className="space-y-6">
              {((getSection('story')?.content.paragraphs as string[]) || []).map((p, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ background: colors.background, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="leading-relaxed" style={{ opacity: 0.8 }}>{p}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Details with warm styling */}
      {getSection('details') && (
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12" style={{ fontFamily: fonts.heading }}>
              {(getSection('details')?.content.heading as string) || 'De Details'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {['ceremony', 'reception', 'party'].map(key => {
                const detail = (getSection('details')?.content[key] as Record<string, string>) || {}
                return (
                  <Arch key={key} color={colors.primary} className="flex-1">
                    <h3 className="font-semibold mb-2" style={{ fontFamily: fonts.heading, color: colors.primary }}>
                      {detail.title || key}
                    </h3>
                    <p className="text-2xl font-light mb-1">{detail.time || ''}</p>
                    <p className="text-sm" style={{ opacity: 0.6 }}>{detail.location || ''}</p>
                  </Arch>
                )
              })}
            </div>
          </div>
        </Section>
      )}

      {/* Schedule */}
      {getSection('schedule') && (
        <Section bg={colors.secondary}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12" style={{ fontFamily: fonts.heading }}>
              {(getSection('schedule')?.content.heading as string) || 'Het Programma'}
            </h2>
            <div className="space-y-4">
              {((getSection('schedule')?.content.items as Array<{time: string, title: string, description: string}>) || []).map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: colors.background }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-lg font-semibold w-16 text-right" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                    {item.time}
                  </span>
                  <div className="w-2 h-2 rounded-full" style={{ background: colors.accent }} />
                  <div className="text-left">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-xs" style={{ opacity: 0.5 }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* RSVP */}
      {getSection('rsvp') && (
        <Section>
          <div className="max-w-xl mx-auto">
            <Arch color={colors.primary}>
              <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: fonts.heading }}>RSVP</h2>
              <p className="text-sm mb-6" style={{ opacity: 0.7 }}>
                {(getSection('rsvp')?.content.description as string) || ''}
              </p>
              <RSVPForm colors={colors} fonts={fonts} />
            </Arch>
          </div>
        </Section>
      )}

      {/* Gifts */}
      {getSection('gifts') && (
        <Section bg={colors.secondary}>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: fonts.heading }}>
              {(getSection('gifts')?.content.heading as string) || 'Cadeautips'}
            </h2>
            <p style={{ opacity: 0.7 }}>
              {(getSection('gifts')?.content.description as string) || ''}
            </p>
          </div>
        </Section>
      )}

      <div className="py-12 text-center" style={{ opacity: 0.3, fontSize: '0.75rem' }}>
        <p>{partner1} & {partner2}</p>
      </div>
    </div>
  )
}
