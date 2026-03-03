'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="font-serif text-3xl font-semibold text-warm-black mb-8">Abonnement</h1>

      <Card className="border-sand shadow-sm mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-lg">Huidig plan</CardTitle>
            <Badge className="bg-sage/20 text-sage border-0">Gratis</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-warm-gray mb-4">
            Je gebruikt het gratis plan. Upgrade voor meer functies.
          </p>
          <div className="flex gap-3">
            <Link href="/pricing">
              <Button className="bg-warm-black hover:bg-warm-black/90 text-ivory">
                Upgrade naar Premium
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-sand shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Wat je mist</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              'Onbeperkt foto\'s uploaden',
              'Alle fonts en kleuren',
              'Geen watermerk',
              'RSVP dashboard & CSV export',
              'Onbeperkt gasten',
              'Wachtwoord beveiliging',
            ].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-warm-gray">
                <Check className="w-4 h-4 text-gold" />
                {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
