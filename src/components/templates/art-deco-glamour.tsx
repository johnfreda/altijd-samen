'use client'

import { motion } from 'framer-motion'
import type { TemplateProps } from './renderer'
import { RSVPForm, formatDate, Countdown } from './shared'

// Art deco geometric border
function DecoLine({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="h-px w-8" style={{ background: color }} />
      <div className="w-2 h-2 rotate-45" style={{ border: `1px solid ${color}` }} />
      <div className="h-px w-16" style={{ background: color }} />
      <div className="w-3 h-3 rotate-45" style={{ border: `1px solid ${color}` }} />
      <div className="h-px w-16" style={{ background: color }} />
      <div className="w-2 h-2 rotate-45" style={{ border: `1px solid ${color}` }} />
      <div className="h-px w-8" style={{ background: color }} />
    </div>
  )
}

// Geometric corner decoration
function DecoCorner({ color, className }: { color: string, className?: string }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M5 5H55V55" stroke={color} strokeWidth="1" fill="none" />
      <path d="M10 10H50V50" stroke={color} strokeWidth="0.5" fill="none" />
      <rect x="2" y="2" width="6" height="6" fill={color} />
    </svg>
  )
}

export function ArtDecoGlamour({ partner1, partner2, date, venue, city, sections, colors, fonts }: TemplateProps) {
  const getSection = (type: string) => sections.find(s => s.type === type)
  const gold = colors.primary // Gold is the primary in this template

  return (
    <div style={{ background: colors.background, color: colors.text, fontFamily: fonts.body }}>
      {/* Hero — grand entrance */}
      {getSection('hero') && (
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 relative">
          <DecoCorner color={gold + '40'} className="absolute top-6 left-6" />
          <DecoCorner color={gold + '40'} className="absolute top-6 right-6 -scale-x-100" />
          <DecoCorner color={gold + '40'} className="absolute bottom-6 left-6 -scale-y-100" />
          <DecoCorner color={gold + '40'} className="absolute bottom-6 right-6 scale-[-1]" />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <DecoLine color={gold + '50'} />
            <p className="text-xs tracking-[0.5em] uppercase my-6" style={{ color: gold }}>
              {(getSection('hero')?.content.subtitle as string) || 'Request the honour of your presence'}
            </p>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-wider mb-2" style={{ fontFamily: fonts.heading, color: gold }}>
              {partner1}
            </h1>
            <p className="text-2xl my-3" style={{ color: gold + '60' }}>✦</p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-wider" style={{ fontFamily: fonts.heading, color: gold }}>
              {partner2}
            </h1>

            <div className="mt-8">
              <DecoLine color={gold + '50'} />
            </div>

            {date && <p className="text-sm tracking-[0.2em] uppercase mt-6" style={{ color: gold + '80' }}>{formatDate(date)}</p>}
            {(venue || city) && <p className="text-xs mt-2" style={{ opacity: 0.4 }}>{[venue, city].filter(Boolean).join(' · ')}</p>}
            {date && <div className="mt-4"><Countdown date={date} /></div>}
          </motion.div>
        </section>
      )}

      {/* Story */}
      {getSection('story') && (
        <motion.section
          className="px-6 py-20"
          style={{ background: colors.secondary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <DecoLine color={gold + '30'} />
            <h2 className="text-3xl sm:text-4xl tracking-wider my-6" style={{ fontFamily: fonts.heading, color: gold }}>
              {(getSection('story')?.content.heading as string) || 'Ons Verhaal'}
            </h2>
            {((getSection('story')?.content.paragraphs as string[]) || []).map((p, i) => (
              <p key={i} className="leading-relaxed mb-4" style={{ opacity: 0.7 }}>
                {p}
              </p>
            ))}
            <DecoLine color={gold + '30'} />
          </div>
        </motion.section>
      )}

      {/* Details */}
      {getSection('details') && (
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl tracking-wider mb-12" style={{ fontFamily: fonts.heading, color: gold }}>
              {(getSection('details')?.content.heading as string) || 'The Celebration'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {['ceremony', 'reception', 'party'].map(key => {
                const detail = (getSection('details')?.content[key] as Record<string, string>) || {}
                return (
                  <div key={key} className="p-6 relative" style={{ border: `1px solid ${gold}20` }}>
                    <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
                    <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
                    <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
                    <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
                    <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: gold + '60' }}>{detail.title || key}</p>
                    <p className="text-3xl font-light mb-1" style={{ color: gold, fontFamily: fonts.heading }}>{detail.time || ''}</p>
                    <p className="text-sm" style={{ opacity: 0.5 }}>{detail.location || ''}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Schedule */}
      {getSection('schedule') && (
        <section className="px-6 py-20" style={{ background: colors.secondary }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl tracking-wider mb-12" style={{ fontFamily: fonts.heading, color: gold }}>
              {(getSection('schedule')?.content.heading as string) || 'Het Programma'}
            </h2>
            {((getSection('schedule')?.content.items as Array<{time: string, title: string, description: string}>) || []).map((item, i) => (
              <div key={i} className="flex items-center gap-6 py-3">
                <span className="text-sm w-16 text-right" style={{ color: gold }}>{item.time}</span>
                <span style={{ color: gold + '40' }}>✦</span>
                <span className="text-left">{item.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RSVP */}
      {getSection('rsvp') && (
        <section className="px-6 py-20">
          <div className="max-w-md mx-auto text-center">
            <DecoLine color={gold + '40'} />
            <h2 className="text-3xl tracking-wider my-6" style={{ fontFamily: fonts.heading, color: gold }}>RSVP</h2>
            <p className="text-sm mb-8" style={{ opacity: 0.6 }}>
              {(getSection('rsvp')?.content.description as string) || ''}
            </p>
            <RSVPForm colors={colors} fonts={fonts} />
          </div>
        </section>
      )}

      {getSection('gifts') && (
        <section className="px-6 py-16 text-center" style={{ background: colors.secondary }}>
          <h2 className="text-2xl tracking-wider mb-4" style={{ fontFamily: fonts.heading, color: gold }}>
            {(getSection('gifts')?.content.heading as string) || 'Registry'}
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ opacity: 0.6 }}>
            {(getSection('gifts')?.content.description as string) || ''}
          </p>
        </section>
      )}

      <div className="py-12 text-center">
        <DecoLine color={gold + '20'} />
        <p className="text-xs mt-4" style={{ color: gold + '30' }}>{partner1} ✦ {partner2}</p>
      </div>
    </div>
  )
}
