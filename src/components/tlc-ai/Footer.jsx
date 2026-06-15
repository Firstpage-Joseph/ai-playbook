import { motion } from 'framer-motion'
import { useBreakpoint, surfaceD, fgLight, font, LOGO } from './shared.jsx'

export default function Footer() {
  const { isMobile } = useBreakpoint()
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ borderTop: `1px solid ${fgLight}12`, padding: 'clamp(32px,5vw,40px) clamp(1.25rem,4vw,3rem)', background: surfaceD }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 20 }}>
        <img src={LOGO} alt="First Page" style={{ height: 26, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
        <span style={{ fontFamily: font, fontSize: 13, color: `${fgLight}44`, order: isMobile ? 3 : 2 }}>© 2026 First Page · The AI Search Playbook</span>
        <div style={{ display: 'flex', gap: '1.5rem', order: isMobile ? 2 : 3 }}>
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <a
              key={l}
              href="#"
              style={{ fontFamily: font, fontSize: 13, color: `${fgLight}77`, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = fgLight)}
              onMouseLeave={(e) => (e.target.style.color = `${fgLight}77`)}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
