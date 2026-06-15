import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Section, SectionHeading, InView, fadeUp, Btn,
  bg, border, blue, red, fg, fgMuted, gold, fgLight, font,
} from './shared.jsx'

const items = [
  'Ask ChatGPT, Gemini and Google\'s AI for the best provider in your category, phrased the way a customer would phrase it. Is your brand in the answer?',
  'Ask one long-tail question a real buyer would ask just before choosing you. Who gets recommended, and which sources does the answer cite?',
  'Lift any paragraph from the middle of that page and read it on its own. Does it still make sense, and does it still make a point?',
  'Search the obvious roundup query for your category ("best [your category] in Singapore"). Are you represented on the comparison pages that rank, and represented well?',
  'Is anyone in your business tracking brand mentions and citations in AI answers, per platform, over time?',
]

const OPTS = [
  { key: 'yes', label: 'Yes', color: '#16a34a' },
  { key: 'no', label: 'No', color: red },
  { key: 'idk', label: "Don't know", color: gold },
]

function ChecklistItem({ index, text, value, onChange }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: bg, border: `1.5px solid ${value && value !== 'yes' ? red + '45' : value === 'yes' ? '#16a34a45' : border}`,
        borderRadius: 12, padding: 'clamp(18px,3vw,24px)', transition: 'border-color 0.25s',
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${blue}12`, border: `1px solid ${blue}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, fontSize: 13, fontWeight: 900, color: blue, flexShrink: 0 }}>{index + 1}</div>
        <p style={{ fontFamily: font, fontSize: 'clamp(14px,1.5vw,15.5px)', color: fg, fontWeight: 500, lineHeight: 1.55 }}>{text}</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 42 }}>
        {OPTS.map((o) => {
          const active = value === o.key
          return (
            <button
              key={o.key}
              onClick={() => onChange(o.key)}
              style={{
                fontFamily: font, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                padding: '8px 18px', borderRadius: 100,
                border: `1.5px solid ${active ? o.color : border}`,
                background: active ? o.color : 'transparent',
                color: active ? fgLight : fgMuted, transition: 'all 0.18s',
              }}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function AnswerEngineChecklist() {
  const [answers, setAnswers] = useState({})
  const set = (i, v) => setAnswers((a) => ({ ...a, [i]: v }))
  const answeredCount = Object.keys(answers).length
  const flagged = Object.values(answers).filter((v) => v === 'no' || v === 'idk').length
  const showResult = answeredCount === items.length

  return (
    <Section id="checklist">
      <InView>
        <SectionHeading
          chip="THE ANSWER ENGINE CHECKLIST"
          chipColor={blue}
          title="Run This Diagnostic In 15 Minutes"
          subtitle="Everything above reduces to a short diagnostic you can run yourself in about 15 minutes, with no tools beyond the AI platforms and a browser. Answer each item honestly: Yes, no, or don't know."
          maxTitle={680}
        />

        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((t, i) => (
            <ChecklistItem key={i} index={i} text={t} value={answers[i]} onChange={(v) => set(i, v)} />
          ))}

          {/* Progress / result */}
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', fontFamily: font, fontSize: 13, fontWeight: 600, color: fgMuted, marginTop: 8 }}
              >
                {answeredCount} of {items.length} answered — complete all five to see where you stand.
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  marginTop: 12, borderRadius: 14, padding: 'clamp(24px,4vw,36px)',
                  background: flagged >= 4 ? `${red}08` : `${blue}08`,
                  border: `1.5px solid ${flagged >= 4 ? red + '40' : blue + '30'}`,
                  borderLeft: `4px solid ${flagged >= 4 ? red : blue}`,
                }}
              >
                <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, color: flagged >= 4 ? red : blue, marginBottom: 12 }}>
                  {flagged >= 4 ? `YOU FLAGGED ${flagged} OF 5` : `YOU FLAGGED ${flagged} OF 5`}
                </div>
                <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.6vw,17px)', color: fg, lineHeight: 1.65, fontWeight: 500, marginBottom: flagged >= 4 ? 20 : 0 }}>
                  If you answered "no" or "don't know" to four or more of these, your AI visibility is being settled right now by defaults, competitors and third-party pages, rather than by anything you control. The gap is fixable, but it compounds in whichever direction it's already moving.
                </p>
                {flagged >= 4 && <Btn href="#audit" variant="red">Download The Playbook →</Btn>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </InView>
    </Section>
  )
}
