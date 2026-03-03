'use client'

import type { WeddingSection, TemplateConfig } from '@/lib/templates'
import { EternalBloom } from './eternal-bloom'
import { ModernMinimalist } from './modern-minimalist'
import { MediterraneanSun } from './mediterranean-sun'
import { NordicGrace } from './nordic-grace'
import { ArtDecoGlamour } from './art-deco-glamour'
import { GardenParty } from './garden-party'

export interface TemplateProps {
  partner1: string
  partner2: string
  date: string
  venue: string
  city: string
  sections: WeddingSection[]
  colors: TemplateConfig['colors']
  fonts: TemplateConfig['fonts']
  isPreview?: boolean
  templateId?: string
}

const templateMap: Record<string, React.ComponentType<TemplateProps>> = {
  'eternal-bloom': EternalBloom,
  'modern-minimalist': ModernMinimalist,
  'mediterranean-sun': MediterraneanSun,
  'nordic-grace': NordicGrace,
  'art-deco-glamour': ArtDecoGlamour,
  'garden-party': GardenParty,
}

export function TemplateRenderer(props: TemplateProps) {
  const Component = templateMap[props.templateId || 'eternal-bloom'] || EternalBloom
  return <Component {...props} />
}
