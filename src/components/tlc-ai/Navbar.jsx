import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Btn, useBreakpoint, ease, border, blue, fg, fgMuted, fgLight, font, LOGO } from './shared.jsx'

const links = [
  ['#crisis', 'The Crisis'],
  ['#why', 'Why It Matters'],
  ['#how', 'How Engines Decide'],
  ['#checklist', 'Checklist'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useBreakpoint()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  const isLight = scrolled || menuOpen

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 64, display: 'flex', alignItems: 'center',
          padding: '0 clamp(1rem,4vw,3rem)', justifyContent: 'space-between',
          backdropFilter: isLight ? 'blur(20px) saturate(1.5)' : 'none',
          background: isLight ? 'rgba(255,255,255,0.97)' : 'transparent',
          borderBottom: `1px solid ${isLight ? border : 'transparent'}`,
          boxShadow: isLight ? '0 1px 20px rgba(26,109,212,0.08)' : 'none',
          transition: 'all 0.35s',
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src={LOGO}
            alt="First Page"
            style={{ height: isMobile ? 26 : 30, width: 'auto', objectFit: 'contain', filter: isLight ? 'none' : 'brightness(0) invert(1)' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
          />
          <span style={{ display: 'none', fontFamily: font, fontWeight: 900, fontSize: 18, color: isLight ? fg : fgLight }}>
            First<span style={{ color: blue }}>Page</span>
          </span>
        </a>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {links.map(([href, label]) => (
              <a
                key={label}
                href={href}
                style={{ color: isLight ? fgMuted : `${fgLight}CC`, textDecoration: 'none', fontSize: 14, fontFamily: font, fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = isLight ? fg : fgLight)}
                onMouseLeave={(e) => (e.target.style.color = isLight ? fgMuted : `${fgLight}CC`)}
              >
                {label}
              </a>
            ))}
            <Btn href="#audit" variant="red" style={{ padding: '9px 20px', fontSize: 13 }}>Download The Playbook</Btn>
          </div>
        )}

        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Btn href="#audit" variant="red" style={{ padding: '8px 16px', fontSize: 13 }}>Playbook</Btn>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: isLight ? fg : fgLight, display: 'flex', flexDirection: 'column', gap: 5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={menuOpen ? (i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 9 } : { rotate: -45, y: -9 }) : { rotate: 0, y: 0, opacity: 1 }}
                  style={{ display: 'block', width: 22, height: 2, background: isLight ? fg : fgLight, borderRadius: 2 }}
                />
              ))}
            </button>
          </div>
        )}
      </motion.nav>

      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
              background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${border}`, display: 'flex', flexDirection: 'column',
            }}
          >
            {links.map(([href, label]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ padding: '18px clamp(1rem,4vw,3rem)', fontFamily: font, fontSize: 16, fontWeight: 700, color: fg, textDecoration: 'none', borderBottom: `1px solid ${border}` }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
