import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sites/:siteId — site ophalen
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params

  const site = await prisma.weddingSite.findUnique({
    where: { id: siteId },
    include: {
      photos: { orderBy: { sortOrder: 'asc' } },
      _count: { select: { rsvpResponses: true } },
    },
  })

  if (!site) {
    return NextResponse.json({ error: 'Site niet gevonden' }, { status: 404 })
  }

  return NextResponse.json(site)
}

// PUT /api/sites/:siteId — site bijwerken (editor save)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params
  const body = await req.json()

  const {
    partner1Name,
    partner2Name,
    weddingDate,
    weddingVenue,
    weddingCity,
    templateId,
    colorScheme,
    fontPair,
    sections,
    published,
  } = body

  const site = await prisma.weddingSite.update({
    where: { id: siteId },
    data: {
      ...(partner1Name !== undefined && { partner1Name }),
      ...(partner2Name !== undefined && { partner2Name }),
      ...(weddingDate !== undefined && { weddingDate: weddingDate ? new Date(weddingDate) : null }),
      ...(weddingVenue !== undefined && { weddingVenue }),
      ...(weddingCity !== undefined && { weddingCity }),
      ...(templateId !== undefined && { templateId }),
      ...(colorScheme !== undefined && { colorScheme }),
      ...(fontPair !== undefined && { fontPair }),
      ...(sections !== undefined && { sections }),
      ...(published !== undefined && {
        published,
        ...(published && { publishedAt: new Date() }),
      }),
      title: partner1Name && partner2Name ? `${partner1Name} & ${partner2Name}` : undefined,
    },
  })

  return NextResponse.json(site)
}

// DELETE /api/sites/:siteId
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params

  await prisma.weddingSite.delete({ where: { id: siteId } })

  return NextResponse.json({ ok: true })
}
