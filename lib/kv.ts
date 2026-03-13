import { Redis } from '@upstash/redis'

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export const VOTE_KEY = (year: string) => `votes:${year}`
export const TOTAL_KEY = 'votes:total'

export async function getVoteCounts(): Promise<Record<string, number>> {
  const { YEARS } = await import('./data')
  const keys = YEARS.map(y => VOTE_KEY(y.year))
  const values = await kv.mget<number[]>(...keys)
  const result: Record<string, number> = {}
  YEARS.forEach((y, i) => {
    result[y.year] = (values[i] as number) || 0
  })
  return result
}

export async function castVote(year: string): Promise<{ success: boolean; counts: Record<string, number>; total: number }> {
  await kv.incr(VOTE_KEY(year))
  await kv.incr(TOTAL_KEY)
  const [counts, total] = await Promise.all([
    getVoteCounts(),
    kv.get<number>(TOTAL_KEY),
  ])
  return { success: true, counts, total: total || 0 }
}

export async function getAllStats(): Promise<{ counts: Record<string, number>; total: number }> {
  const [counts, total] = await Promise.all([
    getVoteCounts(),
    kv.get<number>(TOTAL_KEY),
  ])
  return { counts, total: (total as number) || 0 }
}
