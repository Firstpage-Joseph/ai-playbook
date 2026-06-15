import { motion } from 'framer-motion'
import {
  Section, SectionHeading, InView, fadeUp,
  border, blue, blueL, red, fg, fgMuted, gold, fgLight, surfaceD, font,
} from './shared.jsx'

const telcoStats = [
  { v: '19% → 57%', l: 'AI visibility, a 200% increase (all tracked platforms).', c: '#FBD24B' },
  { v: '65%', l: 'mention rate for SIM plan recommendation queries (high-intent prompts).', c: blueL },
  { v: '+20.8%', l: 'average visibility growth across 10 roaming SIM prompts (tracked prompt set).', c: '#4ade80' },
]

const otherCases = [
  {
    tag: 'A leading regional bank',
    metric: '+195%',
    color: blue,
    desc: 'Organic impressions (97K to 287K) while we built AI search readiness across its core banking products through NexSEO\'s prompt-led content frameworks.',
  },
  {
    tag: 'A global logistics leader',
    metric: '+573%',
    color: red,
    desc: 'Organic lead volume year on year on its content platform, using answer-optimised content designed for single, high-intent questions, the same passage-level discipline described in section three.',
  },
]

export default function WinningLooksLike() {
  return (
    <Section id="results" soft>
      <InView>
        <SectionHeading
          chip="05 · WHAT WINNING LOOKS LIKE"
          chipColor={red}
          title="What Winning Looks Like"
          subtitle="The mechanics in this guide are not theoretical. They're the working method behind NexSEO, our AI search visibility programme — and the results are measurable in mentions, citations, and share of voice on the queries that matter."
          maxTitle={680}
        />

        {/* Telco — hero case study */}
        <motion.div
          variants={fadeUp}
          style={{
            background: surfaceD, borderRadius: 18, overflow: 'hidden',
            marginBottom: 18, position: 'relative',
          }}
        >
          <div style={{ height: 4, background: `linear-gradient(90deg, ${red}, ${blue}, ${blueL})`, width: '100%' }} />
          <div style={{ padding: 'clamp(28px,5vw,52px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${fgLight}25`, borderRadius: 100, padding: '6px 16px', marginBottom: 18, background: `${fgLight}10` }}>
              <span style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', color: fgLight, fontWeight: 700 }}>CASE STUDY · SINGAPORE TELCO</span>
            </div>
            <h3 style={{ fontFamily: font, fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 900, color: fgLight, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
              A Singapore Telco: <span style={{ color: '#FBD24B' }}>+200% AI visibility</span>
            </h3>
            <p style={{ fontFamily: font, fontSize: 'clamp(14px,1.5vw,16px)', color: `${fgLight}BB`, lineHeight: 1.7, maxWidth: 760, marginBottom: 14 }}>
              The brand is a challenger competing against larger, better-established incumbents, and when we began, its visibility in AI-generated answers for high-intent queries around roaming and affordability was low. No prior optimisation playbook existed for the category.
            </p>
            <p style={{ fontFamily: font, fontSize: 'clamp(14px,1.5vw,16px)', color: `${fgLight}BB`, lineHeight: 1.7, maxWidth: 760, marginBottom: 32 }}>
              The work followed the logic of this guide. We built topical authority around the high-intent themes where the brand could credibly win, created structured, LLM-optimised content designed to be retrieved passage by passage, strengthened the brand and entity signals engines use to establish trust, and tracked visibility across priority prompts continuously, refining the content against what the engines actually selected.
            </p>

            <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.16em', fontWeight: 700, color: `${fgLight}77`, marginBottom: 16 }}>STAT HIGHLIGHTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px,100%), 1fr))', gap: 16, marginBottom: 28 }}>
              {telcoStats.map((s, i) => (
                <div key={i} style={{ background: `${fgLight}0C`, border: `1px solid ${fgLight}18`, borderRadius: 12, padding: '22px 24px' }}>
                  <div style={{ fontFamily: font, fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 900, color: s.c, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.v}</div>
                  <div style={{ fontFamily: font, fontSize: 13, color: `${fgLight}AA`, lineHeight: 1.55 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.7vw,18px)', color: fgLight, fontWeight: 700, lineHeight: 1.4 }}>
              A challenger brand, recommended ahead of incumbents, on the exact queries where buyers decide.
            </p>
          </div>
        </motion.div>

        {/* Other cases */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 18 }}>
          {otherCases.map((c) => (
            <motion.div key={c.tag} variants={fadeUp} style={{ background: '#FFFFFF', border: `1.5px solid ${border}`, borderRadius: 16, padding: 'clamp(26px,4vw,38px)' }}>
              <div style={{ fontFamily: font, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', color: fgMuted, marginBottom: 14 }}>{c.tag.toUpperCase()}</div>
              <div style={{ fontFamily: font, fontSize: 'clamp(44px,6vw,64px)', fontWeight: 900, color: c.color, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 16 }}>{c.metric}</div>
              <p style={{ fontFamily: font, fontSize: 14.5, color: fgMuted, lineHeight: 1.7 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </InView>
    </Section>
  )
}
