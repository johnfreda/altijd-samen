'use client'

export interface DemoUser {
  id: string
  name: string
  email: string
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('altijdsamen-user')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setDemoUser(user: DemoUser) {
  localStorage.setItem('altijdsamen-user', JSON.stringify(user))
}

export function clearDemoUser() {
  localStorage.removeItem('altijdsamen-user')
}
