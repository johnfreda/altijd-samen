import { prisma } from '@/lib/prisma'
import { templates, defaultSections } from '@/lib/templates'
import { TemplateRenderer } from '@/components/templates/renderer'
import type { WeddingSection, TemplateConfig } from '@/lib/templates'
import { notFound } from 'next/navigation'
import { PublicRSVPForm } from '@/components/public/rsvp-form'

export const revalidate = 3600 // Hervalideer elk uur

export default async function WeddingSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Probeer uit database te laden
  const site = await prisma.weddingSite.findUnique({
    where: { slug },
  }).catch(() => null)

  if (site) {
    const sections = (site.sections as unknown as WeddingSection[]) || defaultSections
    const colors = (site.colorScheme as unknown as TemplateConfig['colors']) || templates[0].colors
    const fonts = (site.fontPair as unknown as TemplateConfig['fonts']) || templates[0].fonts

    return (
      <>
        <TemplateRenderer
          templateId={site.templateId}
          partner1={site.partner1Name}
          partner2={site.partner2Name}
          date={site.weddingDate?.toISOString().split('T')[0] || ''}
          venue={site.weddingVenue || ''}
          city={site.weddingCity || ''}
          sections={sections.filter(s => s.visible)}
          colors={colors}
          fonts={fonts}
        />
        {/* Floating RSVP knop voor publieke sites */}
        <PublicRSVPForm siteSlug={slug} colors={colors} fonts={fonts} />
      </>
    )
  }

  // Fallback demo sites
  const demoSites: Record<string, { partner1: string; partner2: string; date: string; venue: string; city: string; templateId: string }> = {
    'anna-en-pieter': { partner1: 'Anna', partner2: 'Pieter', date: '2026-06-12', venue: 'Kasteel de Haar', city: 'Utrecht', templateId: 'eternal-bloom' },
    'emma-en-lucas': { partner1: 'Emma', partner2: 'Lucas', date: '2026-09-12', venue: 'De Hortus', city: 'Amsterdam', templateId: 'garden-party' },
    'sophie-en-daan': { partner1: 'Sophie', partner2: 'Daan', date: '2026-08-20', venue: 'Villa Augustus', city: 'Dordrecht', templateId: 'mediterranean-sun' },
  }

  const demo = demoSites[slug]
  if (!demo) notFound()

  const template = templates.find(t => t.id === demo.templateId) || templates[0]

  return (
    <TemplateRenderer
      templateId={demo.templateId}
      partner1={demo.partner1}
      partner2={demo.partner2}
      date={demo.date}
      venue={demo.venue}
      city={demo.city}
      sections={defaultSections}
      colors={template.colors}
      fonts={template.fonts}
    />
  )
}
