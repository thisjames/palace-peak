# When did Palace peak?

A live voting site tracking which year Palace Skateboards was at its absolute peak, based on collaboration history from 2012 to 2026 (plus some fictional future years for chaos).

## Stack

- **Next.js 14** (App Router)
- **Vercel KV** (Redis) for vote storage
- **Bebas Neue** + **DM Mono** for that Palace-coded aesthetic
- Deployed on **Vercel**

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create palace-peak --public --push
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Framework will auto-detect as **Next.js**
4. Click **Deploy** (it will fail on first deploy — that's expected, KV not connected yet)

### 3. Connect Vercel KV

1. In your Vercel project dashboard, go to **Storage**
2. Click **Create Database** → **KV**
3. Name it `palace-peak-kv` (or anything)
4. Click **Connect** to link it to your project
5. Vercel auto-injects the four `KV_*` environment variables

### 4. Redeploy

In Vercel dashboard → **Deployments** → click the three dots on the latest → **Redeploy**.

Your site is live. Votes persist in Redis. The peak year answer updates in real time.

---

## Local Development

```bash
npm install
```

To run locally with KV, install the Vercel CLI and pull env vars:

```bash
npm i -g vercel
vercel link
vercel env pull .env.local
npm run dev
```

Without KV connected, the app will start with zero votes and display `—` as the peak year — no errors.

---

## How voting works

- Each visitor gets **one vote**, stored in `localStorage` under the key `palace_peak_vote`
- Votes are stored in Vercel KV as simple integer counters: `votes:2018`, `votes:2019`, etc.
- A total counter `votes:total` is incremented on every vote
- The peak year is determined by whichever year has the most votes (mode, not average)
- Vote counts refresh automatically every 10 seconds via polling

---

## Project structure

```
app/
  layout.tsx        — fonts, metadata, global styles
  globals.css       — CSS variables, dark theme
  page.tsx          — server component, fetches initial vote counts
  VotePage.tsx      — client component, all voting UI and logic
  api/
    votes/route.ts  — GET current counts
    vote/route.ts   — POST cast a vote
lib/
  data.ts           — all years and brand data
  kv.ts             — Vercel KV helpers
```
