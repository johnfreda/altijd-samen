'use client'

import { motion } from 'framer-motion'
import type { TemplateProps } from './renderer'
import { RSVPForm, formatDate, Countdown } from './shared'

// Botanical illustration
function Botanical({ color }: { color: string }) {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="inline-block">
      <path d="M20 5C20 5 10 15 10 30C10 45 20 55 20 55" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M20 5C20 5 30 15 30 30C30 45 20 55 20 55" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M20 15C15 15 12 20 14 25" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M20 15C25 15 28 20 26 25" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M20 25C16 27 14 32 16 36" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M20 25C24 27 26 32 24 36" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
    </svg>
  )
}

// Confetti dots
function Confetti({ colors: cols }: { colors: string[] }) {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    color: cols[i % cols.length],
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            opacity: 0.15,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 3, delay: dot.delay }}
        />
      ))}
    </div>
  )
}

export function GardenParty({ partner1, partner2, date, venue, city, sections, colors, fonts }: TemplateProps) {
  const getSection = (type: string) => sections.find(s => s.type === type)

  return (
    <div style={{ background: colors.background, color: colors.text, fontFamily: fonts.body }}>
      {/* Hero — playful with confetti */}
      {getSection('hero') && (
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
          <Confetti colors={[colors.primary, colors.accent, colors.primary + '80']} />

          <motion.div className="relative z-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <Botanical color={colors.primary} />
            <p className="text-sm tracking-[0.2em] uppercase mt-4 mb-4" style={{ color: colors.accent }}>
              🌿 {(getSection('hero')?.content.subtitle as string) || 'Wij gaan trouwen!'} 🌿
            </p>

            <h1 className="text-5xl sm:text-7xl font-bold mb-2" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              {partner1}
            </h1>
            <p className="text-xl my-2" style={{ color: colors.accent }}>♥</p>
            <h1 className="text-5xl sm:text-7xl font-bold" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              {partner2}
            </h1>

            {date && (
              <div className="mt-8">
                <p className="text-base font-medium" style={{ color: colors.accent }}>{formatDate(date)}</p>
                <Countdown date={date} />
              </div>
            )}
            {(venue || city) && (
              <p className="text-sm mt-2" style={{ opacity: 0.6 }}>📍 {[venue, city].filter(Boolean).join(' · ')}</p>
            )}
          </motion.div>
        </section>
      )}

      {/* Story */}
      {getSection('story') && (
        <motion.section
          className="px-6 py-16 sm:py-24"
          style={{ background: `linear-gradient(180deg, ${colors.secondary}, ${colors.background})` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              {(getSection('story')?.content.heading as string) || 'Hoe Wij Elkaar Ontmoetten'} 💕
            </h2>
            <div className="flex justify-center gap-2 mb-8">
              {['🌸', '🌿', '🌸'].map((e, i) => <span key={i} className="text-sm">{e}</span>)}
            </div>
            {((getSection('story')?.content.paragraphs as string[]) || []).map((p, i) => (
              <p key={i} className="leading-relaxed mb-4" style={{ opacity: 0.8 }}>
                {p}
              </p>
            ))}
          </div>
        </motion.section>
      )}

      {/* Details */}
      {getSection('details') && (
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              🎉 De Dag
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['ceremony', 'reception', 'party'].map(key => {
                const detail = (getSection('details')?.content[key] as Record<string, string>) || {}
                const emoji = key === 'ceremony' ? '💒' : key === 'reception' ? '🥂' : '💃'
                return (
                  <motion.div
                    key={key}
                    className="p-6 rounded-2xl"
                    style={{ background: colors.secondary }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <span className="text-2xl mb-2 block">{emoji}</span>
                    <h3 className="font-bold mb-1" style={{ fontFamily: fonts.heading, color: colors.primary }}>
                      {detail.title || key}
                    </h3>
                    <p className="text-xl font-light" style={{ color: colors.accent }}>{detail.time || ''}</p>
                    <p className="text-sm mt-1" style={{ opacity: 0.6 }}>{detail.location || ''}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Schedule */}
      {getSection('schedule') && (
        <section className="px-6 py-16" style={{ background: colors.secondary }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              📋 Het Programma
            </h2>
            <div className="space-y-3">
              {((getSection('schedule')?.content.items as Array<{time: string, title: string, description: string}>) || []).map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: colors.background }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-sm font-bold w-14 text-right" style={{ color: colors.accent }}>{item.time}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                  <div className="text-left flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-xs" style={{ opacity: 0.5 }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {getSection('rsvp') && (
        <section className="px-6 py-16 relative overflow-hidden">
          <Confetti colors={[colors.primary + '40', colors.accent + '40']} />
          <div className="max-w-md mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              💌 RSVP
            </h2>
            <p className="text-sm mb-8" style={{ opacity: 0.7 }}>
              {(getSection('rsvp')?.content.description as string) || 'Laat ons weten of jullie erbij zijn!'}
            </p>
            <RSVPForm colors={colors} fonts={fonts} />
          </div>
        </section>
      )}

      {getSection('gifts') && (
        <section className="px-6 py-16 text-center" style={{ background: colors.secondary }}>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: fonts.heading, color: colors.primary }}>
            🎁 {(getSection('gifts')?.content.heading as string) || 'Cadeautips'}
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ opacity: 0.7 }}>
            {(getSection('gifts')?.content.description as string) || ''}
          </p>
        </section>
      )}

      <div className="py-12 text-center">
        <Botanical color={colors.primary} />
        <p className="text-xs mt-2" style={{ opacity: 0.3 }}>{partner1} ♥ {partner2}</p>
      </div>
    </div>
  )
}
