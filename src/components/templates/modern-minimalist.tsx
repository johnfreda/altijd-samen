'use client'

import { motion } from 'framer-motion'
import type { TemplateProps } from './renderer'
import { RSVPForm, formatDate } from './shared'

export function ModernMinimalist({ partner1, partner2, date, venue, city, sections, colors, fonts }: TemplateProps) {
  const getSection = (type: string) => sections.find(s => s.type === type)

  return (
    <div style={{ background: colors.background, color: colors.text, fontFamily: fonts.body }}>
      {/* Hero — bold, typographic */}
      {getSection('hero') && (
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-8">
              <div className="h-px w-32 mx-auto mb-8" style={{ background: colors.text + '20' }} />
              <p className="text-xs tracking-[0.4em] uppercase mb-8" style={{ fontFamily: fonts.body, opacity: 0.5 }}>
                {(getSection('hero')?.content.subtitle as string) || 'Uitnodiging'}
              </p>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-4" style={{ fontFamily: fonts.heading }}>
              {partner1}
            </h1>
            <p className="text-xl my-4" style={{ color: colors.accent, fontFamily: fonts.heading }}>×</p>
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none" style={{ fontFamily: fonts.heading }}>
              {partner2}
            </h1>

            <div className="mt-12 space-y-2">
              {date && <p className="text-sm tracking-widest uppercase" style={{ opacity: 0.6 }}>{formatDate(date)}</p>}
              {(venue || city) && <p className="text-sm" style={{ opacity: 0.4 }}>{[venue, city].filter(Boolean).join(', ')}</p>}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-px h-12" style={{ background: colors.text + '20' }} />
          </motion.div>
        </section>
      )}

      {/* Story — asymmetric */}
      {getSection('story') && (
        <motion.section
          className="px-6 py-20 sm:py-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-12">
            <div className="sm:col-span-4">
              <h2 className="text-xs tracking-[0.3em] uppercase sticky top-8" style={{ fontFamily: fonts.heading, opacity: 0.5 }}>
                {(getSection('story')?.content.heading as string) || 'Ons Verhaal'}
              </h2>
            </div>
            <div className="sm:col-span-8 space-y-6">
              {((getSection('story')?.content.paragraphs as string[]) || []).map((p, i) => (
                <p key={i} className="text-lg leading-relaxed" style={{ opacity: 0.7 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Details — clean grid */}
      {getSection('details') && (
        <section className="px-6 py-20 border-t border-b" style={{ borderColor: colors.text + '10' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              {['ceremony', 'reception', 'party'].map(key => {
                const detail = (getSection('details')?.content[key] as Record<string, string>) || {}
                return (
                  <div key={key}>
                    <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ opacity: 0.4 }}>{detail.title || key}</p>
                    <p className="text-3xl font-bold mb-2" style={{ fontFamily: fonts.heading }}>{detail.time || ''}</p>
                    <p className="text-sm" style={{ opacity: 0.5 }}>{detail.location || ''}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Schedule — minimal timeline */}
      {getSection('schedule') && (
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto">
            {((getSection('schedule')?.content.items as Array<{time: string, title: string, description: string}>) || []).map((item, i) => (
              <div key={i} className="flex gap-8 py-4 border-b" style={{ borderColor: colors.text + '08' }}>
                <span className="text-sm w-16 flex-shrink-0 font-bold" style={{ fontFamily: fonts.heading }}>{item.time}</span>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm mt-0.5" style={{ opacity: 0.5 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RSVP */}
      {getSection('rsvp') && (
        <section className="px-6 py-20 sm:py-32" style={{ background: colors.secondary }}>
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: fonts.heading, opacity: 0.5 }}>RSVP</h2>
            <p className="text-sm mb-8" style={{ opacity: 0.6 }}>
              {(getSection('rsvp')?.content.description as string) || ''}
            </p>
            <RSVPForm colors={colors} fonts={fonts} />
          </div>
        </section>
      )}

      {/* Footer */}
      <div className="py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ opacity: 0.2 }}>
          {partner1} × {partner2}
        </p>
      </div>
    </div>
  )
}
