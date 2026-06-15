import { motion } from 'framer-motion'
import {
  Section, SectionHeading, InView, fadeUp,
  bg, surface, surfaceD, border, blue, blueL, red, fg, fgMuted, fgDim, gold, fgLight, font,
} from './shared.jsx'

const tableRows = [
  { q: 'who are the most experienced and trusted seo expe…', region: 'SG', platform: 'All', vis: '79.1%', sov: '22.5%', cites: '105' },
  { q: 'who are the most experienced and trusted seo cons…', region: 'SG', platform: 'All', vis: '78.3%', sov: '20.8%', cites: '96' },
  { q: 'who are the best seo companies in singapore', region: 'SG', platform: 'All', vis: '96.5%', sov: '19.3%', cites: '179' },
  { q: 'who are the best seo agencies in singapore', region: 'SG', platform: 'All', vis: '98.0%', sov: '20.8%', cites: '138' },
]

const rules = [
  { n: '01', t: 'Track platforms separately', d: 'Track ChatGPT and Google\'s AI surfaces separately, because as our study showed, they barely share a reading list and a blended score hides more than it reveals.' },
  { n: '02', t: 'Measure across consecutive days', d: 'Measure across consecutive days rather than trusting one snapshot, because AI visibility moves too much for a single check to mean anything.' },
  { n: '03', t: 'Report by query cluster', d: 'Report by query cluster, so you can see that you\'re winning comparison questions but losing recommendation questions, or strong on services and weak on price queries, rather than staring at one average that explains nothing.' },
]

