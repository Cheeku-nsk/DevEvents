'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return

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

        let url = window.origin + pathname
        const search = searchParams.toString()
        if (search) url += '?' + search
        posthog.capture('$pageview', { $current_url: url })
      } catch (err) {
        // ignore client-side telemetry failures
        // console.debug('PostHog init failed', err)
      }
    })()

    return () => {
      mounted = false
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
