'use client'

import { motion } from 'framer-motion'
import type { TemplateProps } from './renderer'
import { RSVPForm, formatDate, Countdown } from './shared'

// Minimal line art leaf
function Leaf({ color }: { color: string }) {
  return (
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" className="inline-block">
      <path d="M16 4C16 4 8 16 8 28C8 40 16 44 16 44C16 44 24 40 24 28C24 16 16 4 16 4Z" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
      <line x1="16" y1="12" x2="16" y2="40" stroke={color} strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

export function NordicGrace({ partner1, partner2, date, venue, city, sections, colors, fonts }: TemplateProps) {
  const getSection = (type: string) => sections.find(s => s.type === type)

  return (
    <div style={{ background: colors.background, color: colors.text, fontFamily: fonts.body }}>
      {/* Hero — serene, lots of whitespace */}
      {getSection('hero') && (
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <Leaf color={colors.primary} />
            <p className="text-xs tracking-[0.25em] uppercase mt-6 mb-8" style={{ opacity: 0.5 }}>
              {(getSection('hero')?.content.subtitle as string) || 'Wij gaan trouwen'}
            </p>
            <h1 className="text-4xl sm:text-6xl font-normal mb-6" style={{ fontFamily: fonts.heading }}>
              {partner1} <span style={{ color: colors.accent }}>&</span> {partner2}
            </h1>
            {date && <p className="text-sm mb-1" style={{ opacity: 0.6 }}>{formatDate(date)}</p>}
            {(venue || city) && <p className="text-sm" style={{ opacity: 0.4 }}>{[venue, city].filter(Boolean).join(' · ')}</p>}
            {date && <div className="mt-6"><Countdown date={date} /></div>}
          </motion.div>
        </section>
      )}

      {/* Story — clean vertical rhythm */}
      {getSection('story') && (
        <motion.section
          className="px-6 py-20 sm:py-28"
          style={{ background: colors.secondary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg mx-auto text-center">
            <Leaf color={colors.primary} />
            <h2 className="text-2xl sm:text-3xl font-normal mt-4 mb-8" style={{ fontFamily: fonts.heading }}>
              {(getSection('story')?.content.heading as string) || 'Wij Twee'}
            </h2>
            {((getSection('story')?.content.paragraphs as string[]) || []).map((p, i) => (
              <p key={i} className="leading-loose mb-6 text-sm" style={{ opacity: 0.7 }}>
                {p}
              </p>
            ))}
          </div>
        </motion.section>
      )}

      {/* Details — card style */}
      {getSection('details') && (
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-normal text-center mb-12" style={{ fontFamily: fonts.heading }}>
              {(getSection('details')?.content.heading as string) || 'Praktische Info'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['ceremony', 'reception', 'party'].map(key => {
                const detail = (getSection('details')?.content[key] as Record<string, string>) || {}
                return (
                  <motion.div
                    key={key}
                    className="p-6 rounded-lg text-center"
                    style={{ background: colors.secondary, border: `1px solid ${colors.primary}10` }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ opacity: 0.4 }}>
                      {detail.title || key}
                    </p>
                    <p className="text-2xl font-light" style={{ fontFamily: fonts.heading, color: colors.primary }}>
                      {detail.time || ''}
                    </p>
                    <p className="text-sm mt-2" style={{ opacity: 0.5 }}>{detail.location || ''}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Schedule */}
      {getSection('schedule') && (
        <section className="px-6 py-20" style={{ background: colors.secondary }}>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-normal mb-12" style={{ fontFamily: fonts.heading }}>
              {(getSection('schedule')?.content.heading as string) || 'Het Programma'}
            </h2>
            {((getSection('schedule')?.content.items as Array<{time: string, title: string, description: string}>) || []).map((item, i) => (
              <div key={i} className="py-4 border-b" style={{ borderColor: colors.primary + '10' }}>
                <span className="text-xs tracking-widest" style={{ color: colors.primary }}>{item.time}</span>
                <h4 className="font-medium mt-1" style={{ fontFamily: fonts.heading }}>{item.title}</h4>
                <p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RSVP */}
      {getSection('rsvp') && (
        <section className="px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <Leaf color={colors.primary} />
            <h2 className="text-2xl font-normal mt-4 mb-4" style={{ fontFamily: fonts.heading }}>RSVP</h2>
            <p className="text-sm mb-8" style={{ opacity: 0.6 }}>
              {(getSection('rsvp')?.content.description as string) || ''}
            </p>
            <RSVPForm colors={colors} fonts={fonts} />
          </div>
        </section>
      )}

      {getSection('gifts') && (
        <section className="px-6 py-16 text-center" style={{ background: colors.secondary }}>
          <Leaf color={colors.primary} />
          <h2 className="text-2xl font-normal mt-4 mb-4" style={{ fontFamily: fonts.heading }}>
            {(getSection('gifts')?.content.heading as string) || 'Cadeautips'}
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ opacity: 0.6 }}>
            {(getSection('gifts')?.content.description as string) || ''}
          </p>
        </section>
      )}

      <div className="py-12 text-center">
        <Leaf color={colors.primary} />
        <p className="text-xs mt-2" style={{ opacity: 0.2 }}>{partner1} & {partner2}</p>
      </div>
    </div>
  )
}
