import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email-service"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Email validation regex (RFC 5322 compliant)
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

function isValidEmail(email: string): boolean {
  return emailRegex.test(email) && email.length <= 254
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return request.ip || "unknown"
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutes
  const maxRequests = 5

  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const ip = getClientIP(request)
  const userAgent = request.headers.get("user-agent") || "unknown"

  console.log(`[v0] Contact form submission from IP: ${ip}`)

  try {
    // Check rate limit first
    if (await checkRateLimit(ip)) {
      console.warn(`[v0] Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { ok: false, code: "rate_limit", message: "Te veel verzoeken. Probeer het over 10 minuten opnieuw." },
        { status: 429 },
      )
    }

    const body = await request.json()
    const {
      name = "",
      email = "",
      organization = "",
      role = "",
      message = "",
      newsletter = false,
      agreeTerms = false,
      website = "", // renamed honeypot field from hp_field to website
    } = body

    if (website !== "") {
      console.warn(`[v0] Honeypot triggered for IP: ${ip}`)
      // Return 200 OK to avoid revealing the honeypot
      return NextResponse.json({ ok: true, message: "Bedankt! We hebben je bericht ontvangen." })
    }

    // Required field validation
    if (!name || !email || !message || !agreeTerms) {
      console.warn(`[v0] Missing required fields for IP: ${ip}`)
      return NextResponse.json({ ok: false, code: "validation", message: "Vereiste velden ontbreken" }, { status: 400 })
    }

    // Length validation
    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { ok: false, code: "validation", message: "Naam moet tussen 2 en 120 karakters zijn" },
        { status: 400 },
      )
    }

    if (message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { ok: false, code: "validation", message: "Bericht moet tussen 10 en 3000 karakters zijn" },
        { status: 400 },
      )
    }

    if (organization && (organization.length < 2 || organization.length > 120)) {
      return NextResponse.json(
        { ok: false, code: "validation", message: "Organisatie moet tussen 2 en 120 karakters zijn" },
        { status: 400 },
      )
    }

    if (role && (role.length < 2 || role.length > 120)) {
      return NextResponse.json(
        { ok: false, code: "validation", message: "Functie moet tussen 2 en 120 karakters zijn" },
        { status: 400 },
      )
    }

    // Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, code: "email", message: "Ongeldig e-mailadres" }, { status: 400 })
    }

    const normalizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization.trim(),
      role: role.trim(),
      message: message.trim(),
      newsletter,
      agreeTerms,
    }

    const now = new Date()
    const localDate = now.toLocaleString("nl-NL", {
      timeZone: "Europe/Brussels",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    try {
      await sendContactEmail({
        ...normalizedData,
        ip,
        userAgent,
        isoDate: now.toISOString(),
        localDate,
      })

      const processingTime = Date.now() - startTime
      console.log(`[v0] Contact form processed successfully in ${processingTime}ms for ${normalizedData.email}`)

      return NextResponse.json({
        ok: true,
        message: "Bedankt! We hebben je bericht ontvangen.",
      })
    } catch (emailError) {
      const processingTime = Date.now() - startTime
      console.error(`[v0] Email delivery failed after ${processingTime}ms:`, emailError)

      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            ok: false,
            code: "delivery_error",
            message: "Er ging iets mis bij het versturen. Probeer het later opnieuw.",
          },
          { status: 500 },
        )
      } else {
        // In development, provide more detailed error info
        return NextResponse.json(
          {
            ok: false,
            code: "delivery_error",
            message: `Email delivery failed: ${emailError instanceof Error ? emailError.message : "Unknown error"}`,
          },
          { status: 500 },
        )
      }
    }
  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error(`[v0] Contact form error after ${processingTime}ms:`, error)

    return NextResponse.json(
      { ok: false, code: "server_error", message: "Er ging iets mis bij het versturen. Probeer het later opnieuw." },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, code: "method", message: "Method not allowed" }, { status: 405 })
}
