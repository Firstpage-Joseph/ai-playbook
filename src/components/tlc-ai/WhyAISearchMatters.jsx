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

        <motion.p variants={fadeUp} style={{ maxWidth: 820, margin: '0 auto clamp(28px,5vw,44px)', fontFamily: font, fontSize: 'clamp(15px,1.5vw,17px)', color: fgMuted, lineHeight: 1.75, textAlign: 'center' }}>
          The instinct is to read all of this as a traffic problem and reach for a traffic solution: Publish more, rank for more, claw the sessions back. That misreads what's happening, because the visits being redistributed by AI are not average visits.
        </motion.p>

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

        {/* Pre-sold visitor narrative */}
        <motion.div variants={fadeUp} style={{ maxWidth: 820, margin: '0 auto 18px' }}>
          <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.5vw,17px)', color: fgMuted, lineHeight: 1.75 }}>
            The reason is simple once you picture the journey. By the time someone clicks through from an AI answer, the comparison work is done. The engine has weighed the options, narrowed the shortlist, and presented your brand with a reason attached. The visitor arrives pre-sold and informed, often with their objections already answered. Two decades of marketing effort have gone into manufacturing exactly this kind of visitor. AI answers now produce them by default.
          </p>
        </motion.div>

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
            padding: 'clamp(24px,4vw,40px)', display: 'flex', flexWrap: 'wrap',
            gap: 'clamp(20px,4vw,40px)', alignItems: 'center',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: font, fontSize: 'clamp(48px,7vw,76px)', fontWeight: 900, color: blue, lineHeight: 1, letterSpacing: '-0.04em' }}>~90%</div>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: fgMuted, marginTop: 6, maxWidth: 200 }}>
              of ChatGPT's citations come from pages ranking position 21 or beyond
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: blue, marginBottom: 10 }}>THE BETTER NEWS</div>
            <p style={{ fontFamily: font, fontSize: 'clamp(14px,1.5vw,16px)', color: fgMuted, lineHeight: 1.7 }}>
              Answer engines don't simply copy Google's top 10. Semrush found that close to 90% of ChatGPT's citations come from pages ranking in position 21 or beyond for related queries. The engines reward content that answers the question cleanly, wherever it sits, which means <strong style={{ color: fg }}>challenger brands can be recommended ahead of incumbents</strong> who have held the rankings for years. For businesses in Singapore, the timing matters — that window will not stay open.
            </p>
          </div>
        </motion.div>
      </InView>
    </Section>
  )
}
