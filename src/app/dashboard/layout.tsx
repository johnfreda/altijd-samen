'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Heart, LayoutDashboard, PenTool, Users, Settings, CreditCard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getDemoUser, clearDemoUser, type DemoUser } from '@/lib/demo-auth'

const sidebarItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overzicht' },
  { href: '/dashboard/settings', icon: Settings, label: 'Instellingen' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Abonnement' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<DemoUser | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const u = getDemoUser()
    if (!u) {
      router.push('/login')
    } else {
      setUser(u)
    }
    setChecked(true)
  }, [router])

  const handleLogout = () => {
    clearDemoUser()
    router.push('/')
  }

  if (!checked || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-6 h-6 border-2 border-rose border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-linen border-r border-sand">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose fill-rose" />
            <span className="font-serif text-lg font-semibold text-warm-black">Altijd Samen</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-white text-warm-black font-medium shadow-sm'
                    : 'text-warm-gray hover:text-warm-black hover:bg-white/50'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-sand">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm font-medium text-warm-black truncate">{user.name}</p>
            <p className="text-xs text-warm-muted truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-warm-gray hover:text-warm-black hover:bg-white/50 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-ivory">
        {children}
      </main>
    </div>
  )
}
