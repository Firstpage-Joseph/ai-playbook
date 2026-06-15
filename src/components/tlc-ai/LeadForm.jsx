import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Btn, border, blue, red, fg, fgMuted, font } from './shared.jsx'

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Jane Tan', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Acme Pte Ltd', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@acme.com', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+65 8000 0000', required: false, autoComplete: 'tel' },
  { name: 'website', label: 'Website URL', type: 'url', placeholder: 'https://acme.com', required: true, autoComplete: 'url' },
]

const empty = { name: '', company: '', email: '', phone: '', website: '' }

export default function LeadForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    fields.forEach((f) => {
      const val = values[f.name].trim()
      if (f.required && !val) next[f.name] = `${f.label} is required`
      else if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) next[f.name] = 'Enter a valid email'
      else if (f.type === 'url' && val && !/\.[a-z]{2,}/i.test(val)) next[f.name] = 'Enter a valid URL'
    })
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // No backend endpoint is provided; surface a success state for the lead.
      setSubmitted(true)
    }
  }

  const labelStyle = { display: 'block', fontFamily: font, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: fgMuted, marginBottom: 6 }
  const inputStyle = (err) => ({
    width: '100%', background: '#F9FBFE', border: `1px solid ${err ? red : border}`, borderRadius: 6,
    padding: '13px 16px', fontFamily: font, fontSize: 15, color: fg, outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  })

  return (
    <div id="audit-form">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: 'clamp(24px,5vw,48px) 0' }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${blue}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 style={{ fontFamily: font, fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900, color: fg, marginBottom: 10 }}>Request received.</h3>
            <p style={{ fontFamily: font, fontSize: 15, color: fgMuted, lineHeight: 1.6, maxWidth: 420, margin: '0 auto' }}>
              Thanks, {values.name.split(' ')[0] || 'there'}. We'll map where {values.company || 'your brand'} is mentioned and cited across AI answers, and be in touch shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px,100%), 1fr))', gap: 16 }}>
              {fields.slice(0, 4).map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} style={labelStyle}>{f.label}{f.required && <span style={{ color: red }}> *</span>}</label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    value={values[f.name]}
                    onChange={onChange}
                    style={inputStyle(errors[f.name])}
                    onFocus={(e) => { e.target.style.borderColor = blue; e.target.style.background = '#fff' }}
                    onBlur={(e) => { e.target.style.borderColor = errors[f.name] ? red : border }}
                  />
                  {errors[f.name] && <div style={{ fontFamily: font, fontSize: 12, color: red, marginTop: 4 }}>{errors[f.name]}</div>}
                </div>
              ))}
            </div>

            {/* Website URL full width */}
            {(() => {
              const f = fields[4]
              return (
                <div>
                  <label htmlFor={f.name} style={labelStyle}>{f.label}{f.required && <span style={{ color: red }}> *</span>}</label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    value={values[f.name]}
                    onChange={onChange}
                    style={inputStyle(errors[f.name])}
                    onFocus={(e) => { e.target.style.borderColor = blue; e.target.style.background = '#fff' }}
                    onBlur={(e) => { e.target.style.borderColor = errors[f.name] ? red : border }}
                  />
                  {errors[f.name] && <div style={{ fontFamily: font, fontSize: 12, color: red, marginTop: 4 }}>{errors[f.name]}</div>}
                </div>
              )
            })()}

            <Btn type="submit" variant="red" style={{ width: '100%', textAlign: 'center', padding: '15px', fontSize: 16, marginTop: 4 }}>
              Request My AI Visibility Audit
            </Btn>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
