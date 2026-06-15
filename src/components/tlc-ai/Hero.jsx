import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Btn, Orb, useBreakpoint, ease, blue, blueL, blueD, fgLight, gold, font } from './shared.jsx'

// ─── Animated "AI answer" mock (hero visual) ──────────────────────────────────
function AnswerMock() {
  const brands = [
    { name: 'First Page', you: true },
    { name: 'Competitor A', you: false },
    { name: 'Competitor B', you: false },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.35, ease }}
      style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 460,
        margin: '0 auto', background: '#FFFFFF', borderRadius: 18,
        boxShadow: '0 30px 80px rgba(8,20,45,0.45)', overflow: 'hidden',
      }}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg, ${blue}, ${blueL})`, width: '100%' }} />
      <div style={{ padding: 'clamp(18px,3vw,26px)' }}>
        {/* prompt row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${blue}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          </div>
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: '#0F1B35' }}>
            "Who's the best in Singapore?"
          </span>
        </div>

        {/* answer body */}
        <div style={{ fontFamily: font, fontSize: 12.5, color: '#4A6080', lineHeight: 1.6, marginBottom: 16 }}>
          Based on current sources, the most recommended options are:
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.18, duration: 0.5, ease }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', borderRadius: 10,
                background: b.you ? `${blue}0E` : '#F4F8FD',
                border: b.you ? `1.5px solid ${blue}` : '1px solid #DAE8F5',
              }}
            >
              <span style={{ fontFamily: font, fontSize: 12, fontWeight: 800, color: b.you ? blue : '#8AAAC4', width: 16 }}>{i + 1}</span>
              <span style={{ fontFamily: font, fontSize: 13.5, fontWeight: 700, color: b.you ? blue : '#4A6080', flex: 1 }}>{b.name}</span>
              {b.you && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: 'spring', stiffness: 280 }}
                  style={{ fontFamily: font, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.1em', color: fgLight, background: gold, borderRadius: 100, padding: '3px 9px' }}
                >
                  RECOMMENDED
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontFamily: font, fontSize: 11, color: '#8AAAC4' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8AAAC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
          Sources: 3 cited pages
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { isMobile, isTablet } = useBreakpoint()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 64, background: blue }}
    >
      {/* Depth gradient */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${blueD} 0%, ${blue} 55%, ${blueL}99 100%)`, zIndex: 0 }} />
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: `linear-gradient(${fgLight}10 1px, transparent 1px), linear-gradient(90deg, ${fgLight}10 1px, transparent 1px)`, backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 85% 70% at 60% 35%, black 20%, transparent 75%)' }} />

      {!isMobile && (
        <>
          <Orb color={fgLight} size={700} top="-10%" left="35%" blur={180} opacity={0.06} dur={9} />
          <Orb color={blueD} size={400} top="55%" left="58%" blur={120} opacity={0.6} dur={12} />
          <Orb color={fgLight} size={350} top="5%" left="-10%" blur={140} opacity={0.05} dur={7} />
        </>
      )}
      {isMobile && <Orb color={fgLight} size={400} top="5%" left="-20%" blur={120} opacity={0.08} dur={9} />}

      <motion.div style={{ y, opacity, position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            maxWidth: 1200, margin: '0 auto',
            padding: 'clamp(2rem,6vw,4rem) clamp(1.25rem,4vw,3rem)',
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1.05fr 0.95fr',
            gap: isTablet ? '3rem' : '2.5rem',
            alignItems: 'center',
            minHeight: isTablet ? 'auto' : 'calc(100vh - 64px)',
          }}
        >
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${fgLight}30`, borderRadius: 100, padding: '5px 16px', marginBottom: 24, background: `${fgLight}10` }}
            >
              <motion.span animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              <span style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.16em', color: fgLight, fontWeight: 700, opacity: 0.9 }}>THE AI SEARCH PLAYBOOK</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease }}
              style={{ fontFamily: font, fontWeight: 900, fontSize: 'clamp(34px, 5.2vw, 66px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 18, color: fgLight }}
            >
              You're Losing Organic Traffic to AI.{' '}
              <span style={{ color: '#FBD24B' }}>Here's How to Win It Back.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              style={{ fontFamily: font, fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 400, color: `${fgLight}CC`, lineHeight: 1.7, maxWidth: 540, marginBottom: 34 }}
            >
              Right now, somewhere in Singapore, a buyer is asking ChatGPT: "Who's the best in Singapore?" The AI is answering with three or four names. If yours isn't one of them, this guide is for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <Btn href="#audit" variant="red">Download The Playbook →</Btn>
              <Btn href="#crisis" variant="white">Preview Inside</Btn>
            </motion.div>
          </div>

          {/* Right — animated answer mock */}
          <motion.div
            initial={{ opacity: 0, x: isTablet ? 0 : 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'absolute', inset: '-12%', zIndex: 0, background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${fgLight}12, transparent 70%)`, pointerEvents: 'none' }} />
            <AnswerMock />
          </motion.div>
        </div>
      </motion.div>

      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <rect x="1" y="1" width="18" height="26" rx="9" stroke={`${fgLight}50`} strokeWidth="1.5" />
              <motion.rect animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.6, repeat: Infinity }} x="8.5" y="5" width="3" height="6" rx="1.5" fill={fgLight} />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
