'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, PenTool, Eye, Users, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { templates } from '@/lib/templates'
import { cn } from '@/lib/utils'

interface Site {
  id: string
  title: string
  slug: string
  templateId: string
  published: boolean
  updatedAt: string
  _count: { rsvpResponses: number; photos: number }
}

export default function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newPartner1, setNewPartner1] = useState('')
  const [newPartner2, setNewPartner2] = useState('')
  const [newTemplate, setNewTemplate] = useState('eternal-bloom')
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetch('/api/sites', { headers: { 'x-user-id': 'demo-user' } })
      .then(r => r.json())
      .then(setSites)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const createSite = async () => {
    if (!newPartner1 || !newPartner2) return
    setCreating(true)
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': 'demo-user' },
        body: JSON.stringify({ partner1Name: newPartner1, partner2Name: newPartner2, templateId: newTemplate }),
      })
      if (res.ok) {
        const site = await res.json()
        setSites(prev => [{ ...site, _count: { rsvpResponses: 0, photos: 0 } }, ...prev])
        setDialogOpen(false)
        setNewPartner1('')
        setNewPartner2('')
      }
    } catch {} finally {
      setCreating(false)
    }
  }

  const totalRsvps = sites.reduce((a, s) => a + s._count.rsvpResponses, 0)

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-warm-black">Dashboard</h1>
          <p className="text-warm-gray text-sm mt-1">Beheer jullie trouwwebsite</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-warm-black hover:bg-warm-black/90 text-ivory gap-2">
              <Plus className="w-4 h-4" />
              Nieuwe website
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Nieuwe trouwwebsite</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Partner 1</Label>
                <Input value={newPartner1} onChange={e => setNewPartner1(e.target.value)} placeholder="Anna" className="mt-1 border-sand" />
              </div>
              <div>
                <Label>Partner 2</Label>
                <Input value={newPartner2} onChange={e => setNewPartner2(e.target.value)} placeholder="Pieter" className="mt-1 border-sand" />
              </div>
              <div>
                <Label className="mb-2 block">Template</Label>
                <div className="grid grid-cols-3 gap-2">
                  {templates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setNewTemplate(t.id)}
                      className={cn(
                        'p-2 rounded-lg border text-xs text-center transition-all',
                        newTemplate === t.id ? 'border-gold bg-gold/5 ring-1 ring-gold' : 'border-sand hover:border-warm-muted'
                      )}
                    >
                      <div className="flex gap-0.5 justify-center mb-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.colors.primary }} />
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.colors.accent }} />
                      </div>
                      <span>{t.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={createSite} disabled={creating || !newPartner1 || !newPartner2} className="w-full bg-warm-black hover:bg-warm-black/90 text-ivory">
                {creating ? 'Aanmaken...' : 'Website aanmaken'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Websites', value: sites.length, icon: Eye },
          { label: 'RSVP\'s', value: totalRsvps, icon: Users },
          { label: 'Gepubliceerd', value: sites.filter(s => s.published).length, icon: Eye },
        ].map((stat) => (
          <Card key={stat.label} className="border-sand shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-rose" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-warm-black">{stat.value}</p>
                <p className="text-xs text-warm-muted">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sites */}
      <h2 className="font-serif text-xl font-semibold text-warm-black mb-4">Jullie websites</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2].map(i => (
            <Card key={i} className="border-sand animate-pulse">
              <CardContent className="p-6 h-48" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sites.map((site) => {
            const template = templates.find(t => t.id === site.templateId)
            return (
              <motion.div key={site.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-sand shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif text-lg">{site.title}</CardTitle>
                        <p className="text-xs text-warm-muted mt-0.5">{site.slug}.altijdsamen.nl</p>
                      </div>
                      <Badge variant={site.published ? 'default' : 'secondary'} className={site.published ? 'bg-sage/20 text-sage border-0' : ''}>
                        {site.published ? 'Live' : 'Concept'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-warm-muted mb-4">
                      <span>Template: {template?.name || site.templateId}</span>
                      <span>·</span>
                      <span>{site._count.rsvpResponses} RSVP&apos;s</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/editor/${site.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full gap-1.5 border-sand">
                          <PenTool className="w-3.5 h-3.5" />
                          Bewerken
                        </Button>
                      </Link>
                      <Link href={`/${site.slug}`} target="_blank">
                        <Button variant="outline" size="sm" className="gap-1.5 border-sand">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          {/* Add site card */}
          <Card
            className="border-sand border-dashed hover:border-rose/30 transition-colors cursor-pointer"
            onClick={() => setDialogOpen(true)}
          >
            <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-rose" />
              </div>
              <p className="font-serif text-lg font-medium text-warm-black mb-1">Nieuwe website</p>
              <p className="text-xs text-warm-muted">Begin met een nieuw template</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
