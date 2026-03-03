'use client'

import { motion } from 'framer-motion'
import { Users, UserCheck, UserX, HelpCircle, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Demo RSVP data
const demoRsvps = [
  { id: '1', name: 'Sophie van Dijk', email: 'sophie@email.nl', attending: 'YES' as const, guestCount: 2, plusOneName: 'Mark van Dijk', dietaryNeeds: 'Vegetarisch', message: 'Wat leuk! We kijken ernaar uit!', submittedAt: '2026-02-28' },
  { id: '2', name: 'Daan Janssen', email: 'daan@email.nl', attending: 'YES' as const, guestCount: 1, plusOneName: null, dietaryNeeds: null, message: 'Ik ben erbij!', submittedAt: '2026-02-27' },
  { id: '3', name: 'Lisa de Groot', email: 'lisa@email.nl', attending: 'MAYBE' as const, guestCount: 1, plusOneName: null, dietaryNeeds: 'Glutenvrij', message: 'Probeer mijn werk te verplaatsen', submittedAt: '2026-02-26' },
  { id: '4', name: 'Thomas Bakker', email: 'thomas@email.nl', attending: 'NO' as const, guestCount: 0, plusOneName: null, dietaryNeeds: null, message: 'Helaas, we zijn op vakantie. Veel plezier!', submittedAt: '2026-02-25' },
  { id: '5', name: 'Eva Peters', email: 'eva@email.nl', attending: 'YES' as const, guestCount: 2, plusOneName: 'Jan Peters', dietaryNeeds: null, message: null, submittedAt: '2026-02-24' },
]

const statusConfig = {
  YES: { label: 'Ja', color: 'bg-sage/20 text-sage', icon: UserCheck },
  NO: { label: 'Nee', color: 'bg-destructive/10 text-destructive', icon: UserX },
  MAYBE: { label: 'Misschien', color: 'bg-gold/20 text-gold', icon: HelpCircle },
}

export default function RSVPDashboard() {
  const yes = demoRsvps.filter(r => r.attending === 'YES')
  const no = demoRsvps.filter(r => r.attending === 'NO')
  const maybe = demoRsvps.filter(r => r.attending === 'MAYBE')
  const totalGuests = demoRsvps.reduce((acc, r) => acc + r.guestCount, 0)

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-warm-black">RSVP Beheer</h1>
          <p className="text-warm-gray text-sm mt-1">Anna & Pieter — {demoRsvps.length} reacties</p>
        </div>
        <Button variant="outline" className="gap-1.5 border-sand">
          <Download className="w-4 h-4" />
          Exporteer CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Ja', value: yes.length, guests: yes.reduce((a, r) => a + r.guestCount, 0), icon: UserCheck, color: 'text-sage bg-sage/10' },
          { label: 'Nee', value: no.length, guests: 0, icon: UserX, color: 'text-destructive bg-destructive/10' },
          { label: 'Misschien', value: maybe.length, guests: maybe.reduce((a, r) => a + r.guestCount, 0), icon: HelpCircle, color: 'text-gold bg-gold/10' },
          { label: 'Totaal gasten', value: totalGuests, guests: null, icon: Users, color: 'text-rose bg-rose/10' },
        ].map(stat => (
          <Card key={stat.label} className="border-sand shadow-sm">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-semibold text-warm-black">{stat.value}</p>
              <p className="text-xs text-warm-muted">{stat.label}</p>
              {stat.guests !== null && stat.guests > 0 && (
                <p className="text-xs text-warm-muted mt-0.5">({stat.guests} gasten totaal)</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visual breakdown */}
      <Card className="border-sand shadow-sm mb-8">
        <CardContent className="p-5">
          <div className="flex h-4 rounded-full overflow-hidden">
            <div className="bg-sage" style={{ width: `${(yes.length / demoRsvps.length) * 100}%` }} />
            <div className="bg-gold" style={{ width: `${(maybe.length / demoRsvps.length) * 100}%` }} />
            <div className="bg-destructive/60" style={{ width: `${(no.length / demoRsvps.length) * 100}%` }} />
          </div>
          <div className="flex gap-6 mt-3 text-xs text-warm-muted">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-sage" /> Ja ({yes.length})</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gold" /> Misschien ({maybe.length})</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive/60" /> Nee ({no.length})</span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-sand shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Alle reacties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand text-left">
                  <th className="pb-3 font-medium text-warm-muted">Naam</th>
                  <th className="pb-3 font-medium text-warm-muted">Status</th>
                  <th className="pb-3 font-medium text-warm-muted">Gasten</th>
                  <th className="pb-3 font-medium text-warm-muted hidden sm:table-cell">Dieet</th>
                  <th className="pb-3 font-medium text-warm-muted hidden md:table-cell">Bericht</th>
                  <th className="pb-3 font-medium text-warm-muted">Datum</th>
                </tr>
              </thead>
              <tbody>
                {demoRsvps.map((rsvp, i) => {
                  const status = statusConfig[rsvp.attending]
                  return (
                    <motion.tr
                      key={rsvp.id}
                      className="border-b border-sand/50"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-warm-black">{rsvp.name}</p>
                          <p className="text-xs text-warm-muted">{rsvp.email}</p>
                          {rsvp.plusOneName && <p className="text-xs text-warm-muted">+ {rsvp.plusOneName}</p>}
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge className={`${status.color} border-0 text-xs`}>{status.label}</Badge>
                      </td>
                      <td className="py-3 text-warm-gray">{rsvp.guestCount}</td>
                      <td className="py-3 text-warm-gray hidden sm:table-cell">{rsvp.dietaryNeeds || '—'}</td>
                      <td className="py-3 text-warm-gray hidden md:table-cell max-w-[200px] truncate">{rsvp.message || '—'}</td>
                      <td className="py-3 text-warm-muted text-xs">{new Date(rsvp.submittedAt).toLocaleDateString('nl-NL')}</td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dietary summary */}
      <Card className="border-sand shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Dieetwensen</CardTitle>
        </CardHeader>
        <CardContent>
          {demoRsvps.filter(r => r.dietaryNeeds).length > 0 ? (
            <ul className="space-y-2">
              {demoRsvps.filter(r => r.dietaryNeeds).map(r => (
                <li key={r.id} className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-warm-black">{r.name}</span>
                  <Badge variant="secondary" className="text-xs">{r.dietaryNeeds}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-warm-muted">Geen dieetwensen opgegeven.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
