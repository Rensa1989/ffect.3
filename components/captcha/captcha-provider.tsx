"use client"

import { Turnstile } from "./turnstile"
import { ReCaptcha } from "./recaptcha"

interface CaptchaProviderProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

export function CaptchaProvider({ onVerify, onError, onExpire }: CaptchaProviderProps) {
  const captchaProvider = process.env.NEXT_PUBLIC_CAPTCHA_PROVIDER || "turnstile"

  // Cloudflare Turnstile test keys - "1x00000000000000000000AA" always passes
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE || "1x00000000000000000000AA"

  // Google reCAPTCHA test key (this is a public test key from Google's documentation)
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

  if (captchaProvider === "turnstile" && turnstileSiteKey) {
    return (
      <Turnstile
        siteKey={turnstileSiteKey}
        onVerify={onVerify}
        onError={onError}
        onExpire={onExpire}
        theme="auto"
        size="normal"
      />
    )
  }

  if (captchaProvider === "recaptcha" && recaptchaSiteKey) {
    return <ReCaptcha siteKey={recaptchaSiteKey} onVerify={onVerify} onError={onError} action="contact" />
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-sm text-yellow-800">Captcha niet geconfigureerd. Contacteer de beheerder.</p>
    </div>
  )
}
