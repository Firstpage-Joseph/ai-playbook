import { motion } from 'framer-motion'
import {
  Section, SectionHeading, InView, StatCard, fadeUp,
  bg, surface, border, blue, red, fg, fgMuted, gold, font,
} from './shared.jsx'

const kpis = [
  { val: '80%', color: blue, label: 'Rely on AI-written results', desc: 'of consumers now rely on AI-written results for at least 40% of their searches. (Bain & Company, February 2025)' },
  { val: '15–25%', color: red, label: 'Organic traffic already cut', desc: 'the estimated drop in organic web traffic the shift has already caused. (Bain & Company)' },
  { val: '60%', color: blue, label: 'Searches end without a click', desc: 'roughly 60% of searches now end without the user clicking through to any website at all. (Bain & Company)' },
  { val: '15→8%', color: red, label: 'CTR drop with an AI summary', desc: 'when an AI summary appears, the click-through rate on traditional results drops from 15% to 8%. (Pew Research Center)' },
  { val: '~1%', color: blue, label: 'Click the cited sources', desc: 'the sources cited inside the summary fare even worse: about 1% of users click them. (Pew Research Center)' },
  { val: '34.5%', color: red, label: 'Lost by the #1 result', desc: 'the page ranking first loses 34.5% of its clicks when an AI Overview sits above it. (Ahrefs)' },
]

export default function TrafficCrisis() {
  return (
    <Section id="crisis" soft>
      <InView>
        <SectionHeading
          chip="01 · THE ORGANIC TRAFFIC CRISIS"
          chipColor={red}
          title="Our Organic Traffic Is Down 46.8% Year On Year"
          subtitle="We're an SEO agency, and we're telling you this on page one, because the same thing is happening to your site whether you've noticed or not."
          maxTitle={760}
        />

        {/* Headline stat block */}
        <motion.div
          variants={fadeUp}
          style={{
            background: bg, border: `1.5px solid ${border}`, borderRadius: 16,
            padding: 'clamp(24px,4vw,40px)', marginBottom: 18,
            display: 'flex', gap: 'clamp(20px,4vw,44px)', flexWrap: 'wrap', alignItems: 'center',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: font, fontSize: 'clamp(56px,9vw,104px)', fontWeight: 900, color: red, lineHeight: 0.95, letterSpacing: '-0.04em' }}>
              -46.8%
            </div>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', color: fgMuted, marginTop: 6 }}>
              ORGANIC SEARCH SESSIONS · JAN–JUN 2026 vs 2025
            </div>
          </div>
          <p style={{ flex: 1, minWidth: 280, fontFamily: font, fontSize: 'clamp(14px,1.5vw,16px)', color: fgMuted, lineHeight: 1.7 }}>
            Between January and June 2026, organic search sessions on our own site fell by nearly half compared with the same period in 2025. Our rankings held. The content didn't get worse. What changed is where the answer lives. For a growing share of searches, it now sits on the results page itself, written by AI, and the click that used to follow never happens.
          </p>
        </motion.div>

        {/* KPI grid — 6 cards balance as 3×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%), 1fr))', gap: 18, marginBottom: 36 }}>
          {kpis.map((k) => <StatCard key={k.label} {...k} />)}
        </div>

        {/* Narrative + the turn */}
        <motion.div variants={fadeUp} style={{ maxWidth: 820, margin: '0 auto 28px' }}>
          <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.5vw,17px)', color: fgMuted, lineHeight: 1.75, marginBottom: 18 }}>
            Read those numbers together and the uncomfortable conclusion is hard to avoid. Ranking well no longer guarantees being seen, because the answer engine reads your page, takes what it needs, and serves the conclusion directly. The buyer gets a synthesised answer, usually with a handful of brands recommended by name, and in most cases that's where the journey ends.
          </p>
          <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.5vw,17px)', color: fgMuted, lineHeight: 1.75 }}>
            The traffic didn't vanish, though. It moved upstream, into the answer itself. Buyers are still researching, comparing and deciding. They've simply stopped doing the legwork on your website and started delegating it to ChatGPT, Gemini, Perplexity and Google's AI surfaces.
          </p>
        </motion.div>

        {/* The reframed question */}
        <motion.div
          variants={fadeUp}
          style={{
            background: `linear-gradient(135deg, ${blue}10, ${red}06)`,
            border: `1.5px solid ${blue}30`, borderRadius: 14,
            padding: 'clamp(24px,4vw,40px)', textAlign: 'center', marginBottom: 18,
          }}
        >
          <p style={{ fontFamily: font, fontSize: 'clamp(18px,2.6vw,28px)', fontWeight: 900, color: fg, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            The question that decides who wins your category has changed. It's no longer only{' '}
            <span style={{ color: fgMuted }}>"who ranks?"</span> It's{' '}
            <span style={{ color: blue }}>"who gets recommended?"</span>
          </p>
        </motion.div>

        {/* Our own AI visibility — the trade */}
        <motion.div
          variants={fadeUp}
          style={{
            background: bg, border: `1.5px solid ${border}`, borderRadius: 16,
            padding: 'clamp(24px,4vw,40px)', display: 'flex', flexWrap: 'wrap',
            gap: 'clamp(20px,4vw,40px)', alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 'clamp(20px,4vw,40px)', flexWrap: 'wrap', flexShrink: 0 }}>
            <div>
              <div style={{ fontFamily: font, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: blue, lineHeight: 1, letterSpacing: '-0.03em' }}>65.7%</div>
              <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: fgMuted, marginTop: 6 }}>of answers feature us</div>
            </div>
            <div>
              <div style={{ fontFamily: font, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: gold, lineHeight: 1, letterSpacing: '-0.03em' }}>1.6</div>
              <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: fgMuted, marginTop: 6 }}>average position</div>
            </div>
          </div>
          <p style={{ flex: 1, minWidth: 280, fontFamily: font, fontSize: 'clamp(14px,1.5vw,16px)', color: fgMuted, lineHeight: 1.7 }}>
            Over the same period our sessions fell, our visibility inside AI answers moved sharply the other way. When someone asks an AI about digital marketing agencies in Singapore, we now appear in 65.7% of answers, at an average position of 1.6, ahead of every competitor we track. The clicks we lost to the answer layer came back as recommendations inside it — and that trade is worth far more than the traffic it replaced.
          </p>
        </motion.div>
      </InView>
    </Section>
  )
}
