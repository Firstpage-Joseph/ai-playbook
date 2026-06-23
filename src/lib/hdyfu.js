// Shared helper for the landing-page lead forms.
//
// Flow: form submit success
//   -> embed the HubSpot meeting scheduler in place of the form
//   -> on "meeting booked"
//   -> /how-did-you-find-us/?thank_you=<thankYou>&email=...&utm_*=...
//   -> attribution answer
//   -> thank-you page
//
// NOTE: the HubSpot form's own "redirect to external URL" must be turned OFF in
// the HubSpot UI (set to an inline thank-you message). Otherwise HubSpot will
// navigate the page to the external meeting URL and discard the embedded meeting.

export const HDYFU_URL = 'https://www.firstpagedigital.sg/how-did-you-find-us/';
export const THANK_YOU_URL = 'https://www.firstpagedigital.sg/thank-you/';
export const MEETING_URL = 'https://meetings-na2.hubspot.com/eugen-kim/growth-session';

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

// -----------------------------------------------------------------------------
// Embedded meeting -> attribution
// -----------------------------------------------------------------------------

function loadMeetingsScript(cb) {
  if (document.querySelector('script[data-hs-meetings]')) {
    cb();
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
  s.async = true;
  s.setAttribute('data-hs-meetings', '1');
  s.onload = cb;
  s.onerror = () => console.error('Failed to load HubSpot Meetings script.');
  document.head.appendChild(s);
}

function isHubSpotMeetingsOrigin(origin) {
  try {
    const host = new URL(origin).hostname;
    return host === 'meetings.hubspot.com' || host.endsWith('.hubspot.com');
  } catch (e) {
    return false;
  }
}

function isMeetingBooked(d) {
  if (!d) return false;
  return (
    d.meetingBookSucceeded === true ||
    d.meetingBooked === true ||
    d.eventName === 'meetingBooked' ||
    d.eventName === 'scheduler:meetingBooked'
  );
}

// Replace the form container with the HubSpot meeting scheduler (prefilled), then
// redirect through the attribution page once the meeting is booked.
export function showMeetingThenHdyfu({
  targetSelector = '#hubspot-form-container',
  meetingUrl = MEETING_URL,
  values = {},
  hdyfuUrl = HDYFU_URL,
  thankYouUrl = THANK_YOU_URL,
} = {}) {
  const container = document.querySelector(targetSelector);
  if (!container) {
    // Nowhere to embed — go straight to the attribution step.
    redirectToHdyfu({ hdyfuUrl, thankYouUrl, values });
    return;
  }

  // Prefill the meeting with the captured contact details.
  let src;
  try {
    src = new URL(meetingUrl);
  } catch (e) {
    redirectToHdyfu({ hdyfuUrl, thankYouUrl, values });
    return;
  }
  src.searchParams.set('embed', 'true');
  const email = readField(values, ['email']);
  const firstname = readField(values, ['firstname']);
  const lastname = readField(values, ['lastname']);
  if (email) src.searchParams.set('email', email);
  if (firstname) src.searchParams.set('firstname', firstname);
  if (lastname) src.searchParams.set('lastname', lastname);

  const mount = document.createElement('div');
  mount.id = 'hdyfu-meeting';
  mount.style.width = '100%';
  mount.style.minHeight = '700px';
  mount.setAttribute('data-src', src.toString());

  container.innerHTML = '';
  container.appendChild(mount);

  let booked = false;
  const onMessage = (e) => {
    if (booked || !isHubSpotMeetingsOrigin(e.origin) || !isMeetingBooked(e.data)) return;
    booked = true;
    window.removeEventListener('message', onMessage);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'hubspot_meeting_booked', email: email || null });
    redirectToHdyfu({ hdyfuUrl, thankYouUrl, values });
  };
  window.addEventListener('message', onMessage);

  loadMeetingsScript(() => {
    if (window.hbspt && window.hbspt.meetings) {
      window.hbspt.meetings.create('#hdyfu-meeting');
    } else {
      console.error('HubSpot Meetings API not available.');
    }
  });
}
