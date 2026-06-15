import { motion } from 'framer-motion'
import {
  Section, SectionHeading, InView, fadeUp,
  bg, border, blue, blueD, red, fg, fgMuted, gold, font,
} from './shared.jsx'

// ─── Conversion comparison bar ────────────────────────────────────────────────
function ConvBar({ label, value, pct, color, note }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: fg }}>{label}</span>
        <span style={{ fontFamily: font, fontSize: 'clamp(18px,2vw,22px)', fontWeight: 900, color }}>{value}</span>
      </div>
      <div style={{ height: 12, borderRadius: 100, background: '#EEF4FB', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 100, background: color }}
        />
      </div>
      {note && <div style={{ fontFamily: font, fontSize: 12, color: fgMuted, marginTop: 6 }}>{note}</div>}
    </div>
  )
}

export default function WhyAISearchMatters() {
  return (
    <Section id="why">
      <InView>
        <SectionHeading
          chip="02 · WHY IT MATTERS"
          chipColor={blue}
          title="Why AI Search Matters More Than The Traffic Numbers Suggest"
          subtitle="The visits being redistributed by AI are not average visits. The people in them are disproportionately the ones who buy."
          maxTitle={780}
        />

        {/* Two conversion highlight cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: 18, marginBottom: 18 }}>
          {/* 4.4x card */}
          <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 'clamp(28px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: font, fontSize: 'clamp(52px,7vw,80px)', fontWeight: 900, color: blue, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 12 }}>4.4×</div>
            <p style={{ fontFamily: font, fontSize: 15, color: fgMuted, lineHeight: 1.7 }}>
              Semrush's 2025 study of AI search behaviour found that the average visitor arriving from an AI platform converts at <strong style={{ color: fg }}>4.4 times the rate</strong> of a traditional organic search visitor.
            </p>
          </motion.div>

          {/* Platform comparison card */}
          <motion.div variants={fadeUp} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 16, padding: 'clamp(28px,4vw,40px)' }}>
            <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: blue, marginBottom: 20 }}>
              CONVERSION RATE BY SOURCE · SEER INTERACTIVE
            </div>
            <ConvBar label="ChatGPT referrals" value="15.9%" pct={100} color={red} />
            <ConvBar label="Google organic" value="1.76%" pct={11} color={blueD} />
            <p style={{ fontFamily: font, fontSize: 13, color: fgMuted, lineHeight: 1.6, marginTop: 4 }}>
              Referrals from ChatGPT converted at 15.9% against 1.76% for Google organic in the verticals they measured. The volumes are still small as a share of total traffic, but the people in them are disproportionately the ones who buy.
            </p>
          </motion.div>
        </div>

        {/* Cost of invisibility */}
        <motion.div
          variants={fadeUp}
          style={{
            background: `${red}08`, border: `1.5px solid ${red}30`, borderLeft: `4px solid ${red}`,
            borderRadius: 12, padding: 'clamp(22px,3.5vw,32px)', marginBottom: 18,
          }}
        >
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: red, marginBottom: 10 }}>THE COST OF INVISIBILITY</div>
          <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.6vw,18px)', color: fg, lineHeight: 1.65, fontWeight: 500 }}>
            When an answer engine recommends a competitor instead of you, you haven't lost a click. You've lost a buyer at the final step of their research, and nothing in your analytics will tell you it happened.
          </p>
        </motion.div>

        {/* The better news — challengers can win */}
        <motion.div
          variants={fadeUp}
          style={{
            background: `linear-gradient(135deg, ${blue}10, ${gold}08)`,
            border: `1.5px solid ${blue}30`, borderRadius: 16,
            padding: 'clamp(24px,4vw,40px)',
          }}
        >
          <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: blue, marginBottom: 10 }}>THE BETTER NEWS</div>
          <p style={{ fontFamily: font, fontSize: 'clamp(16px,1.8vw,20px)', color: fg, fontWeight: 600, lineHeight: 1.55 }}>
            Answer engines reward content that answer questions cleanly. This is an opportunity for your brand to be recommended, even against those that have held Rank 1 on Google for years.
          </p>
        </motion.div>
      </InView>
    </Section>
  )
}
