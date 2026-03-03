'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TemplateConfig } from '@/lib/templates'

interface Props {
  siteSlug: string
  colors: TemplateConfig['colors']
  fonts: TemplateConfig['fonts']
}

export function PublicRSVPForm({ siteSlug, colors, fonts }: Props) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    attending: '' as '' | 'YES' | 'NO' | 'MAYBE',
    guestCount: 1,
    dietaryNeeds: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.attending) return

    setLoading(true)
    try {
      const res = await fetch(`/api/rsvp/${siteSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // silently fail for now
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating RSVP button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full shadow-lg text-sm font-medium transition-transform hover:scale-105"
        style={{ background: colors.primary, color: colors.background, fontFamily: fonts.body }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        💌 RSVP
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-[10%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-50 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[80vh] overflow-auto"
              style={{ background: colors.background, fontFamily: fonts.body }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">🎉</span>
                  <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: fonts.heading, color: colors.text }}>
                    Bedankt!
                  </h3>
                  <p className="text-sm" style={{ color: colors.text, opacity: 0.7 }}>
                    We hebben jullie RSVP ontvangen.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 px-6 py-2 rounded-lg text-sm"
                    style={{ background: colors.primary, color: colors.background }}
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold" style={{ fontFamily: fonts.heading, color: colors.text }}>
                      RSVP
                    </h3>
                    <button onClick={() => setOpen(false)} className="text-lg" style={{ color: colors.text, opacity: 0.4 }}>
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: colors.text }}>Naam *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm"
                        style={{ borderColor: colors.primary + '30', background: colors.background, color: colors.text }}
                        placeholder="Jullie naam"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: colors.text }}>E-mailadres</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm"
                        style={{ borderColor: colors.primary + '30', background: colors.background, color: colors.text }}
                        placeholder="jullie@email.nl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-2" style={{ color: colors.text }}>Kunnen jullie erbij zijn? *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {([['YES', 'Ja! 🎉'], ['MAYBE', 'Misschien 🤔'], ['NO', 'Helaas 😢']] as const).map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setForm({ ...form, attending: value })}
                            className="px-3 py-2.5 rounded-lg border text-xs font-medium transition-all"
                            style={{
                              borderColor: form.attending === value ? colors.primary : colors.primary + '20',
                              background: form.attending === value ? colors.primary + '10' : 'transparent',
                              color: colors.text,
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.attending === 'YES' && (
                      <div>
                        <label className="text-xs font-medium block mb-1" style={{ color: colors.text }}>Aantal personen</label>
                        <select
                          value={form.guestCount}
                          onChange={e => setForm({ ...form, guestCount: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 rounded-lg border text-sm"
                          style={{ borderColor: colors.primary + '30', background: colors.background, color: colors.text }}
                        >
                          {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'persoon' : 'personen'}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: colors.text }}>Dieetwensen</label>
                      <input
                        type="text"
                        value={form.dietaryNeeds}
                        onChange={e => setForm({ ...form, dietaryNeeds: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm"
                        style={{ borderColor: colors.primary + '30', background: colors.background, color: colors.text }}
                        placeholder="Vegetarisch, glutenvrij, etc."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: colors.text }}>Bericht (optioneel)</label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm resize-none"
                        style={{ borderColor: colors.primary + '30', background: colors.background, color: colors.text }}
                        rows={3}
                        placeholder="Een lief berichtje..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !form.name || !form.attending}
                      className="w-full py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                      style={{ background: colors.primary, color: colors.background }}
                    >
                      {loading ? 'Versturen...' : 'Verstuur RSVP'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
