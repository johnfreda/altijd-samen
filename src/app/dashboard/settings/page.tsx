'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <h1 className="font-serif text-3xl font-semibold text-warm-black mb-8">Instellingen</h1>

      <div className="space-y-6">
        <Card className="border-sand shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm">Naam</Label>
              <Input defaultValue="Anna & Pieter" className="mt-1 border-sand" />
            </div>
            <div>
              <Label className="text-sm">E-mailadres</Label>
              <Input defaultValue="anna@email.nl" className="mt-1 border-sand" />
            </div>
            <Button className="bg-warm-black hover:bg-warm-black/90 text-ivory">Opslaan</Button>
          </CardContent>
        </Card>

        <Card className="border-sand shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Domein</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-warm-gray mb-4">
              Jouw website is bereikbaar op:
            </p>
            <div className="p-3 rounded-lg bg-linen text-sm font-mono text-warm-black">
              anna-en-pieter.altijdsamen.nl
            </div>
            <p className="text-xs text-warm-muted mt-3">
              Upgrade naar Deluxe voor een eigen domeinnaam.
            </p>
          </CardContent>
        </Card>

        <Card className="border-sand shadow-sm border-destructive/20">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-destructive">Gevarenzone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-warm-gray mb-4">
              Website verwijderen? Dit kan niet ongedaan gemaakt worden.
            </p>
            <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/5">
              Website verwijderen
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
