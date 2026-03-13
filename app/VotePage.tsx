'use client'

import { useState, useEffect, useCallback } from 'react'
import { YEARS, Year } from '@/lib/data'

type Stats = {
  counts: Record<string, number>
  total: number
}

const STORAGE_KEY = 'palace_peak_vote'
const POLL_INTERVAL = 10000

function getPeakYear(counts: Record<string, number>): string | null {
  let max = 0
  let peak: string | null = null
  for (const [year, count] of Object.entries(counts)) {
    if (count > max) {
      max = count
      peak = year
    }
  }
  return peak
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-GB')
}

export default function VotePage({ initialStats, years }: { initialStats: Stats; years: Year[] }) {
  const [stats, setStats] = useState<Stats>(initialStats)
  const [votedYear, setVotedYear] = useState<string | null>(null)
  const [voting, setVoting] = useState(false)
  const [justVoted, setJustVoted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setVotedYear(stored)
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/votes', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch {}
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchStats, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchStats])

  async function handleVote(year: string) {
    if (votedYear || voting) return
    setVoting(true)
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year }),
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
        setVotedYear(year)
        setJustVoted(true)
        localStorage.setItem(STORAGE_KEY, year)
        setTimeout(() => setJustVoted(false), 2000)
      }
    } catch {}
    setVoting(false)
  }

  const peakYear = getPeakYear(stats.counts)
  const maxVotes = Math.max(...Object.values(stats.counts), 1)
  const realYears = years.filter(y => !y.fictional)
  const fictionYears = years.filter(y => y.fictional)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Hero */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '2.5rem 2rem 2rem',
        position: 'sticky',
        top: 0,
        background: 'var(--bg)',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: '0.4rem' }}>
              Palace Skateboards
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}>
              When did<br />Palace peak?
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: '0.25rem' }}>
              The answer
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              transition: 'all 0.4s ease',
            }}>
              {peakYear ?? '—'}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-2)', marginTop: '0.2rem' }}>
              {formatNumber(stats.total)} vote{stats.total !== 1 ? 's' : ''} cast
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 2rem 4rem' }}>

        {/* Voted notice */}
        {votedYear && (
          <div style={{
            background: 'var(--bg-3)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: 'var(--text-2)',
          }}>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>Your vote: {votedYear}</span>
            <span style={{ color: 'var(--text-3)' }}>—</span>
            <span>One vote per visitor. Results update live every 10s.</span>
          </div>
        )}

        {/* Section: Real years */}
        <SectionLabel text="Real years — 2012 to 2026" />
        <div>
          {realYears.map((y, i) => (
            <YearRow
              key={y.year}
              year={y}
              votes={stats.counts[y.year] || 0}
              maxVotes={maxVotes}
              total={stats.total}
              isVoted={votedYear === y.year}
              hasVoted={!!votedYear}
              voting={voting}
              onVote={() => handleVote(y.year)}
              isLast={i === realYears.length - 1}
            />
          ))}
        </div>

        {/* Section: Fictional years */}
        <SectionLabel text="Fictional future years — 2027 to 2030" style={{ marginTop: '2rem' }} />
        <div>
          {fictionYears.map((y, i) => (
            <YearRow
              key={y.year}
              year={y}
              votes={stats.counts[y.year] || 0}
              maxVotes={maxVotes}
              total={stats.total}
              isVoted={votedYear === y.year}
              hasVoted={!!votedYear}
              voting={voting}
              onVote={() => handleVote(y.year)}
              isLast={i === fictionYears.length - 1}
              fictional
            />
          ))}
        </div>

        <footer style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--text-2)', lineHeight: 1.8 }}>
          <p>Fan project. Not affiliated with Palace Skateboards.</p>
          <p>Years 2027–2030 are fictional speculation. Brands listed are not confirmed collaborators.</p>
          <p style={{ marginTop: '0.5rem' }}>{formatNumber(stats.total)} total votes &bull; Results update every 10 seconds</p>
        </footer>
      </main>
    </div>
  )
}

function SectionLabel({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.55rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-2)',
      marginBottom: '0.75rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      ...style,
    }}>
      {text}
    </div>
  )
}

function YearRow({
  year,
  votes,
  maxVotes,
  total,
  isVoted,
  hasVoted,
  voting,
  onVote,
  isLast,
  fictional,
}: {
  year: Year
  votes: number
  maxVotes: number
  total: number
  isVoted: boolean
  hasVoted: boolean
  voting: boolean
  onVote: () => void
  isLast: boolean
  fictional?: boolean
}) {
  const pct = total > 0 ? ((votes / total) * 100).toFixed(1) : '0.0'
  const barWidth = maxVotes > 0 ? (votes / maxVotes) * 100 : 0

  return (
    <div
      onClick={!hasVoted && !voting ? onVote : undefined}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 110px',
        alignItems: 'center',
        gap: '1rem',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
        padding: '0.9rem 0.6rem',
        cursor: hasVoted ? 'default' : 'pointer',
        borderLeft: isVoted ? '3px solid var(--text)' : '3px solid transparent',
        background: isVoted ? 'var(--bg-2)' : 'transparent',
        transition: 'background 0.15s, border-left-color 0.2s',
        borderRadius: 2,
      }}
      onMouseEnter={e => {
        if (!hasVoted) (e.currentTarget as HTMLDivElement).style.background = '#141414'
      }}
      onMouseLeave={e => {
        if (!isVoted) (e.currentTarget as HTMLDivElement).style.background = 'transparent'
        else (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-2)'
      }}
    >
      {/* Year */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: fictional ? 'var(--text-2)' : 'var(--text)',
      }}>
        {year.year}
        {fictional && (
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.5rem', letterSpacing: '0.12em', color: 'var(--text-2)', textTransform: 'uppercase', marginTop: '0.15rem' }}>fictional</span>
        )}
      </div>

      {/* Brands + bar */}
      <div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          color: isVoted ? 'var(--text)' : 'var(--text-2)',
          lineHeight: 1.6,
          marginBottom: '0.5rem',
        }}>
          {year.brands.join(' · ')}
        </div>
        <div style={{ height: 2, background: 'var(--bar-bg)', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${barWidth}%`,
            background: fictional ? '#555' : 'var(--text)',
            borderRadius: 1,
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* Votes + button */}
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-2)', marginBottom: '0.15rem' }}>
          {formatNumber(votes)} vote{votes !== 1 ? 's' : ''}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: isVoted ? 'var(--text)' : 'var(--text-2)', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
          {pct}%
        </div>
        {!hasVoted ? (
          <button
            onClick={e => { e.stopPropagation(); onVote() }}
            disabled={voting}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              borderRadius: 3,
              padding: '0.3rem 0.6rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: voting ? 'wait' : 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--text)'
              el.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--border)'
              el.style.color = 'var(--text-2)'
            }}
          >
            vote
          </button>
        ) : isVoted ? (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text)',
            border: '1px solid var(--text)',
            borderRadius: 3,
            padding: '0.3rem 0.6rem',
            display: 'inline-block',
          }}>
            ✓ voted
          </div>
        ) : (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-2)',
          }}>
            voted
          </div>
        )}
      </div>
    </div>
  )
}