'use client'

import { motion } from 'framer-motion'
import type { TemplateProps } from './renderer'
import { Section, Divider, RSVPForm, formatDate, Countdown } from './shared'

// Floral SVG border decoration
function FloralCorner({ color, className }: { color: string, className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path d="M10 110C10 110 20 80 40 60C60 40 90 20 110 10" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="40" cy="60" r="4" fill={color} opacity="0.2" />
      <circle cx="60" cy="40" r="3" fill={color} opacity="0.15" />
      <circle cx="80" cy="25" r="5" fill={color} opacity="0.2" />
      <path d="M35 65C35 65 30 55 35 50C40 45 45 50 45 50C45 50 50 45 55 50C60 55 55 65 55 65C55 65 50 60 45 60C40 60 35 65 35 65Z" fill={color} opacity="0.15" />
      <path d="M75 30C75 30 70 20 75 15C80 10 85 15 85 15C85 15 90 10 95 15C100 20 95 30 95 30C95 30 90 25 85 25C80 25 75 30 75 30Z" fill={color} opacity="0.12" />
    </svg>
  )
}

export function EternalBloom({ partner1, partner2, date, venue, city, sections, colors, fonts }: TemplateProps) {
  const getSection = (type: string) => sections.find(s => s.type === type)

  return (
    <div style={{ background: colors.background, color: colors.text, fontFamily: fonts.body }}>
      {/* Hero */}
      {getSection('hero') && (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
          <FloralCorner color={colors.primary} className="absolute top-0 left-0" />
          <FloralCorner color={colors.primary} className="absolute top-0 right-0 -scale-x-100" />
          <FloralCorner color={colors.primary} className="absolute bottom-0 left-0 -scale-y-100" />
          <FloralCorner color={colors.primary} className="absolute bottom-0 right-0 scale-[-1]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: colors.primary, fontFamily: fonts.body }}>
              {(getSection('hero')?.content.subtitle as string) || 'Wij gaan trouwen!'}
            </p>

            <h1 className="text-5xl sm:text-7xl font-semibold mb-4" style={{ fontFamily: fonts.heading }}>
              {partner1}
              <span className="block text-3xl sm:text-4xl font-normal my-2" style={{ fontFamily: fonts.accent || fonts.heading, color: colors.primary }}>
                &amp;
              </span>
              {partner2}
            </h1>

            {date && (
              <p className="text-lg mb-2" style={{ fontFamily: fonts.body, opacity: 0.7 }}>
                {formatDate(date)}
              </p>
            )}
            {(venue || city) && (
              <p className="text-sm" style={{ opacity: 0.5 }}>
                {[venue, city].filter(Boolean).join(' · ')}
              </p>
            )}

            {date && (
              <div className="mt-6">
                <Countdown date={date} />
              </div>
            )}
          </motion.div>
        </section>
      )}

      <Divider color={colors.primary} style="flourish" />

      {/* Story */}
      {getSection('story') && (
        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8" style={{ fontFamily: fonts.heading }}>
              {(getSection('story')?.content.heading as string) || 'Ons Verhaal'}
            </h2>
            {((getSection('story')?.content.paragraphs as string[]) || []).map((p, i) => (
              <p key={i} className="text-base leading-relaxed mb-4" style={{ opacity: 0.8 }}>
                {p}
              </p>
            ))}
          </div>
        </Section>
      )}

      {/* Details */}
      {getSection('details') && (
        <Section bg={colors.secondary}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12" style={{ fontFamily: fonts.heading }}>
              {(getSection('details')?.content.heading as string) || 'De Details'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {['ceremony', 'reception', 'party'].map(key => {
                const detail = (getSection('details')?.content[key] as Record<string, string>) || {}
                return (
                  <div key={key} className="text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                      <span className="text-lg">
                        {key === 'ceremony' ? '💒' : key === 'reception' ? '🥂' : '🎉'}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1" style={{ fontFamily: fonts.heading }}>
                      {detail.title || key}
                    </h3>
                    <p className="text-2xl font-light mb-1" style={{ color: colors.primary }}>
                      {detail.time || ''}
                    </p>
                    <p className="text-sm" style={{ opacity: 0.6 }}>{detail.location || ''}</p>
                    <p className="text-xs mt-1" style={{ opacity: 0.4 }}>{detail.address || ''}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>
      )}

      <Divider color={colors.primary} style="flourish" />

      {/* Schedule */}
      {getSection('schedule') && (
        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12" style={{ fontFamily: fonts.heading }}>
              {(getSection('schedule')?.content.heading as string) || 'Het Programma'}
            </h2>
            <div className="space-y-6">
              {((getSection('schedule')?.content.items as Array<{time: string, title: string, description: string}>) || []).map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <span className="text-lg font-light w-16 text-right flex-shrink-0" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                    {item.time}
                  </span>
                  <div className="flex-1 text-left border-l-2 pl-6" style={{ borderColor: colors.primary + '20' }}>
                    <h4 className="font-semibold" style={{ fontFamily: fonts.heading }}>{item.title}</h4>
                    <p className="text-sm mt-0.5" style={{ opacity: 0.6 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* RSVP */}
      {getSection('rsvp') && (
        <Section bg={colors.secondary}>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: fonts.heading }}>
              {(getSection('rsvp')?.content.heading as string) || 'RSVP'}
            </h2>
            <p className="mb-8" style={{ opacity: 0.7 }}>
              {(getSection('rsvp')?.content.description as string) || 'Laat ons weten of jullie erbij zijn!'}
            </p>
            <RSVPForm colors={colors} fonts={fonts} />
          </div>
        </Section>
      )}

      {/* Gifts */}
      {getSection('gifts') && (
        <Section>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: fonts.heading }}>
              {(getSection('gifts')?.content.heading as string) || 'Cadeautips'}
            </h2>
            <p style={{ opacity: 0.7 }}>
              {(getSection('gifts')?.content.description as string) || 'Jullie aanwezigheid is het mooiste cadeau.'}
            </p>
          </div>
        </Section>
      )}

      {/* Footer */}
      <div className="py-12 text-center" style={{ opacity: 0.3, fontSize: '0.75rem' }}>
        <p>{partner1} & {partner2}</p>
        {date && <p>{formatDate(date)}</p>}
      </div>
    </div>
  )
}
