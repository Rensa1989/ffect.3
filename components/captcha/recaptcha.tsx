"use client"

import { useEffect, useState } from "react"

interface ReCaptchaProps {
  siteKey: string
  onVerify: (token: string) => void
  onError?: () => void
  action?: string
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function ReCaptcha({ siteKey, onVerify, onError, action = "contact" }: ReCaptchaProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [siteKey])

  const executeRecaptcha = async () => {
    if (!isLoaded || !window.grecaptcha) {
      onError?.()
      return
    }

    try {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action })
          onVerify(token)
        } catch (error) {
          console.error("reCAPTCHA execution failed:", error)
          onError?.()
        }
      })
    } catch (error) {
      console.error("reCAPTCHA error:", error)
      onError?.()
    }
  }

  useEffect(() => {
    if (isLoaded) {
      executeRecaptcha()
    }
  }, [isLoaded])

  // reCAPTCHA v3 is invisible, so we return null
  return null
}
