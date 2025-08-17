"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Disable browser's default scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  useEffect(() => {
    // Routes that should always scroll to top
    const scrollToTopRoutes = ["/aanbod/", "/reviews", "/contact", "/privacybeleid", "/algemene-voorwaarden"]

    // Check if current path should scroll to top
    const shouldScrollToTop = scrollToTopRoutes.some((route) => pathname === route || pathname.startsWith(route))

    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }, [pathname])

  return null
}
