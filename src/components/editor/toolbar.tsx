'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Monitor, Tablet, Smartphone, Save, Globe, Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface Props {
  onSave: () => Promise<void>
  saving: boolean
}

export function EditorToolbar({ onSave, saving }: Props) {
  const { siteId } = useParams<{ siteId: string }>()
  const { partner1Name, partner2Name, previewMode, setPreviewMode, isDirty } = useEditorStore()
  const [publishing, setPublishing] = useState(false)

  const publish = async () => {
    if (!siteId || siteId === 'demo') return
    setPublishing(true)
    try {
      await onSave()
      await fetch(`/api/sites/${siteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      })
    } catch {} finally {
      setPublishing(false)
    }
  }

  const modes = [
    { id: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { id: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { id: 'mobile' as const, icon: Smartphone, label: 'Mobiel' },
  ]

  return (
    <div className="h-14 bg-white border-b border-sand flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1.5 text-warm-gray">
            <ArrowLeft className="w-4 h-4" />
            Terug
          </Button>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
          <span className="font-serif font-medium text-warm-black">
            {partner1Name} & {partner2Name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-linen rounded-lg p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setPreviewMode(mode.id)}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              previewMode === mode.id ? 'bg-white shadow-sm text-warm-black' : 'text-warm-muted hover:text-warm-gray'
            )}
            title={mode.label}
          >
            <mode.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-sand"
          onClick={onSave}
          disabled={saving || !isDirty}
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? 'Opslaan...' : isDirty ? 'Opslaan' : 'Opgeslagen'}
        </Button>
        <Button
          size="sm"
          className="gap-1.5 bg-warm-black hover:bg-warm-black/90 text-ivory"
          onClick={publish}
          disabled={publishing}
        >
          {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
          Publiceer
        </Button>
      </div>
    </div>
  )
}
