'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDemo = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Maak demo user aan via API
    const userId = `demo-${Date.now()}`
    localStorage.setItem('altijdsamen-user', JSON.stringify({ id: userId, name: name || 'Demo', email: email || 'demo@altijdsamen.nl' }))
    router.push('/dashboard')
  }

  const handleDemoQuick = () => {
    localStorage.setItem('altijdsamen-user', JSON.stringify({ id: 'demo-user', name: 'Demo Gebruiker', email: 'demo@altijdsamen.nl' }))
    router.push('/dashboard')
  }

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
          {/* Quick demo button */}
          <Button
            onClick={handleDemoQuick}
            className="w-full h-11 bg-rose hover:bg-rose/90 text-white mb-4 font-medium"
          >
            🚀 Direct starten (demo)
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-warm-muted">
              of met jullie gegevens
            </span>
          </div>

          <form onSubmit={handleDemo} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm text-warm-black">Jullie namen</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Anna & Pieter" className="mt-1 border-sand" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm text-warm-black">E-mailadres</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jullie@email.nl" className="mt-1 border-sand" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-warm-black hover:bg-warm-black/90 text-ivory">
              {loading ? 'Bezig...' : 'Account aanmaken'}
            </Button>
          </form>

          <p className="text-center text-xs text-warm-muted mt-6">
            Al een account?{' '}
            <Link href="/login" className="text-rose hover:underline">Inloggen</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
