'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: '/#templates', label: 'Templates' },
    { href: '/#features', label: 'Functies' },
    { href: '/pricing', label: 'Prijzen' },
    { href: '/#faq', label: 'FAQ' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Heart className="w-5 h-5 text-rose fill-rose group-hover:scale-110 transition-transform" />
            <span className="font-serif text-xl font-semibold text-warm-black tracking-tight">
              Altijd Samen
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-warm-gray hover:text-warm-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-warm-gray">
                Inloggen
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-warm-black hover:bg-warm-black/90 text-ivory">
                Begin gratis
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ivory border-b border-sand"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm text-warm-gray hover:text-warm-black"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-sand flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full">Inloggen</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="w-full bg-warm-black text-ivory">Begin gratis</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