export default function VisibilityTracking() {
  return (
    <Section id="track">
      <InView>
        <SectionHeading
          chip="04 · TRACK YOUR VISIBILITY"
          chipColor={blue}
          title="How To Track Your AI Visibility"
          subtitle="None of this can be managed on instinct, and very little of it shows up in the tools most businesses already use."
          maxTitle={720}
        />

        {/* Mentions vs Citations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 18, marginBottom: 18 }}>
          <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${blue}35`, borderRadius: 16, padding: 'clamp(24px,3.5vw,34px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${blue}12`, border: `1px solid ${blue}30`, borderRadius: 8, padding: '6px 14px', marginBottom: 18 }}>
              <span style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.12em', color: blue, fontWeight: 700 }}>MENTIONS — THE OUTCOME</span>
            </div>
            <h3 style={{ fontFamily: font, fontSize: 'clamp(19px,2.2vw,24px)', fontWeight: 900, color: fg, marginBottom: 12 }}>Are You In The Answer?</h3>
            <p style={{ fontFamily: font, fontSize: 14.5, color: fgMuted, lineHeight: 1.7 }}>
              A mention is your brand appearing in an AI engine's answer to a query that matters in your category. It's the outcome you're ultimately after, measured across the questions your buyers actually ask. The same view shows every competitor's numbers beside ours — because visibility is relative. The question is never just "do we appear?" but "who appears instead of us when we don't?"
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${red}35`, borderRadius: 16, padding: 'clamp(24px,3.5vw,34px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${red}10`, border: `1px solid ${red}30`, borderRadius: 8, padding: '6px 14px', marginBottom: 18 }}>
              <span style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.12em', color: red, fontWeight: 700 }}>CITATIONS — THE CAUSE</span>
            </div>
            <h3 style={{ fontFamily: font, fontSize: 'clamp(19px,2.2vw,24px)', fontWeight: 900, color: fg, marginBottom: 12 }}>Why You're In The Answer</h3>
            <p style={{ fontFamily: font, fontSize: 14.5, color: fgMuted, lineHeight: 1.7 }}>
              A citation is the source the engine actually retrieved to build that answer, the specific page that caused the recommendation. Mentions are the outcome. Citations are the cause. The two can diverge: A brand can be mentioned frequently on the strength of pages it doesn't own — visibility without control — and a brand can hold strong citations on a handful of queries while remaining invisible everywhere else.
            </p>
          </motion.div>
        </div>

        {/* Dashboard mock — our numbers */}
        <motion.div variants={fadeUp} style={{ background: surfaceD, borderRadius: 16, padding: 'clamp(24px,4vw,40px)', marginBottom: 44 }}>
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: blueL, marginBottom: 6 }}>OUR TRACKING DASHBOARD · "DIGITAL MARKETING AGENCY IN SINGAPORE"</div>
          <p style={{ fontFamily: font, fontSize: 13, color: `${fgLight}88`, marginBottom: 24 }}>Mentioned 65.7% of the time, with a 26.3% share of voice and an average position of 1.6 within the answers.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px,100%), 1fr))', gap: 16 }}>
            {[
              { v: '65.7%', l: 'Mention rate', c: blueL },
              { v: '26.3%', l: 'Share of voice', c: gold },
              { v: '1.6', l: 'Average position', c: '#4ade80' },
            ].map((m) => (
              <div key={m.l} style={{ background: `${fgLight}0C`, border: `1px solid ${fgLight}18`, borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ fontFamily: font, fontSize: 'clamp(30px,4vw,44px)', fontWeight: 900, color: m.c, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.v}</div>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: `${fgLight}99`, marginTop: 8 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tracking table */}
        <motion.h3 variants={fadeUp} style={{ fontFamily: font, fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 900, color: fg, marginBottom: 18 }}>
          Three Rules For Measuring It Properly
        </motion.h3>

        <motion.div variants={fadeUp} style={{ overflowX: 'auto', borderRadius: 14, border: `1.5px solid ${border}`, marginBottom: 32 }} className="x-scroll">
          <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse', fontFamily: font }}>
            <thead>
              <tr style={{ background: surface }}>
                {['Topic / Query', 'Region', 'Platform', 'Visibility Score', 'SOV', 'Owned Citations'].map((h) => (
                  <th key={h} style={{ textAlign: h === 'Topic / Query' ? 'left' : 'center', padding: '14px 18px', fontFamily: font, fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: fgMuted, borderBottom: `1.5px solid ${border}`, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((r, i) => (
                <tr key={i} style={{ background: i % 2 ? surface : bg }}>
                  <td style={{ padding: '14px 18px', fontSize: 13.5, color: fg, fontWeight: 600, borderBottom: i < tableRows.length - 1 ? `1px solid ${border}` : 'none' }}>{r.q}</td>
                  <td style={{ padding: '14px 18px', fontSize: 13.5, color: fgMuted, textAlign: 'center', borderBottom: i < tableRows.length - 1 ? `1px solid ${border}` : 'none' }}>{r.region}</td>
                  <td style={{ padding: '14px 18px', fontSize: 13.5, color: fgMuted, textAlign: 'center', borderBottom: i < tableRows.length - 1 ? `1px solid ${border}` : 'none' }}>{r.platform}</td>
                  <td style={{ padding: '14px 18px', fontSize: 13.5, color: blue, fontWeight: 800, textAlign: 'center', borderBottom: i < tableRows.length - 1 ? `1px solid ${border}` : 'none' }}>{r.vis}</td>
                  <td style={{ padding: '14px 18px', fontSize: 13.5, color: gold, fontWeight: 800, textAlign: 'center', borderBottom: i < tableRows.length - 1 ? `1px solid ${border}` : 'none' }}>{r.sov}</td>
                  <td style={{ padding: '14px 18px', fontSize: 13.5, color: fg, fontWeight: 700, textAlign: 'center', borderBottom: i < tableRows.length - 1 ? `1px solid ${border}` : 'none' }}>{r.cites}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Three rules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px,100%), 1fr))', gap: 16 }}>
          {rules.map((r) => (
            <motion.div key={r.n} variants={fadeUp} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
              <div style={{ fontFamily: font, fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', color: fgDim, marginBottom: 12 }}>{r.n}</div>
              <h4 style={{ fontFamily: font, fontSize: 'clamp(15px,1.6vw,17px)', fontWeight: 800, color: fg, marginBottom: 10 }}>{r.t}</h4>
              <p style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65 }}>{r.d}</p>
            </motion.div>
          ))}
        </div>
      </InView>
    </Section>
  )
}
