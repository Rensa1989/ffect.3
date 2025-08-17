interface EmailData {
  name: string
  email: string
  organization: string
  role: string
  message: string
  newsletter: boolean
  agreeTerms: boolean
  ip: string
  userAgent: string
  isoDate: string
  localDate: string
}

interface EmailConfig {
  provider: string
  emailTo: string
  emailFrom: string
}

function generateTextEmail(data: EmailData): string {
  return `Nieuw bericht via contactformulier (ffect.be)

Naam: ${data.name}
E-mail: ${data.email}
School / organisatie: ${data.organization || "—"}
Functie: ${data.role || "—"}
Nieuwsbrief: ${data.newsletter ? "Ja" : "Nee"}
Akkoord AV: ${data.agreeTerms ? "Ja" : "Nee"}

Bericht:
${data.message}

---
Verzenddatum: ${data.localDate} (${data.isoDate} UTC)
IP: ${data.ip}
User Agent: ${data.userAgent}`
}

function generateHtmlEmail(data: EmailData): string {
  const escape = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

  return `<table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Roboto', Arial, sans-serif; color:#101321; font-size:15px; line-height:1.6; max-width:680px; margin:0 auto;">
  <tr><td style="padding:16px 0; font-size:20px; font-weight:500; font-family: 'Rawast', Arial, sans-serif;">Nieuw bericht via contactformulier (ffect.be)</td></tr>
  <tr><td><hr style="border:0;border-top:1px solid #E8EDF4"></td></tr>
  <tr><td style="padding:8px 0;"><strong>Naam:</strong> ${escape(data.name)}</td></tr>
  <tr><td style="padding:8px 0;"><strong>E-mail:</strong> <a href="mailto:${escape(data.email)}">${escape(data.email)}</a></td></tr>
  <tr><td style="padding:8px 0;"><strong>School / organisatie:</strong> ${escape(data.organization || "—")}</td></tr>
  <tr><td style="padding:8px 0;"><strong>Functie:</strong> ${escape(data.role || "—")}</td></tr>
  <tr><td style="padding:8px 0;"><strong>Nieuwsbrief:</strong> ${data.newsletter ? "Ja" : "Nee"}</td></tr>
  <tr><td style="padding:8px 0;"><strong>Akkoord AV:</strong> ${data.agreeTerms ? "Ja" : "Nee"}</td></tr>
  <tr><td style="padding:16px 0;"><strong>Bericht:</strong><br><div style="white-space:pre-wrap;background:#F7FAFE;border:1px solid #E8EDF4;border-radius:8px;padding:16px;margin-top:8px;">${escape(data.message)}</div></td></tr>
  <tr><td style="padding-top:16px; font-size:12px; color:#5B6673; border-top:1px solid #E8EDF4;">
    <strong>Verzenddatum:</strong> ${escape(data.localDate)} (${escape(data.isoDate)} UTC)<br>
    <strong>IP:</strong> ${escape(data.ip)}<br>
    <strong>User Agent:</strong> ${escape(data.userAgent)}
  </td></tr>
</table>`
}

async function sendViaPostmark(
  config: EmailConfig,
  data: EmailData,
  subject: string,
  htmlContent: string,
  textContent: string,
): Promise<void> {
  const token = process.env.POSTMARK_TOKEN
  if (!token) {
    throw new Error("POSTMARK_TOKEN not configured")
  }

  console.log(`[v0] Sending email via Postmark to ${config.emailTo}`)
  const startTime = Date.now()

  try {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": token,
      },
      body: JSON.stringify({
        From: config.emailFrom,
        To: config.emailTo,
        ReplyTo: data.email,
        Subject: subject,
        HtmlBody: htmlContent,
        TextBody: textContent,
      }),
    })

    const latency = Date.now() - startTime

    if (!response.ok) {
      const error = await response.text()
      console.error(`[v0] Postmark API error (${response.status}): ${error}`)
      throw new Error(`Postmark API error: ${response.status} ${error}`)
    }

    const result = await response.json()
    console.log(`[v0] Email sent successfully via Postmark (${latency}ms) - MessageID: ${result.MessageID}`)
  } catch (error) {
    const latency = Date.now() - startTime
    console.error(`[v0] Postmark send failed (${latency}ms):`, error)
    throw error
  }
}

