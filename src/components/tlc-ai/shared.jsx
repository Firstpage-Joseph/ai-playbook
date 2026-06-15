import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Brand tokens (mirrored from the NexSEO reference theme) ──────────────────
export const tokens = {
  bg: '#FFFFFF',
  surface: '#F4F8FD',
  surfaceD: '#0A1B3D',
  border: '#DAE8F5',
  blue: '#1A6DD4',
  blueL: '#4A9AEA',
  blueD: '#0F4FA8',
  red: '#E83030',
  redD: '#C42020',
  fg: '#0F1B35',
  fgMuted: '#4A6080',
  fgDim: '#8AAAC4',
  fgLight: '#FFFFFF',
  gold: '#F59E0B',
  font: "'Proxima Nova', 'Montserrat', 'Inter', sans-serif",
}

export const {
  bg, surface, surfaceD, border, blue, blueL, blueD,
  red, redD, fg, fgMuted, fgDim, fgLight, gold, font,
} = tokens

export const LOGO =
  'https://firstpage.com.au/wp-content/uploads/2025/06/First-Page-Logo-White-Background.png'

// ─── Responsive hook ──────────────────────────────────────────────────────────
export function useBreakpoint() {
  const get = () => ({
    isMobile: typeof window !== 'undefined' && window.innerWidth < 640,
    isTablet: typeof window !== 'undefined' && window.innerWidth < 1024,
  })
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const h = () => setBp(get())
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return bp
}

// ─── Animation helpers ────────────────────────────────────────────────────────
export const ease = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: delay } },
})

export function InView({ children, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger()}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Orb ──────────────────────────────────────────────────────────────────────
export function Orb({ color, size, top, left, right, blur, opacity, dur = 8 }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [opacity, opacity * 0.6, opacity] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', top, left, right, width: size, height: size,
        borderRadius: '50%', background: color, filter: `blur(${blur}px)`,
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
export function Chip({ children, color = blue, onDark = false }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        border: `1px solid ${onDark ? `${fgLight}30` : `${color}40`}`,
        borderRadius: 100, padding: '5px 16px', marginBottom: 18,
        background: onDark ? `${fgLight}12` : `${color}12`,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: onDark ? fgLight : color, display: 'inline-block' }} />
      <span style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.16em', color: onDark ? fgLight : color, fontWeight: 700 }}>
        {children}
      </span>
    </motion.div>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────
export function SectionHeading({ chip, chipColor, title, subtitle, center = true, onDark = false, maxTitle = 640 }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 'clamp(28px,5vw,52px)' }}>
      {chip && <Chip color={chipColor ?? blue} onDark={onDark}>{chip}</Chip>}
      <motion.h2
        variants={fadeUp}
        style={{
          fontFamily: font, fontSize: 'clamp(26px, 3.5vw, 46px)', fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 1.12, maxWidth: center ? maxTitle : 'none',
          margin: center ? '0 auto' : 0, color: onDark ? fgLight : fg,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: font, fontSize: 'clamp(15px,1.5vw,17px)',
            color: onDark ? `${fgLight}99` : fgMuted, lineHeight: 1.65, marginTop: 14,
            maxWidth: center ? 620 : 560, margin: center ? '14px auto 0' : '14px 0 0',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Btn({ href, variant = 'red', children, style: extra, onClick, type }) {
  const map = {
    red: { bg: red, hov: redD, text: fgLight, border: 'none' },
    blue: { bg: blue, hov: blueD, text: fgLight, border: 'none' },
    white: { bg: fgLight, hov: `${fgLight}E6`, text: blue, border: 'none' },
    outline: { bg: 'transparent', hov: `${blue}10`, text: blue, border: `1.5px solid ${blue}` },
  }
  const s = map[variant]
  const [hov, setHov] = useState(false)
  const Comp = type ? motion.button : motion.a
  return (
    <Comp
      href={href}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        display: 'inline-block', background: hov ? s.hov : s.bg, color: s.text,
        border: s.border, padding: '13px 28px', borderRadius: 6, fontFamily: font,
        fontSize: 15, fontWeight: 700, letterSpacing: '0.02em', textDecoration: 'none',
        cursor: 'pointer', transition: 'background 0.22s, color 0.22s', ...extra,
      }}
    >
      {children}
    </Comp>
  )
}

// ─── Reusable stat / KPI card ─────────────────────────────────────────────────
export function StatCard({ val, label, desc, color = blue, suffix }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        position: 'relative', background: bg,
        border: `1.5px solid ${hov ? color + '55' : border}`, borderRadius: 14,
        padding: 'clamp(28px,4vw,40px) clamp(20px,3vw,32px)', overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hov ? `0 8px 40px ${color}15` : '0 2px 16px rgba(26,109,212,0.05)',
      }}
    >
      <div style={{ width: 40, height: 3, background: color, borderRadius: 2, marginBottom: 24 }} />
      <div style={{ fontFamily: font, fontSize: 'clamp(38px,5vw,60px)', fontWeight: 900, color, lineHeight: 1, marginBottom: 10, letterSpacing: '-0.03em' }}>
        {val}{suffix && <span style={{ fontSize: '0.5em', fontWeight: 800 }}>{suffix}</span>}
      </div>
      {label && <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: fg, marginBottom: desc ? 8 : 0 }}>{label}</div>}
      {desc && <div style={{ fontFamily: font, fontSize: 14, color: fgMuted, lineHeight: 1.65 }}>{desc}</div>}
    </motion.div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
export function Section({ id, children, dark = false, soft = false, style }) {
  const background = dark ? surfaceD : soft ? surface : bg
  return (
    <section
      id={id}
      style={{
        padding: 'clamp(64px,9vw,116px) clamp(1.25rem,4vw,3rem)',
        background, ...style,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>{children}</div>
    </section>
  )
}

// ─── Small check icon ─────────────────────────────────────────────────────────
export function Check({ color = blue, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
