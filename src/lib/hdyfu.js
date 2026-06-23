// Shared helper: route a successful HubSpot form submission through the
// "How did you find us?" attribution page before the final thank-you URL.
//
// Flow: landing page form submit success
//   -> /how-did-you-find-us/?thank_you=<original>&email=...&utm_*=...
//   -> attribution answer
//   -> original thank-you URL
//
// The HubSpot embedded form may have its own redirect configured in the HubSpot
// UI. We read that redirect from the onFormSubmitted payload when available and
// forward it as `thank_you`, then navigate ourselves so this step runs first. If
// no HubSpot-side redirect exists, THANK_YOU_URL is used as the fallback.

export const HDYFU_URL = 'https://www.firstpagedigital.sg/how-did-you-find-us/';
export const THANK_YOU_URL = 'https://www.firstpagedigital.sg/thank-you/';

function readField(values, names) {
  for (const n of names) {
    if (values && values[n] != null && values[n] !== '') return values[n];
  }
  return '';
}

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[2]) : '';
}

// Pull submitted values from the HubSpot form DOM. `$form` is the jQuery object
// HubSpot passes to its callbacks (or a plain element). Safe if null.
export function captureHubspotValues($form) {
  const root = $form && $form[0] ? $form[0] : $form;
  const values = {};
  if (root && root.querySelectorAll) {
    root.querySelectorAll('input[name], select[name], textarea[name]').forEach((el) => {
      if (el.name && el.value) values[el.name] = el.value;
    });
  }
  return values;
}

export function buildHdyfuUrl({ hdyfuUrl = HDYFU_URL, thankYouUrl = THANK_YOU_URL, values = {} } = {}) {
  const url = new URL(hdyfuUrl, window.location.origin);
  const incoming = new URLSearchParams(window.location.search);

  const email = readField(values, ['email']);
  const firstname = readField(values, ['firstname']);
  const lastname = readField(values, ['lastname']);
  const phone = readField(values, ['phone', 'mobilephone']);

  if (email) url.searchParams.set('email', email);
  if (firstname) url.searchParams.set('firstname', firstname);
  if (lastname) url.searchParams.set('lastname', lastname);
  if (phone) url.searchParams.set('phone', phone);

  // Forward UTM params + click ids already on the landing page URL.
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach((k) => {
    const v = incoming.get(k);
    if (v) url.searchParams.set(k, v);
  });

  const hutk = getCookie('hubspotutk');
  if (hutk) url.searchParams.set('hutk', hutk);

  url.searchParams.set('landing_page_url', window.location.href);
  url.searchParams.set('thank_you', thankYouUrl);
  url.searchParams.set('original_thank_you_url', thankYouUrl);
  return url.toString();
}

export function redirectToHdyfu(opts) {
  window.location.href = buildHdyfuUrl(opts);
}

// The booking wizard already inserts the attribution step after the meeting is
// booked, so a form that redirects there must NOT be intercepted here (otherwise
// the user would see "How did you find us?" twice).
const BOOKING_HOSTS = ['booking.firstpagedigital.sg'];

export function isBookingUrl(u) {
  if (!u) return false;
  try {
    return BOOKING_HOSTS.indexOf(new URL(u, window.location.origin).hostname) !== -1;
  } catch (e) {
    return u.indexOf('booking.firstpagedigital.sg') !== -1;
  }
}

// Decide what to do after a successful HubSpot submission:
//  - redirect already points at the booking wizard -> let it through unchanged
//  - otherwise -> route through the attribution page, forwarding the original
//    redirect (or THANK_YOU_URL) as the final thank-you target.
export function handleHubspotSubmitted({ redirectUrl, values, hdyfuUrl = HDYFU_URL, thankYouUrl = THANK_YOU_URL } = {}) {
  if (isBookingUrl(redirectUrl)) {
    if (redirectUrl) window.location.href = redirectUrl;
    return;
  }
  redirectToHdyfu({ hdyfuUrl, thankYouUrl: redirectUrl || thankYouUrl, values });
}
