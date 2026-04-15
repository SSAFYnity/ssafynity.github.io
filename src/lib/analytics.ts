const GA_MEASUREMENT_ID = 'G-2W9HFYG765'
const GOOGLE_TAG_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    __gaInitialized?: boolean
  }
}

function isAnalyticsEnabled() {
  return import.meta.env.PROD && typeof window !== 'undefined' && GA_MEASUREMENT_ID.length > 0
}

export function initializeGoogleAnalytics() {
  if (!isAnalyticsEnabled()) {
    return
  }

  if (!document.querySelector(`script[src="${GOOGLE_TAG_URL}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = GOOGLE_TAG_URL
    document.head.appendChild(script)
  }

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }

  if (window.__gaInitialized) {
    return
  }

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  })
  window.__gaInitialized = true
}

export function trackPageView(path: string, title: string) {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return
  }

  window.gtag('event', 'page_view', {
    page_title: title,
    page_path: path,
    page_location: new URL(path, window.location.origin).toString(),
  })
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return
  }

  window.gtag('event', eventName, {
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    ...params,
  })
}
