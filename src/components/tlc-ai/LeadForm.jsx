import { useEffect } from 'react'
import { captureHubspotValues, handleHubspotSubmitted } from '../../lib/hdyfu.js'

// HubSpot embedded form — mirrors the NexSEO implementation.
// Portal + region reused from the First Page HubSpot account; formId is TLC-specific.
const PORTAL_ID = '44221927'
const FORM_ID = 'ed57cf52-3909-4059-8140-9b6b74a38540'
const REGION = 'na2'

// Served from /public — the playbook delivered after a successful submission.
// BASE_URL is the configured Vite base (e.g. "/ai-playbook/") so the path
// resolves correctly when deployed under a subpath.
const PDF_URL = `${import.meta.env.BASE_URL}FPD-AI-Search-Playbook.pdf`
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

    // Submitted field values, captured before send so we can forward
    // email / name / phone to the attribution page.
    let capturedValues = {}
    let handled = false

    const tryInject = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: PORTAL_ID,
          formId: FORM_ID,
          region: REGION,
          target: '#hubspot-form-container',
          onFormSubmit: ($form) => {
            capturedValues = captureHubspotValues($form)
          },
          onFormSubmitted: ($form, data) => {
            if (handled) return
            handled = true
            // Gate the playbook download on a successful submission, firing it
            // synchronously so the browser hands it to the download manager
            // before we navigate to the attribution page.
            downloadPlaybook()
            handleHubspotSubmitted({ redirectUrl: data && data.redirectUrl, values: capturedValues })
          },
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

    // Fallback for iframe-embedded forms where the create() callbacks may not
    // fire: detect the submit via postMessage and run the same handler.
    const onMessage = (event) => {
      const d = event.data
      if (d && d.type === 'hsFormCallback' && d.eventName === 'onFormSubmitted' && !handled) {
        handled = true
        downloadPlaybook()
        handleHubspotSubmitted({ redirectUrl: d.redirectUrl, values: capturedValues })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return <div id="hubspot-form-container" />
}
