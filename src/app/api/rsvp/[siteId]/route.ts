import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/rsvp/:siteId — alle RSVP responses ophalen (dashboard)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params

  // Verifieer dat site bestaat
  const site = await prisma.weddingSite.findUnique({ where: { id: siteId } })
  if (!site) {
    return NextResponse.json({ error: 'Site niet gevonden' }, { status: 404 })
  }

  const responses = await prisma.rSVPResponse.findMany({
    where: { siteId },
    orderBy: { submittedAt: 'desc' },
  })

  const stats = {
    total: responses.length,
    yes: responses.filter(r => r.attending === 'YES').length,
    no: responses.filter(r => r.attending === 'NO').length,
    maybe: responses.filter(r => r.attending === 'MAYBE').length,
    totalGuests: responses.reduce((acc, r) => acc + r.guestCount, 0),
    dietary: responses.filter(r => r.dietaryNeeds).map(r => ({
      name: r.name,
      needs: r.dietaryNeeds,
    })),
  }

  return NextResponse.json({ responses, stats })
}

// POST /api/rsvp/:siteId — RSVP invullen (publieke site)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params
  const body = await req.json()

  // Zoek site op ID of slug
  let site = await prisma.weddingSite.findUnique({ where: { id: siteId } })
  if (!site) {
    site = await prisma.weddingSite.findUnique({ where: { slug: siteId } })
  }
  if (!site) {
    return NextResponse.json({ error: 'Site niet gevonden' }, { status: 404 })
  }

  const {
    name,
    email,
    phone,
    attending,
    plusOne = false,
    plusOneName,
    guestCount = 1,
    dietaryNeeds,
    message,
    ceremony = true,
    reception = true,
    party = true,
  } = body

  if (!name || !attending) {
    return NextResponse.json({ error: 'Naam en status zijn verplicht' }, { status: 400 })
  }

  if (!['YES', 'NO', 'MAYBE'].includes(attending)) {
    return NextResponse.json({ error: 'Ongeldige status' }, { status: 400 })
  }

  const response = await prisma.rSVPResponse.create({
    data: {
      siteId: site.id,
      name,
      email,
      phone,
      attending,
      plusOne,
      plusOneName,
      guestCount: attending === 'NO' ? 0 : guestCount,
      dietaryNeeds,
      message,
      ceremony,
      reception,
      party,
    },
  })

  return NextResponse.json(response, { status: 201 })
}
