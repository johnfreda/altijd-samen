'use client'

import { GripVertical, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import { useEditorStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sectionIcons: Record<string, string> = {
  hero: '🌸',
  story: '💕',
  details: '📍',
  schedule: '📋',
  rsvp: '💌',
  gifts: '🎁',
  gallery: '📸',
  countdown: '⏳',
}

export function EditorSidebar() {
  const { sections, selectedSectionId, selectSection, toggleSectionVisibility, removeSection, reorderSections } = useEditorStore()

  return (
    <div className="w-64 bg-white border-r border-sand flex flex-col">
      <div className="p-4 border-b border-sand">
        <h3 className="font-serif text-sm font-semibold text-warm-black">Secties</h3>
      </div>

      <div className="flex-1 overflow-auto p-2 space-y-1">
        {sections.map((section, index) => (
          <div
            key={section.id}
            onClick={() => selectSection(section.id)}
            className={cn(
              'group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm',
              selectedSectionId === section.id
                ? 'bg-rose/10 text-warm-black'
                : 'text-warm-gray hover:bg-linen',
              !section.visible && 'opacity-50'
            )}
          >
            <GripVertical className="w-3.5 h-3.5 text-warm-muted cursor-grab flex-shrink-0" />
            <span className="text-base flex-shrink-0">{sectionIcons[section.type] || '📄'}</span>
            <span className="flex-1 truncate">{section.title}</span>

            <div className="hidden group-hover:flex items-center gap-0.5">
              <button
                onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(section.id) }}
                className="p-1 rounded hover:bg-white/80"
              >
                {section.visible ? (
                  <Eye className="w-3.5 h-3.5 text-warm-muted" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-warm-muted" />
                )}
              </button>
              {section.type !== 'hero' && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeSection(section.id) }}
                  className="p-1 rounded hover:bg-white/80"
                >
                  <Trash2 className="w-3.5 h-3.5 text-warm-muted hover:text-destructive" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-sand">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 border-sand text-warm-gray"
          onClick={() => {
            const newSection = {
              id: `section-${Date.now()}`,
              type: 'custom',
              title: 'Nieuwe sectie',
              visible: true,
              content: { heading: 'Nieuwe sectie', text: 'Voeg hier jullie tekst toe.' },
            }
            useEditorStore.getState().addSection(newSection)
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          Sectie toevoegen
        </Button>
      </div>
    </div>
  )
}
