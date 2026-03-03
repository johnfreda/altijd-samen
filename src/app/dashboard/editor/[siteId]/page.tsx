'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useEditorStore } from '@/lib/store'
import { EditorSidebar } from '@/components/editor/sidebar'
import { EditorPreview } from '@/components/editor/preview'
import { EditorProperties } from '@/components/editor/properties'
import { EditorToolbar } from '@/components/editor/toolbar'
import type { WeddingSection, TemplateConfig } from '@/lib/templates'

export default function EditorPage() {
  const { siteId } = useParams<{ siteId: string }>()
  const previewMode = useEditorStore(s => s.previewMode)
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load site data from API
  useEffect(() => {
    if (!siteId || siteId === 'demo') {
      setLoaded(true)
      return
    }

    fetch(`/api/sites/${siteId}`)
      .then(r => r.json())
      .then(site => {
        const store = useEditorStore.getState()
        store.setTemplate(site.templateId)
        store.setPartnerNames(site.partner1Name, site.partner2Name)
        if (site.weddingDate) store.setWeddingDate(new Date(site.weddingDate).toISOString().split('T')[0])
        if (site.weddingVenue) store.setWeddingVenue(site.weddingVenue)
        if (site.weddingCity) store.setWeddingCity(site.weddingCity)
        if (site.sections) store.setSections(site.sections as WeddingSection[])
        if (site.colorScheme) store.setColorScheme(site.colorScheme as TemplateConfig['colors'])
        if (site.fontPair) store.setFontPair(site.fontPair as TemplateConfig['fonts'])
        store.markClean()
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [siteId])

  // Save function
  const save = useCallback(async () => {
    if (!siteId || siteId === 'demo') return
    setSaving(true)
    const state = useEditorStore.getState()
    try {
      await fetch(`/api/sites/${siteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner1Name: state.partner1Name,
          partner2Name: state.partner2Name,
          weddingDate: state.weddingDate || null,
          weddingVenue: state.weddingVenue,
          weddingCity: state.weddingCity,
          templateId: state.templateId,
          colorScheme: state.colorScheme,
          fontPair: state.fontPair,
          sections: state.sections,
        }),
      })
      state.markClean()
    } catch {} finally {
      setSaving(false)
    }
  }, [siteId])

  // Auto-save every 30 seconds when dirty
  useEffect(() => {
    const interval = setInterval(() => {
      if (useEditorStore.getState().isDirty) {
        save()
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [save])

  // Ctrl+S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        save()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [save])

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-linen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-warm-gray">Editor laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-linen">
      <EditorToolbar onSave={save} saving={saving} />
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar />
        <div className="flex-1 flex items-start justify-center overflow-auto p-6 bg-sand/30">
          <div
            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
              previewMode === 'mobile' ? 'w-[375px]' :
              previewMode === 'tablet' ? 'w-[768px]' :
              'w-full max-w-[1200px]'
            }`}
          >
            <EditorPreview />
          </div>
        </div>
        <EditorProperties />
      </div>
    </div>
  )
}
