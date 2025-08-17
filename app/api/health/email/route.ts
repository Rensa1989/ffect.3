import { NextResponse } from "next/server"
import { getEmailProviderStatus } from "@/lib/email-service"

export async function GET() {
  try {
    const status = getEmailProviderStatus()
    const environment = process.env.NODE_ENV || "development"
    const isProduction = environment === "production"

    const healthData = {
      status: status.ready ? "ready" : "not-ready",
      environment,
      provider: status.provider,
      hasToken: status.hasToken,
      timestamp: new Date().toISOString(),
      checks: {
        postmark: {
          configured: !!process.env.POSTMARK_TOKEN,
          ready: status.provider === "postmark" && !!process.env.POSTMARK_TOKEN,
        },
        sendgrid: {
          configured: !!process.env.SENDGRID_TOKEN,
          ready: status.provider === "sendgrid" && !!process.env.SENDGRID_TOKEN,
        },
        environment: {
          emailTo: !!process.env.EMAIL_TO,
          emailFrom: !!process.env.EMAIL_FROM,
          emailProvider: !!process.env.EMAIL_PROVIDER,
        },
      },
    }

    const warnings: string[] = []

    if (isProduction && !status.ready) {
      warnings.push("Email service not ready in production environment")
    }

    if (!process.env.EMAIL_TO) {
      warnings.push("EMAIL_TO not configured, using default")
    }

    if (!process.env.EMAIL_FROM) {
      warnings.push("EMAIL_FROM not configured, using default")
    }

    if (status.provider === "postmark" && !process.env.POSTMARK_TOKEN && !process.env.SENDGRID_TOKEN) {
      warnings.push("No email provider tokens configured")
    }

    const response = {
      ...healthData,
      warnings: warnings.length > 0 ? warnings : undefined,
    }

    const httpStatus = status.ready ? 200 : 503

    console.log(`[v0] Email health check: ${status.ready ? "READY" : "NOT READY"} - Provider: ${status.provider}`)

    return NextResponse.json(response, { status: httpStatus })
  } catch (error) {
    console.error("[v0] Email health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
