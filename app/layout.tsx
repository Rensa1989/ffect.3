import type React from "react"
import "@/app/globals.css"
import localFont from "next/font/local"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import ParallaxScript from "@/components/parallax-script"
import { ScrollRestoration } from "@/components/scroll-restoration"

const robotoThin = localFont({
  src: "../public/fonts/Roboto-Thin.ttf",
  variable: "--font-roboto-thin",
  weight: "100",
  display: "swap",
})

const rawastMedium = localFont({
  src: "../public/fonts/rawest-medium-webfont.ttf",
  variable: "--font-rawast-medium",
  weight: "500",
  display: "swap",
})

export const metadata = {
  title: "MACA - Education, Majors and Careers",
  description: "MACA provides comprehensive educational resources, career guidance, and internship opportunities.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${robotoThin.variable} ${rawastMedium.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="relative flex min-h-screen flex-col">
            <ScrollRestoration />
            <SiteHeader />
            {children}
            <SiteFooter />
            <ParallaxScript />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
