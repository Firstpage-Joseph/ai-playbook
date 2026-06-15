import { useEffect } from 'react'

// HubSpot embedded form — mirrors the NexSEO implementation.
// Portal + region reused from the First Page HubSpot account; formId is TLC-specific.
const PORTAL_ID = '44221927'
const FORM_ID = 'ed57cf52-3909-4059-8140-9b6b74a38540'
const REGION = 'na2'

export default function LeadForm() {
  useEffect(() => {
    let attempts = 0

    const tryInject = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: PORTAL_ID,
          formId: FORM_ID,
          region: REGION,
          target: '#hubspot-form-container',
        })
      } else if (attempts < 30) {
        attempts++
        setTimeout(tryInject, 200)
      }
    }

    if (!document.getElementById('hs-forms-script')) {
      const script = document.createElement('script')
      script.id = 'hs-forms-script'
      script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
      script.charset = 'utf-8'
      script.type = 'text/javascript'
      script.onload = tryInject
      document.head.appendChild(script)
    } else {
      tryInject()
    }
  }, [])

  return <div id="hubspot-form-container" />
}
