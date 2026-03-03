'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus, PenTool, Eye, Users, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  // Demo data
  const sites = [
    {
      id: 'demo',
      title: 'Anna & Pieter',
      slug: 'anna-en-pieter',
      template: 'Eternal Bloom',
      published: true,
      rsvpCount: 42,
      views: 156,
      updatedAt: '2 uur geleden',
    },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-warm-black">Dashboard</h1>
          <p className="text-warm-gray text-sm mt-1">Beheer jullie trouwwebsite</p>
        </div>
        <Button className="bg-warm-black hover:bg-warm-black/90 text-ivory gap-2">
          <Plus className="w-4 h-4" />
          Nieuwe website
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Bezoekers', value: '156', icon: Eye },
          { label: 'RSVP\'s', value: '42', icon: Users },
          { label: 'Bevestigd', value: '38', icon: Users },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sites.map((site) => (
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
                  <span>Template: {site.template}</span>
                  <span>·</span>
                  <span>{site.rsvpCount} RSVP&apos;s</span>
                  <span>·</span>
                  <span>{site.updatedAt}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/editor/${site.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1.5 border-sand">
                      <PenTool className="w-3.5 h-3.5" />
                      Bewerken
                    </Button>
                  </Link>
                  <Link href={`/${site.slug}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 border-sand">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add site card */}
        <Card className="border-sand border-dashed hover:border-rose/30 transition-colors cursor-pointer">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-rose" />
            </div>
            <p className="font-serif text-lg font-medium text-warm-black mb-1">Nieuwe website</p>
            <p className="text-xs text-warm-muted">Begin met een nieuw template</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
