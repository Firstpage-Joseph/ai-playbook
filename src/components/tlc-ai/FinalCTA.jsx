import { motion } from 'framer-motion'
import { InView, fadeUp, bg, blue, blueL, red, fg, fgMuted, font } from './shared.jsx'
import LeadForm from './LeadForm.jsx'

export default function FinalCTA() {
  return (
    <section id="audit" style={{ padding: 'clamp(72px,10vw,120px) clamp(1.25rem,4vw,3rem)', background: blue }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <InView>
          {/* Intro copy */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 'clamp(28px,5vw,44px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #ffffff30', borderRadius: 100, padding: '5px 16px', marginBottom: 18, background: '#ffffff12' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.16em', color: '#fff', fontWeight: 700 }}>WHERE TO GO FROM HERE</span>
            </div>
            <h2 style={{ fontFamily: font, fontSize: 'clamp(26px,4vw,46px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16, maxWidth: 720, margin: '0 auto 16px' }}>
              Get Your AI Search Playbook here
            </h2>
            <p style={{ fontFamily: font, fontSize: 'clamp(15px,1.6vw,17px)', color: '#ffffffCC', lineHeight: 1.7, maxWidth: 680, margin: '0 auto' }}>
              Learn how to get your brand recommended by Answer engines.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            variants={fadeUp}
            style={{ position: 'relative', background: bg, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 80px rgba(10,27,61,0.25)' }}
          >
            <div style={{ height: 4, background: `linear-gradient(90deg, ${red}, ${blue}, ${blueL})`, width: '100%' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px,5vw,52px)' }}>
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: font, fontSize: 11, letterSpacing: '0.18em', color: blue, fontWeight: 700, marginBottom: 10 }}>FREE AI SEARCH PLAYBOOK</div>
                <h3 style={{ fontFamily: font, fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 8, color: fg }}>
                  Download your free copy →
                </h3>
                <p style={{ fontFamily: font, fontSize: 15, color: fgMuted, lineHeight: 1.6 }}>
                  Enter your details and the playbook is yours — you'll see exactly how to get your brand recommended by AI answer engines.
                </p>
              </div>
              <LeadForm />
            </div>
          </motion.div>
        </InView>
      </div>
    </section>
  )
}
