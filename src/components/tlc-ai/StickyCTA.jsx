import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Btn, useBreakpoint, border, fg, fgMuted, font } from './shared.jsx'

// Mobile-only sticky audit CTA that appears after the hero scrolls away.
export default function StickyCTA() {
  const { isMobile } = useBreakpoint()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const h = () => setShow(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', h, { passive: true })
    h()
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <AnimatePresence>
      {isMobile && show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
            background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
            borderTop: `1px solid ${border}`, boxShadow: '0 -4px 24px rgba(10,27,61,0.10)',
            padding: '12px clamp(1rem,4vw,1.5rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 800, color: fg, lineHeight: 1.2 }}>Free AI visibility audit</div>
            <div style={{ fontFamily: font, fontSize: 11, color: fgMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>See where you're cited — no cost.</div>
          </div>
          <Btn href="#audit" variant="red" style={{ flexShrink: 0, padding: '11px 18px', fontSize: 13 }}>Get Audit</Btn>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
