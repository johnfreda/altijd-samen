'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-rose fill-rose" />
            <span className="font-serif text-2xl font-semibold text-warm-black">Altijd Samen</span>
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-warm-black mb-2">Account aanmaken</h1>
          <p className="text-warm-gray text-sm">Begin vandaag nog met jullie trouwwebsite</p>
        </div>

        <div className="bg-white rounded-xl border border-sand p-8 shadow-sm">
          <Button variant="outline" className="w-full h-11 border-sand hover:bg-sand/30 mb-4">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Registreer met Google
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-warm-muted">
              of met email
            </span>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm text-warm-black">Jullie namen</Label>
              <Input id="name" placeholder="Anna & Pieter" className="mt-1 border-sand" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm text-warm-black">E-mailadres</Label>
              <Input id="email" type="email" placeholder="jullie@email.nl" className="mt-1 border-sand" />
            </div>
            <Button className="w-full h-11 bg-warm-black hover:bg-warm-black/90 text-ivory">
              Account aanmaken
            </Button>
          </form>

          <p className="text-center text-xs text-warm-muted mt-6">
            Al een account?{' '}
            <Link href="/login" className="text-rose hover:underline">Inloggen</Link>
          </p>
        </div>

        <p className="text-center text-xs text-warm-muted mt-4">
          Door een account aan te maken ga je akkoord met onze{' '}
          <Link href="/terms" className="underline">voorwaarden</Link>{' '}
          en{' '}
          <Link href="/privacy" className="underline">privacybeleid</Link>.
        </p>
      </motion.div>
    </div>
  )
}