async function sendViaSendGrid(
  config: EmailConfig,
  data: EmailData,
  subject: string,
  htmlContent: string,
  textContent: string,
): Promise<void> {
  const token = process.env.SENDGRID_TOKEN
  if (!token) {
    throw new Error("SENDGRID_TOKEN not configured")
  }

  console.log(`[v0] Sending email via SendGrid to ${config.emailTo}`)
  const startTime = Date.now()

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: config.emailTo }],
            subject: subject,
          },
        ],
        from: { email: config.emailFrom },
        reply_to: { email: data.email },
        content: [
          { type: "text/plain", value: textContent },
          { type: "text/html", value: htmlContent },
        ],
      }),
    })

    const latency = Date.now() - startTime

    if (!response.ok) {
      const error = await response.text()
      console.error(`[v0] SendGrid API error (${response.status}): ${error}`)
      throw new Error(`SendGrid API error: ${response.status} ${error}`)
    }

    console.log(`[v0] Email sent successfully via SendGrid (${latency}ms)`)
  } catch (error) {
    const latency = Date.now() - startTime
    console.error(`[v0] SendGrid send failed (${latency}ms):`, error)
    throw error
  }
}

export async function sendContactEmail(data: EmailData): Promise<void> {
  const config: EmailConfig = {
    provider: process.env.EMAIL_PROVIDER || "postmark",
    emailTo: process.env.EMAIL_TO || "bert@ffect.be",
    emailFrom: process.env.EMAIL_FROM || "no-reply@ffect.be",
  }

  const subject = `Nieuw bericht via contactformulier (ffect.be)`
  const textContent = generateTextEmail(data)
  const htmlContent = generateHtmlEmail(data)

  const isProduction = process.env.NODE_ENV === "production"
  const hasPostmarkToken = !!process.env.POSTMARK_TOKEN
  const hasSendGridToken = !!process.env.SENDGRID_TOKEN

  // Log attempt
  console.log(
    `[v0] Email send attempt - Provider: ${config.provider}, Environment: ${process.env.NODE_ENV || "development"}`,
  )

  // Production behavior: fail hard if no tokens
  if (isProduction) {
    if (config.provider === "postmark" && !hasPostmarkToken) {
      console.error("[v0] PRODUCTION ERROR: POSTMARK_TOKEN not configured")
      throw new Error("Email service misconfigured - POSTMARK_TOKEN missing")
    }
    if (config.provider === "sendgrid" && !hasSendGridToken) {
      console.error("[v0] PRODUCTION ERROR: SENDGRID_TOKEN not configured")
      throw new Error("Email service misconfigured - SENDGRID_TOKEN missing")
    }
  }

  // Development behavior: log to console if no tokens
  if (!isProduction) {
    if (
      (config.provider === "postmark" && !hasPostmarkToken) ||
      (config.provider === "sendgrid" && !hasSendGridToken)
    ) {
      console.log("[v0] DEV MODE: Email tokens not configured, logging to console")
      console.log("=== EMAIL PAYLOAD (DEV MODE) ===")
      console.log("To:", config.emailTo)
      console.log("From:", config.emailFrom)
      console.log("Reply-To:", data.email)
      console.log("Subject:", subject)
      console.log("---")
      console.log(textContent)
      console.log("=== END EMAIL PAYLOAD ===")
      return
    }
  }

  // Try primary provider, fallback to secondary
  try {
    if (config.provider === "postmark" && hasPostmarkToken) {
      await sendViaPostmark(config, data, subject, htmlContent, textContent)
      console.log("[v0] Email queued successfully via Postmark")
    } else if (config.provider === "sendgrid" && hasSendGridToken) {
      await sendViaSendGrid(config, data, subject, htmlContent, textContent)
      console.log("[v0] Email queued successfully via SendGrid")
    } else {
      // Fallback logic
      if (hasPostmarkToken) {
        console.log("[v0] Falling back to Postmark")
        await sendViaPostmark(config, data, subject, htmlContent, textContent)
        console.log("[v0] Email queued successfully via Postmark (fallback)")
      } else if (hasSendGridToken) {
        console.log("[v0] Falling back to SendGrid")
        await sendViaSendGrid(config, data, subject, htmlContent, textContent)
        console.log("[v0] Email queued successfully via SendGrid (fallback)")
      } else {
        throw new Error("No email provider tokens configured")
      }
    }
  } catch (error) {
    console.error("[v0] Email send failed:", error)

    if (isProduction) {
      throw new Error("Failed to deliver email - please try again later")
    } else {
      console.warn("[v0] Email failed in development, continuing...")
      throw error // Still throw in dev for debugging
    }
  }
}

export function getEmailProviderStatus(): { provider: string; ready: boolean; hasToken: boolean } {
  const provider = process.env.EMAIL_PROVIDER || "postmark"
  const hasPostmarkToken = !!process.env.POSTMARK_TOKEN
  const hasSendGridToken = !!process.env.SENDGRID_TOKEN

  let ready = false
  let hasToken = false

  if (provider === "postmark" && hasPostmarkToken) {
    ready = true
    hasToken = true
  } else if (provider === "sendgrid" && hasSendGridToken) {
    ready = true
    hasToken = true
  } else if (hasPostmarkToken || hasSendGridToken) {
    ready = true // Can fallback
    hasToken = true
  }

  return { provider, ready, hasToken }
}

export type { EmailData }
