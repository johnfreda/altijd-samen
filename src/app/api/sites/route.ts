import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { defaultSections, templates } from '@/lib/templates'

// GET /api/sites — lijst van sites (voor dashboard)
export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id') || 'demo-user'

  const sites = await prisma.weddingSite.findMany({
    where: { userId },
    include: {
      _count: { select: { rsvpResponses: true, photos: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json(sites)
}

// POST /api/sites — nieuwe site aanmaken
export async function POST(req: NextRequest) {
  const body = await req.json()
  const userId = req.headers.get('x-user-id') || 'demo-user'

  const {
    partner1Name,
    partner2Name,
    templateId = 'eternal-bloom',
  } = body

  // Genereer slug
  const baseSlug = `${partner1Name}-en-${partner2Name}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  // Check of slug al bestaat
  let slug = baseSlug
  let counter = 1
  while (await prisma.weddingSite.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const template = templates.find(t => t.id === templateId) || templates[0]

  // Zorg dat user bestaat
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: `${userId}@altijdsamen.nl`,
      name: `${partner1Name} & ${partner2Name}`,
    },
  })

  const site = await prisma.weddingSite.create({
    data: {
      userId,
      slug,
      title: `${partner1Name} & ${partner2Name}`,
      partner1Name,
      partner2Name,
      templateId,
      colorScheme: template.colors,
      fontPair: template.fonts,
      sections: defaultSections as unknown as import("@prisma/client").Prisma.InputJsonValue,
    },
  })

  return NextResponse.json(site, { status: 201 })
}
