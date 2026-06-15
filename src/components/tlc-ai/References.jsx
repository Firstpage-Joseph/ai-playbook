import { motion } from 'framer-motion'
import { Section, SectionHeading, InView, fadeUp, border, blue, fg, fgMuted, font } from './shared.jsx'

const refs = [
  { src: 'Bain & Company', detail: '"Consumer reliance on AI search results signals new era of marketing", February 2025.', site: 'bain.com' },
  { src: 'Pew Research Center', detail: 'analysis of 68,879 Google searches from 900 US adults, published July 2025.', site: 'pewresearch.org' },
  { src: 'Ahrefs', detail: 'study of the impact of AI Overviews on click-through rates, 2025.', site: 'ahrefs.com' },
  { src: 'Semrush', detail: 'AI search study (visitor value, citation patterns and most-cited domains), 2025.', site: 'semrush.com' },
  { src: 'Seer Interactive', detail: 'LLM referral conversion analysis by platform, 2025.', site: 'seerinteractive.com' },
  { src: 'First Page', detail: 'chunking and citation study: 342,426 content passages across 12,958 cited URLs, presented at The Last Click Summit, 2026.', site: null },
  { src: 'Client results', detail: 'campaign data from three First Page clients (a Singapore telco, a regional bank, and a global logistics company; names withheld under client confidentiality), 2025 to 2026.', site: null },
]

export default function References() {
  return (
    <Section id="references" soft>
      <InView>
        <SectionHeading
          chip="REFERENCES & SOURCES"
          chipColor={blue}
          title="References & Sources"
          center={false}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1.5px solid ${border}` }}>
          {refs.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 'clamp(16px,2.5vw,22px) 0', borderBottom: `1.5px solid ${border}` }}
            >
              <span style={{ fontFamily: font, fontSize: 13, fontWeight: 900, color: fgMuted, flexShrink: 0, width: 24, paddingTop: 1 }}>{i + 1}</span>
              <p style={{ fontFamily: font, fontSize: 'clamp(14px,1.4vw,15px)', color: fgMuted, lineHeight: 1.65 }}>
                <strong style={{ color: fg, fontWeight: 800 }}>{r.src},</strong> {r.detail}
                {r.site && <span style={{ color: blue, fontWeight: 700 }}> {r.site}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </InView>
    </Section>
  )
}
