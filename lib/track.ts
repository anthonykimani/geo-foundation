import posthog from 'posthog-js'

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  try {
    posthog.capture(eventName, {
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...properties,
    })
  } catch {
    // Silently fail
  }
}
