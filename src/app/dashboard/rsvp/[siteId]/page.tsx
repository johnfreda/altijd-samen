'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Users, UserCheck, UserX, HelpCircle, Download, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface RSVPResponse {
  id: string
  name: string
  email: string | null
  phone: string | null
  attending: 'YES' | 'NO' | 'MAYBE'
  guestCount: number
  plusOneName: string | null
  dietaryNeeds: string | null
  message: string | null
  submittedAt: string
}

interface Stats {
  total: number
  yes: number
  no: number
  maybe: number
  totalGuests: number
  dietary: { name: string; needs: string | null }[]
}

const statusConfig = {
  YES: { label: 'Ja', color: 'bg-sage/20 text-sage' },
  NO: { label: 'Nee', color: 'bg-destructive/10 text-destructive' },
  MAYBE: { label: 'Misschien', color: 'bg-gold/20 text-gold' },
}

export default function RSVPDashboard() {
  const { siteId } = useParams<{ siteId: string }>()
  const [responses, setResponses] = useState<RSVPResponse[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/rsvp/${siteId}`)
      .then(r => r.json())
      .then(data => {
        setResponses(data.responses || [])
        setStats(data.stats || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [siteId])

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-warm-muted" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-warm-black">RSVP Beheer</h1>
          <p className="text-warm-gray text-sm mt-1">{stats?.total || 0} reacties</p>
        </div>
        <a href={`/api/rsvp/${siteId}/export`} download>
          <Button variant="outline" className="gap-1.5 border-sand">
            <Download className="w-4 h-4" />
            Exporteer CSV
          </Button>
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Ja', value: stats?.yes || 0, icon: UserCheck, color: 'text-sage bg-sage/10' },
          { label: 'Nee', value: stats?.no || 0, icon: UserX, color: 'text-destructive bg-destructive/10' },
          { label: 'Misschien', value: stats?.maybe || 0, icon: HelpCircle, color: 'text-gold bg-gold/10' },
          { label: 'Totaal gasten', value: stats?.totalGuests || 0, icon: Users, color: 'text-rose bg-rose/10' },
        ].map(stat => (
          <Card key={stat.label} className="border-sand shadow-sm">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-semibold text-warm-black">{stat.value}</p>
              <p className="text-xs text-warm-muted">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      {stats && stats.total > 0 && (
        <Card className="border-sand shadow-sm mb-8">
          <CardContent className="p-5">
            <div className="flex h-4 rounded-full overflow-hidden bg-sand/50">
              {stats.yes > 0 && <div className="bg-sage transition-all" style={{ width: `${(stats.yes / stats.total) * 100}%` }} />}
              {stats.maybe > 0 && <div className="bg-gold transition-all" style={{ width: `${(stats.maybe / stats.total) * 100}%` }} />}
              {stats.no > 0 && <div className="bg-destructive/60 transition-all" style={{ width: `${(stats.no / stats.total) * 100}%` }} />}
            </div>
            <div className="flex gap-6 mt-3 text-xs text-warm-muted">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-sage" /> Ja ({stats.yes})</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gold" /> Misschien ({stats.maybe})</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive/60" /> Nee ({stats.no})</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {responses.length > 0 ? (
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
                  {responses.map((rsvp, i) => {
                    const status = statusConfig[rsvp.attending]
                    return (
                      <motion.tr
                        key={rsvp.id}
                        className="border-b border-sand/50"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <td className="py-3">
                          <p className="font-medium text-warm-black">{rsvp.name}</p>
                          {rsvp.email && <p className="text-xs text-warm-muted">{rsvp.email}</p>}
                          {rsvp.plusOneName && <p className="text-xs text-warm-muted">+ {rsvp.plusOneName}</p>}
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
      ) : (
        <Card className="border-sand shadow-sm">
          <CardContent className="p-12 text-center">
            <Users className="w-10 h-10 text-warm-muted mx-auto mb-3" />
            <h3 className="font-serif text-lg font-medium text-warm-black mb-1">Nog geen RSVP&apos;s</h3>
            <p className="text-sm text-warm-muted">Zodra gasten reageren verschijnen ze hier.</p>
          </CardContent>
        </Card>
      )}

      {/* Dietary */}
      {stats && stats.dietary.length > 0 && (
        <Card className="border-sand shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Dieetwensen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stats.dietary.map((d, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-warm-black">{d.name}</span>
                  <Badge variant="secondary" className="text-xs">{d.needs}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
