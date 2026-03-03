import { create } from 'zustand'
import type { WeddingSection, TemplateConfig } from './templates'
import { defaultSections, templates } from './templates'

interface EditorState {
  siteId: string | null
  templateId: string
  partner1Name: string
  partner2Name: string
  weddingDate: string
  weddingVenue: string
  weddingCity: string
  sections: WeddingSection[]
  colorScheme: TemplateConfig['colors']
  fontPair: TemplateConfig['fonts']
  selectedSectionId: string | null
  previewMode: 'desktop' | 'tablet' | 'mobile'
  isDirty: boolean

  // Actions
  setTemplate: (id: string) => void
  setPartnerNames: (p1: string, p2: string) => void
  setWeddingDate: (date: string) => void
  setWeddingVenue: (venue: string) => void
  setWeddingCity: (city: string) => void
  setSections: (sections: WeddingSection[]) => void
  updateSection: (id: string, content: Record<string, unknown>) => void
  toggleSectionVisibility: (id: string) => void
  addSection: (section: WeddingSection) => void
  removeSection: (id: string) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  setColorScheme: (colors: TemplateConfig['colors']) => void
  setFontPair: (fonts: TemplateConfig['fonts']) => void
  selectSection: (id: string | null) => void
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  markClean: () => void
}

export const useEditorStore = create<EditorState>((set) => ({
  siteId: null,
  templateId: 'eternal-bloom',
  partner1Name: 'Anna',
  partner2Name: 'Pieter',
  weddingDate: '',
  weddingVenue: '',
  weddingCity: '',
  sections: defaultSections,
  colorScheme: templates[0].colors,
  fontPair: templates[0].fonts,
  selectedSectionId: null,
  previewMode: 'desktop',
  isDirty: false,

  setTemplate: (id) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      set({
        templateId: id,
        colorScheme: template.colors,
        fontPair: template.fonts,
        isDirty: true,
      })
    }
  },
  setPartnerNames: (p1, p2) => set({ partner1Name: p1, partner2Name: p2, isDirty: true }),
  setWeddingDate: (date) => set({ weddingDate: date, isDirty: true }),
  setWeddingVenue: (venue) => set({ weddingVenue: venue, isDirty: true }),
  setWeddingCity: (city) => set({ weddingCity: city, isDirty: true }),
  setSections: (sections) => set({ sections, isDirty: true }),
  updateSection: (id, content) => set((state) => ({
    sections: state.sections.map(s => s.id === id ? { ...s, content: { ...s.content, ...content } } : s),
    isDirty: true,
  })),
  toggleSectionVisibility: (id) => set((state) => ({
    sections: state.sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s),
    isDirty: true,
  })),
  addSection: (section) => set((state) => ({
    sections: [...state.sections, section],
    isDirty: true,
  })),
  removeSection: (id) => set((state) => ({
    sections: state.sections.filter(s => s.id !== id),
    isDirty: true,
  })),
  reorderSections: (fromIndex, toIndex) => set((state) => {
    const newSections = [...state.sections]
    const [removed] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, removed)
    return { sections: newSections, isDirty: true }
  }),
  setColorScheme: (colors) => set({ colorScheme: colors, isDirty: true }),
  setFontPair: (fonts) => set({ fontPair: fonts, isDirty: true }),
  selectSection: (id) => set({ selectedSectionId: id }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  markClean: () => set({ isDirty: false }),
}))
