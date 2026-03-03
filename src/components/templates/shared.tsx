'use client'

import { motion } from 'framer-motion'
import type { TemplateConfig, WeddingSection } from '@/lib/templates'

// Shared animation variants
export const sectionFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
}

// Format date nicely in Dutch
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Countdown component
export function Countdown({ date }: { date: string }) {
  if (!date) return null
  const target = new Date(date)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return (
    <div className="flex items-center gap-1 text-sm opacity-70">
      <span>Nog {days} {days === 1 ? 'dag' : 'dagen'}</span>
    </div>
  )
}

// RSVP form (shared across templates)
export function RSVPForm({ colors, fonts }: { colors: TemplateConfig['colors'], fonts: TemplateConfig['fonts'] }) {
  return (
    <form className="max-w-md mx-auto space-y-4" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Jullie naam"
        className="w-full px-4 py-3 rounded-lg border text-sm"
        style={{ borderColor: colors.primary + '30', fontFamily: fonts.body, background: colors.background }}
      />
      <input
        type="email"
        placeholder="E-mailadres"
        className="w-full px-4 py-3 rounded-lg border text-sm"
        style={{ borderColor: colors.primary + '30', fontFamily: fonts.body, background: colors.background }}
      />
      <div className="flex gap-3">
        {['Ja, ik kom!', 'Nee, helaas'].map(option => (
          <button
            key={option}
            type="button"
            className="flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors hover:opacity-80"
            style={{
              borderColor: colors.primary + '30',
              fontFamily: fonts.body,
              color: colors.text,
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Eventueel een bericht of dieetwensen..."
        rows={3}
        className="w-full px-4 py-3 rounded-lg border text-sm resize-none"
        style={{ borderColor: colors.primary + '30', fontFamily: fonts.body, background: colors.background }}
      />
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
        style={{ background: colors.primary, color: colors.background, fontFamily: fonts.body }}
      >
        Verstuur RSVP
      </button>
    </form>
  )
}

// Decorative divider
export function Divider({ color, style = 'line' }: { color: string, style?: 'line' | 'dots' | 'flourish' }) {
  if (style === 'dots') {
    return (
      <div className="flex justify-center gap-2 py-8">
        {[0,1,2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: color + '40' }} />
        ))}
      </div>
    )
  }
  if (style === 'flourish') {
    return (
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="h-px w-16" style={{ background: color + '30' }} />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: color + '50' }}>
          <path d="M10 2C10 2 12 6 12 10C12 14 10 18 10 18C10 18 8 14 8 10C8 6 10 2 10 2Z" fill="currentColor" />
          <path d="M2 10C2 10 6 8 10 8C14 8 18 10 18 10C18 10 14 12 10 12C6 12 2 10 2 10Z" fill="currentColor" />
        </svg>
        <div className="h-px w-16" style={{ background: color + '30' }} />
      </div>
    )
  }
  return (
    <div className="flex justify-center py-8">
      <div className="h-px w-24" style={{ background: color + '30' }} />
    </div>
  )
}

// Section wrapper
export function Section({ children, bg, id }: { children: React.ReactNode, bg?: string, id?: string }) {
  return (
    <motion.section
      id={id}
      className="px-6 py-16 sm:py-24"
      style={{ background: bg }}
      {...sectionFade}
    >
      {children}
    </motion.section>
  )
}
