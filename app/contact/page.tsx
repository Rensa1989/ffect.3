"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [showDevNotice, setShowDevNotice] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
    newsletter: false,
    agreeTerms: false,
    website: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setShowDevNotice(true)
    }
  }, [])

  useEffect(() => {
    const subject = searchParams.get("subject")
    if (subject) {
      setFormData((prev) => ({
        ...prev,
        message: `Onderwerp: ${decodeURIComponent(subject)}\n\n`,
      }))
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Naam is verplicht"
    } else if (formData.name.length < 2 || formData.name.length > 120) {
      newErrors.name = "Naam moet tussen 2 en 120 karakters zijn"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail is verplicht"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in"
    }

    if (formData.role && (formData.role.length < 2 || formData.role.length > 120)) {
      newErrors.role = "Functie moet tussen 2 en 120 karakters zijn"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Bericht is verplicht"
    } else if (formData.message.length < 10 || formData.message.length > 3000) {
      newErrors.message = "Bericht moet tussen 10 en 3000 karakters zijn"
    }

    if (formData.organization && (formData.organization.length < 2 || formData.organization.length > 120)) {
      newErrors.organization = "Organisatie moet tussen 2 en 120 karakters zijn"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "U moet akkoord gaan met de algemene voorwaarden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.ok) {
        setShowSuccess(true)
        // Reset form
        setFormData({
          name: "",
          email: "",
          organization: "",
          role: "",
          message: "",
          newsletter: false,
          agreeTerms: false,
          website: "",
        })
        setErrors({})

        // Hide success message after 8 seconds
        setTimeout(() => setShowSuccess(false), 8000)
      } else {
        switch (result.code) {
          case "rate_limit":
            setSubmitError("Te veel verzoeken. Probeer het over 10 minuten opnieuw.")
            break
          case "validation":
            setSubmitError(result.message || "Controleer uw invoer en probeer opnieuw.")
            break
          case "email":
            setSubmitError("Ongeldig e-mailadres. Controleer uw e-mail.")
            break
          case "delivery_error":
            setSubmitError("Er ging iets mis bij het versturen. Probeer het later opnieuw.")
            break
          default:
            setSubmitError("Er ging iets mis bij het versturen. Probeer het later opnieuw.")
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError("Er ging iets mis bij het versturen. Probeer het later opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container px-4 py-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Contact</span>
          </nav>
        </div>
      </div>

      <section className="pt-16 pb-20 md:pt-12 md:pb-16">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Contact</h1>
              <div className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                <p>Neem contact op voor meer informatie</p>
                <p>over vormingen of om over uw traject af te stemmen</p>
              </div>
            </div>

            {showDevNotice && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center">
                <strong>Dev mode:</strong> E-mails worden alleen gelogd in de console.
              </div>
            )}

            {/* Success Banner */}
            {showSuccess && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                Bedankt! We hebben je bericht ontvangen.
              </div>
            )}

            {submitError && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                {submitError}
              </div>
            )}

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Contact Form - Left Column (8 columns) */}
              <div className="lg:col-span-8 order-1">
                <div className="bg-blue-50/30 p-8 rounded-3xl shadow-sm max-w-[600px]">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Uw naam *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Voer uw naam in"
                        className={`bg-white border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-green-100 h-12 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Uw e-mail *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="uw.email@voorbeeld.be"
                        className={`bg-white border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-green-100 h-12 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-2">
                        School / organisatie
                      </label>
                      <Input
                        id="organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        placeholder="Naam van uw school of organisatie"
                        className={`bg-white border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-green-100 h-12 ${
                          errors.organization ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.organization}
                        aria-describedby={errors.organization ? "organization-error" : undefined}
                      />
                      {errors.organization && (
                        <p id="organization-error" className="mt-1 text-sm text-red-600">
                          {errors.organization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                        Uw functie
                      </label>
                      <Input
                        id="role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        placeholder="Bijv. leerkracht, directeur, zorgcoördinator"
                        className={`bg-white border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-green-100 h-12 ${
                          errors.role ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.role}
                        aria-describedby={errors.role ? "role-error" : undefined}
                      />
                      {errors.role && (
                        <p id="role-error" className="mt-1 text-sm text-red-600">
                          {errors.role}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Uw bericht of beoordeling van een vorming *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Beschrijf uw vraag, interesse in een specifieke vorming, of deel uw ervaring..."
                        rows={7}
                        className={`bg-white border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-green-100 resize-none ${
                          errors.message ? "border-red-500" : ""
                        }`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", !!checked)}
                          className="mt-1 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        />
                        <label htmlFor="newsletter" className="text-sm text-slate-700 leading-relaxed">
                          Ik wil graag de nieuwsbrief ontvangen
                        </label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                          className={`mt-1 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600 ${
                            errors.agreeTerms ? "border-red-500" : ""
                          }`}
                          aria-invalid={!!errors.agreeTerms}
                          aria-describedby={errors.agreeTerms ? "agreeTerms-error" : undefined}
                        />
                        <label htmlFor="agreeTerms" className="text-sm text-slate-700 leading-relaxed">
                          Ik ga akkoord met de{" "}
                          <Link href="/algemene-voorwaarden" className="text-teal-600 hover:text-teal-700 underline">
                            algemene voorwaarden
                          </Link>
                          . *
                        </label>
                      </div>
                      {errors.agreeTerms && (
                        <p id="agreeTerms-error" className="text-sm text-red-600">
                          {errors.agreeTerms}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-green-100 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Versturen...
                        </>
                      ) : (
                        "Verstuur"
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Information - Right Column (4 columns) */}
              <div className="lg:col-span-4 order-2 lg:order-2">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h3 className="font-semibold text-slate-800 mb-4">Contactgegevens</h3>
                      <div className="space-y-2 text-slate-600">
                        <p>Kelbergenstraat 97</p>
                        <p>3290 Diest</p>
                        <p>België</p>
                        <p className="text-sm">BTW BE 0705.797.734</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <h3 className="font-semibold text-slate-800 mb-4">Direct contact</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-teal-600" />
                          <a
                            href="mailto:bert@ffect.be"
                            className="text-teal-600 hover:text-teal-700 transition-colors"
                          >
                            bert@ffect.be
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-teal-600" />
                          <a href="tel:+32495508415" className="text-teal-600 hover:text-teal-700 transition-colors">
                            +32(0)495 50 84 15
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
