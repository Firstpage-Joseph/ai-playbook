import { useEffect } from 'react'

// HubSpot embedded form — mirrors the NexSEO implementation.
// Portal + region reused from the First Page HubSpot account; formId is TLC-specific.
const PORTAL_ID = '44221927'
const FORM_ID = 'ed57cf52-3909-4059-8140-9b6b74a38540'
const REGION = 'na2'

// Served from /public — the playbook delivered after a successful submission.
const PDF_URL = '/FPD-AI-Search-Playbook.pdf'
const PDF_FILENAME = 'FPD AI Search Playbook.pdf'

function downloadPlaybook() {
  const a = document.createElement('a')
  a.href = PDF_URL
  a.download = PDF_FILENAME
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

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

    // HubSpot posts a message to the parent window on submit — works for
    // iframe-embedded forms too. The playbook download is GATED here: it only
    // fires on a successful submission. Trigger it immediately (synchronously)
    // so the browser hands it to the download manager before HubSpot's
    // configured redirect-to-booking navigates the page away.
    let downloaded = false
    const onMessage = (event) => {
      const d = event.data
      if (d && d.type === 'hsFormCallback' && d.eventName === 'onFormSubmitted' && !downloaded) {
        downloaded = true
        downloadPlaybook()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return <div id="hubspot-form-container" />
}
