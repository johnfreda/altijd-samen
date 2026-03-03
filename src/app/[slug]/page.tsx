import { TemplateRenderer } from '@/components/templates/renderer'
import { templates, defaultSections } from '@/lib/templates'

// Demo site data — in production this comes from database
const demoSites: Record<string, {
  partner1: string
  partner2: string
  date: string
  venue: string
  city: string
  templateId: string
}> = {
  'anna-en-pieter': {
    partner1: 'Anna',
    partner2: 'Pieter',
    date: '2026-06-12',
    venue: 'Kasteel de Haar',
    city: 'Utrecht',
    templateId: 'eternal-bloom',
  },
  'emma-en-lucas': {
    partner1: 'Emma',
    partner2: 'Lucas',
    date: '2026-09-12',
    venue: 'De Hortus',
    city: 'Amsterdam',
    templateId: 'garden-party',
  },
  'sophie-en-daan': {
    partner1: 'Sophie',
    partner2: 'Daan',
    date: '2026-08-20',
    venue: 'Villa Augustus',
    city: 'Dordrecht',
    templateId: 'mediterranean-sun',
  },
}

export function generateStaticParams() {
  return Object.keys(demoSites).map(slug => ({ slug }))
}

export default async function WeddingSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const site = demoSites[slug]

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold text-warm-black mb-2">Website niet gevonden</h1>
          <p className="text-warm-gray">Deze trouwwebsite bestaat niet of is niet gepubliceerd.</p>
        </div>
      </div>
    )
  }

  const template = templates.find(t => t.id === site.templateId) || templates[0]

  return (
    <TemplateRenderer
      templateId={site.templateId}
      partner1={site.partner1}
      partner2={site.partner2}
      date={site.date}
      venue={site.venue}
      city={site.city}
      sections={defaultSections}
      colors={template.colors}
      fonts={template.fonts}
    />
  )
}
