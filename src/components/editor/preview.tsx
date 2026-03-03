'use client'

import { useEditorStore } from '@/lib/store'
import { TemplateRenderer } from '@/components/templates/renderer'

export function EditorPreview() {
  const { templateId, partner1Name, partner2Name, weddingDate, weddingVenue, weddingCity, sections, colorScheme, fontPair } = useEditorStore()

  return (
    <TemplateRenderer
      templateId={templateId}
      partner1={partner1Name}
      partner2={partner2Name}
      date={weddingDate}
      venue={weddingVenue}
      city={weddingCity}
      sections={sections.filter(s => s.visible)}
      colors={colorScheme}
      fonts={fontPair}
      isPreview
    />
  )
}
