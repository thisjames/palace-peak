import { NextResponse } from 'next/server'
import { getAllStats } from '@/lib/kv'

export const revalidate = 0

export async function GET() {
  try {
    const stats = await getAllStats()
    return NextResponse.json(stats)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 })
  }
}
