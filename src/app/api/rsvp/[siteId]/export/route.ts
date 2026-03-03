import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/rsvp/:siteId/export — CSV export
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params

  const responses = await prisma.rSVPResponse.findMany({
    where: { siteId },
    orderBy: { submittedAt: 'desc' },
  })

  const headers = ['Naam', 'Email', 'Telefoon', 'Status', 'Aantal gasten', 'Plus-one', 'Dieetwensen', 'Bericht', 'Ceremonie', 'Receptie', 'Feest', 'Datum']
  const rows = responses.map(r => [
    r.name,
    r.email || '',
    r.phone || '',
    r.attending === 'YES' ? 'Ja' : r.attending === 'NO' ? 'Nee' : 'Misschien',
    r.guestCount.toString(),
    r.plusOneName || '',
    r.dietaryNeeds || '',
    r.message || '',
    r.ceremony ? 'Ja' : 'Nee',
    r.reception ? 'Ja' : 'Nee',
    r.party ? 'Ja' : 'Nee',
    new Date(r.submittedAt).toLocaleDateString('nl-NL'),
  ])

  const csv = [headers.join(';'), ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(';'))].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="rsvp-export-${siteId}.csv"`,
    },
  })
}
