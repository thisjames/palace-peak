import { NextRequest, NextResponse } from 'next/server'
import { castVote } from '@/lib/kv'
import { YEARS } from '@/lib/data'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { year } = await req.json()

    const validYear = YEARS.find(y => y.year === year)
    if (!validYear) {
      return NextResponse.json({ error: 'Invalid year' }, { status: 400 })
    }

    const result = await castVote(year)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 })
  }
}
