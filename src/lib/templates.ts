export interface TemplateConfig {
  id: string
  name: string
  description: string
  style: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  fonts: {
    heading: string
    body: string
    accent?: string
  }
  previewImage: string
}

export const templates: TemplateConfig[] = [
  {
    id: 'eternal-bloom',
    name: 'Eternal Bloom',
    description: 'Romantisch, bloemrijk en zacht. Perfecte keuze voor een dromerige bruiloft.',
    style: 'romantic',
    colors: {
      primary: '#C4918A',
      secondary: '#FDF6F3',
      accent: '#8FA68A',
      text: '#3D2C29',
      background: '#FFFAF8',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lato',
      accent: 'Pinyon Script',
    },
    previewImage: '/templates/eternal-bloom.jpg',
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Strak, veel witruimte en typografie-gedreven. Less is more.',
    style: 'minimal',
    colors: {
      primary: '#1A1A1A',
      secondary: '#F5F5F5',
      accent: '#C4A87C',
      text: '#1A1A1A',
      background: '#FFFFFF',
    },
    fonts: {
      heading: 'Space Mono',
      body: 'DM Sans',
    },
    previewImage: '/templates/modern-minimalist.jpg',
  },
  {
    id: 'mediterranean-sun',
    name: 'Mediterranean Sun',
    description: 'Warm, aards en Italiaans geïnspireerd. Zon, terracotta en olijven.',
    style: 'warm',
    colors: {
      primary: '#C4703F',
      secondary: '#F5EDE4',
      accent: '#7A8B5C',
      text: '#3D2B1F',
      background: '#FFF9F2',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'DM Sans',
    },
    previewImage: '/templates/mediterranean-sun.jpg',
  },
  {
    id: 'nordic-grace',
    name: 'Nordic Grace',
    description: 'Scandinavisch, clean en natuur. Sereniteit in elke pixel.',
    style: 'nordic',
    colors: {
      primary: '#5C7A6B',
      secondary: '#F0EDE8',
      accent: '#A68B6B',
      text: '#2C3E35',
      background: '#FAFAF7',
    },
    fonts: {
      heading: 'Libre Caslon Display',
      body: 'Inter',
    },
    previewImage: '/templates/nordic-grace.jpg',
  },
  {
    id: 'art-deco-glamour',
    name: 'Art Deco Glamour',
    description: '1920s glamour met goud en geometrie. Gatsby zou trots zijn.',
    style: 'glamour',
    colors: {
      primary: '#C4A87C',
      secondary: '#1A1F2E',
      accent: '#E8D5B5',
      text: '#F0E6D3',
      background: '#0F1419',
    },
    fonts: {
      heading: 'Poiret One',
      body: 'Raleway',
    },
    previewImage: '/templates/art-deco-glamour.jpg',
  },
  {
    id: 'garden-party',
    name: 'Garden Party',
    description: 'Speels, kleurrijk en botanisch. Een feestje in de tuin.',
    style: 'playful',
    colors: {
      primary: '#6B8E5A',
      secondary: '#FFF8F0',
      accent: '#D4727A',
      text: '#2D3B2D',
      background: '#FFFCF7',
    },
    fonts: {
      heading: 'Fraunces',
      body: 'Source Sans 3',
    },
    previewImage: '/templates/garden-party.jpg',
  },
]

export interface WeddingSection {
  id: string
  type: string
  title: string
  visible: boolean
  content: Record<string, unknown>
}

export const defaultSections: WeddingSection[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'Hero',
    visible: true,
    content: {
      subtitle: 'Wij gaan trouwen!',
      backgroundImage: '',
    },
  },
  {
    id: 'story',
    type: 'story',
    title: 'Ons Verhaal',
    visible: true,
    content: {
      heading: 'Ons Verhaal',
      paragraphs: [
        'Hier vertellen jullie hoe het allemaal begon...',
        'En hoe jullie wisten dat dit het was.',
      ],
      image: '',
    },
  },
  {
    id: 'details',
    type: 'details',
    title: 'Locatie & Details',
    visible: true,
    content: {
      heading: 'De Details',
      ceremony: {
        title: 'Ceremonie',
        time: '14:00',
        location: '',
        address: '',
      },
      reception: {
        title: 'Receptie',
        time: '16:00',
        location: '',
        address: '',
      },
      party: {
        title: 'Feest',
        time: '19:00',
        location: '',
        address: '',
      },
    },
  },
  {
    id: 'schedule',
    type: 'schedule',
    title: 'Dagprogramma',
    visible: true,
    content: {
      heading: 'Het Programma',
      items: [
        { time: '13:30', title: 'Inloop', description: 'Neem plaats in de ceremonie ruimte' },
        { time: '14:00', title: 'Ceremonie', description: 'Het jawoord' },
        { time: '15:00', title: 'Receptie', description: 'Proosten op de liefde' },
        { time: '17:30', title: 'Diner', description: 'Samen aan tafel' },
        { time: '20:00', title: 'Feest', description: 'Dansen tot in de late uurtjes' },
      ],
    },
  },
  {
    id: 'rsvp',
    type: 'rsvp',
    title: 'RSVP',
    visible: true,
    content: {
      heading: 'RSVP',
      description: 'Laat ons weten of jullie erbij zijn!',
      deadline: '',
    },
  },
  {
    id: 'gifts',
    type: 'gifts',
    title: 'Cadeautips',
    visible: true,
    content: {
      heading: 'Cadeautips',
      description: 'Jullie aanwezigheid is het mooiste cadeau. Willen jullie toch iets geven?',
      links: [],
    },
  },
]

export function getTemplate(id: string): TemplateConfig | undefined {
  return templates.find(t => t.id === id)
}

export const colorPresets = [
  { name: 'Romantic Blush', colors: { primary: '#C4918A', secondary: '#FDF6F3', accent: '#C4A87C', text: '#3D2C29', background: '#FFFAF8' } },
  { name: 'Sage & Gold', colors: { primary: '#8FA68A', secondary: '#F7F3EE', accent: '#C4A87C', text: '#2C2825', background: '#FEFCF9' } },
  { name: 'Midnight Elegance', colors: { primary: '#2D3A4A', secondary: '#1A1F2E', accent: '#C4A87C', text: '#F0E6D3', background: '#0F1419' } },
  { name: 'Coastal Breeze', colors: { primary: '#5B8FA8', secondary: '#F0F7FA', accent: '#E8C07A', text: '#1E3A4A', background: '#FAFEFF' } },
  { name: 'Lavender Dreams', colors: { primary: '#9B8EC4', secondary: '#F5F0FA', accent: '#C4A87C', text: '#2E2845', background: '#FDFAFE' } },
  { name: 'Terracotta', colors: { primary: '#C4703F', secondary: '#F5EDE4', accent: '#7A8B5C', text: '#3D2B1F', background: '#FFF9F2' } },
]
