'use client'

import { useEffect } from 'react'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const posthogModule = await import('posthog-js')
        const posthog = posthogModule?.default ?? posthogModule

        if (!mounted) return

        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          person_profiles: 'identified_only',
          capture_pageview: false,
          capture_pageleave: true,
        })

        // Read location after mount to avoid accessing request-scoped data during prerender
        const url = window.location.href
        posthog.capture('$pageview', { $current_url: url })
      } catch (err) {
        // ignore client-side telemetry failures
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return <>{children}</>
}
