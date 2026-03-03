'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function LoginPage() {
  const router = useRouter()

  const handleDemo = () => {
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
          <h1 className="font-serif text-3xl font-semibold text-warm-black mb-2">Welkom terug</h1>
          <p className="text-warm-gray text-sm">Log in om verder te werken aan jullie trouwwebsite</p>
        </div>

        <div className="bg-white rounded-xl border border-sand p-8 shadow-sm">
          <Button
            onClick={handleDemo}
            className="w-full h-11 bg-rose hover:bg-rose/90 text-white mb-4 font-medium"
          >
            🚀 Direct naar dashboard (demo)
          </Button>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-warm-muted">
              Google login komt binnenkort
            </span>
          </div>

          <p className="text-center text-sm text-warm-muted">
            In de demo-modus kun je alles uitproberen: websites maken, de editor gebruiken, en RSVP&apos;s bekijken.
          </p>

          <p className="text-center text-xs text-warm-muted mt-6">
            Nog geen account?{' '}
            <Link href="/register" className="text-rose hover:underline">Maak er een aan</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
