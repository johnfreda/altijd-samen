'use client'

import { useEditorStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { templates, colorPresets } from '@/lib/templates'
import { cn } from '@/lib/utils'

const fontOptions = [
  { heading: 'Playfair Display', body: 'Lato' },
  { heading: 'Cormorant Garamond', body: 'DM Sans' },
  { heading: 'Libre Caslon Display', body: 'Inter' },
  { heading: 'Poiret One', body: 'Raleway' },
  { heading: 'Fraunces', body: 'Source Sans 3' },
  { heading: 'Space Mono', body: 'DM Sans' },
]

export function EditorProperties() {
  const {
    templateId, partner1Name, partner2Name, weddingDate, weddingVenue, weddingCity,
    colorScheme, fontPair, selectedSectionId, sections,
    setTemplate, setPartnerNames, setWeddingDate, setWeddingVenue, setWeddingCity,
    setColorScheme, setFontPair, updateSection,
  } = useEditorStore()

  const selectedSection = sections.find(s => s.id === selectedSectionId)

  return (
    <div className="w-72 bg-white border-l border-sand flex flex-col overflow-auto">
      <div className="p-4 border-b border-sand">
        <h3 className="font-serif text-sm font-semibold text-warm-black">
          {selectedSection ? selectedSection.title : 'Eigenschappen'}
        </h3>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-auto">
        {/* General settings when no section selected */}
        {!selectedSection && (
          <>
            {/* Template */}
            <div>
              <Label className="text-xs font-medium text-warm-black mb-2 block">Template</Label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={cn(
                      'p-2 rounded-lg border text-left transition-all text-xs',
                      templateId === t.id
                        ? 'border-gold bg-gold/5 ring-1 ring-gold'
                        : 'border-sand hover:border-warm-muted'
                    )}
                  >
                    <div className="flex gap-1 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ background: t.colors.primary }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: t.colors.accent }} />
                    </div>
                    <span className="font-medium">{t.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Names */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-warm-black block">Namen</Label>
              <Input
                value={partner1Name}
                onChange={e => setPartnerNames(e.target.value, partner2Name)}
                placeholder="Partner 1"
                className="border-sand text-sm h-9"
              />
              <Input
                value={partner2Name}
                onChange={e => setPartnerNames(partner1Name, e.target.value)}
                placeholder="Partner 2"
                className="border-sand text-sm h-9"
              />
            </div>

            {/* Date & Location */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-warm-black block">Datum & Locatie</Label>
              <Input
                type="date"
                value={weddingDate}
                onChange={e => setWeddingDate(e.target.value)}
                className="border-sand text-sm h-9"
              />
              <Input
                value={weddingVenue}
                onChange={e => setWeddingVenue(e.target.value)}
                placeholder="Locatie"
                className="border-sand text-sm h-9"
              />
              <Input
                value={weddingCity}
                onChange={e => setWeddingCity(e.target.value)}
                placeholder="Stad"
                className="border-sand text-sm h-9"
              />
            </div>

            {/* Colors */}
            <div>
              <Label className="text-xs font-medium text-warm-black mb-2 block">Kleurenschema</Label>
              <div className="space-y-2">
                {colorPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setColorScheme(preset.colors)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-xs text-left transition-all',
                      JSON.stringify(colorScheme) === JSON.stringify(preset.colors)
                        ? 'border-gold bg-gold/5'
                        : 'border-sand hover:border-warm-muted'
                    )}
                  >
                    <div className="flex gap-1">
                      {Object.values(preset.colors).slice(0, 3).map((c, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ background: c }} />
                      ))}
                    </div>
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom colors */}
              <div className="mt-3 space-y-2">
                {Object.entries(colorScheme).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={e => setColorScheme({ ...colorScheme, [key]: e.target.value })}
                      className="w-7 h-7 rounded border border-sand cursor-pointer"
                    />
                    <span className="text-xs text-warm-gray capitalize flex-1">{key}</span>
                    <span className="text-xs text-warm-muted font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fonts */}
            <div>
              <Label className="text-xs font-medium text-warm-black mb-2 block">Lettertype</Label>
              <div className="space-y-2">
                {fontOptions.map(font => (
                  <button
                    key={font.heading}
                    onClick={() => setFontPair({ heading: font.heading, body: font.body })}
                    className={cn(
                      'w-full px-3 py-2.5 rounded-lg border text-left transition-all',
                      fontPair.heading === font.heading
                        ? 'border-gold bg-gold/5'
                        : 'border-sand hover:border-warm-muted'
                    )}
                  >
                    <span className="text-sm block" style={{ fontFamily: font.heading }}>
                      {font.heading}
                    </span>
                    <span className="text-xs text-warm-muted" style={{ fontFamily: font.body }}>
                      {font.body} (body)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Section-specific properties */}
        {selectedSection && (
          <div className="space-y-4">
            <button
              onClick={() => useEditorStore.getState().selectSection(null)}
              className="text-xs text-rose hover:underline"
            >
              ← Terug naar algemeen
            </button>

            {selectedSection.type === 'hero' && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-warm-black">Subtitel</Label>
                  <Input
                    value={(selectedSection.content.subtitle as string) || ''}
                    onChange={e => updateSection(selectedSection.id, { subtitle: e.target.value })}
                    className="mt-1 border-sand text-sm h-9"
                  />
                </div>
              </div>
            )}

            {selectedSection.type === 'story' && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-warm-black">Titel</Label>
                  <Input
                    value={(selectedSection.content.heading as string) || ''}
                    onChange={e => updateSection(selectedSection.id, { heading: e.target.value })}
                    className="mt-1 border-sand text-sm h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs text-warm-black">Verhaal</Label>
                  <Textarea
                    value={((selectedSection.content.paragraphs as string[]) || []).join('\n\n')}
                    onChange={e => updateSection(selectedSection.id, { paragraphs: e.target.value.split('\n\n') })}
                    className="mt-1 border-sand text-sm min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {selectedSection.type === 'rsvp' && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-warm-black">Beschrijving</Label>
                  <Textarea
                    value={(selectedSection.content.description as string) || ''}
                    onChange={e => updateSection(selectedSection.id, { description: e.target.value })}
                    className="mt-1 border-sand text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-warm-black">Deadline</Label>
                  <Input
                    type="date"
                    value={(selectedSection.content.deadline as string) || ''}
                    onChange={e => updateSection(selectedSection.id, { deadline: e.target.value })}
                    className="mt-1 border-sand text-sm h-9"
                  />
                </div>
              </div>
            )}

            {(selectedSection.type === 'details' || selectedSection.type === 'schedule' || selectedSection.type === 'gifts' || selectedSection.type === 'custom') && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-warm-black">Titel</Label>
                  <Input
                    value={(selectedSection.content.heading as string) || ''}
                    onChange={e => updateSection(selectedSection.id, { heading: e.target.value })}
                    className="mt-1 border-sand text-sm h-9"
                  />
                </div>
                {selectedSection.type === 'custom' && (
                  <div>
                    <Label className="text-xs text-warm-black">Tekst</Label>
                    <Textarea
                      value={(selectedSection.content.text as string) || ''}
                      onChange={e => updateSection(selectedSection.id, { text: e.target.value })}
                      className="mt-1 border-sand text-sm min-h-[100px]"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
