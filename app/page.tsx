import { getAllStats } from '@/lib/kv'
import { YEARS } from '@/lib/data'
import VotePage from './VotePage'

export const revalidate = 0

export default async function Home() {
  let initialStats = { counts: {} as Record<string, number>, total: 0 }

  try {
    initialStats = await getAllStats()
  } catch (e) {
    // KV not configured yet — start with zeros
    YEARS.forEach(y => { initialStats.counts[y.year] = 0 })
  }

  return <VotePage initialStats={initialStats} years={YEARS} />
}
