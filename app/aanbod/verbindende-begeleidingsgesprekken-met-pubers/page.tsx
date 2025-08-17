"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone } from "lucide-react"
import { useEffect } from "react"
import { AanbodGoalsTargetGroup } from "@/components/aanbod-goals-target-group"

export default function VerbindendeBegeleidingsgesprekkel() {
  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    // Additional scroll to top after a brief delay to ensure it works
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const goals = [
    "Je kan de basisprincipes van verbindende communicatie en relatieverbetering toepassen.",
    "Je ervaart het belang van verbindende communicatie.",
    "Je maakt kennis met kaders en handvaten waarmee je effectief verbindend kan communiceren. Deze praktische hulpmiddelen helpen je bij het structureren van gesprekken en het behouden of verbeteren van je relaties.",
    "Je leert de kracht van empathisch luisteren toepassen in gesprekken.",
    "Je krijgt inzicht in wat tot zelfreflectie bij leerlingen leidt en hoe dit het welbevinden en de onderlinge relaties bevordert.",
  ]

  const targetGroups = [
    "Leerkrachten",
    "Directies/middenkader",
    "Leerlingbegeleiders",
    "Zorgcoördinatoren",
    "Secretariaatsmedewerkers",
    "CLB-medewerkers",
    "Leerondersteuners",
    "Internaatmedewerkers",
  ]

  return (
    <div className="bg-white pt-8">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/aanbod" className="hover:text-teal-600 transition-colors">
              Aanbod
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Verbindende begeleidingsgesprekken met pubers</span>
          </div>
        </div>
      </nav>

      {/* Back Link */}
      <div className="container mx-auto px-4 max-w-4xl py-6">
        <Link
          href="/aanbod"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar aanbod
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/verbindende%20begeleidingsgesprekken%20met%20pubers.jpg-Frat2mIDVNq3pfrmtGowcbM5ccZBeV.jpeg"
            alt="Verbindende begeleidingsgesprekken met pubers: Veilige klasgroep, preventie, groepsdynamiek en succesvol herstellen"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Verbindende begeleidingsgesprekken met pubers
        </h1>
        <p className="text-xl text-slate-600 mb-8">Inzetten op een verbindend klas- en schoolklimaat</p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Een verbindend klas- en schoolklimaat is essentieel voor het creëren van een positief groeiproces voor ons
            allemaal. Het gaat erom dat we luisteren naar elkaar, begrip tonen en steeds verbinding behouden met alle
            partijen.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            In deze vorming verdiepen we samen in verbindende communicatie en effectieve relatieverbetering. We bieden
            je duidelijke kaders en handvaten om je communicatie en je persoonlijke relaties met jouw leerlingen te
            verbeteren.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            We introduceren je aan een gestructureerd 5-stappenmodel dat je helpt bij het opbouwen en behouden van
            sterke, gezonde relaties door middel van effectieve communicatiestrategieën. We zullen ook praktische tips
            delen die je direct kunt toepassen in je dagelijkse interacties.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Luisteren is een van de meest krachtige middelen in communicatie. Door ècht te luisteren, laat je zien dat
            je de ander waardeert en respecteert. Je leert en oefent in hoe dit bij anderen kan aanzetten tot
            zelfreflectie en krijgt inzicht hoe dit het welbevinden bevordert.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Deze vorming bied je waardevolle inzichten en praktische handvaten om je relaties te verbeteren en zullen
            een positieve impact te hebben op het gedrag van de jongeren die jij begeleidt.
          </p>

          <AanbodGoalsTargetGroup goals={goals} targetGroups={targetGroups} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Interesse in deze vorming?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Neem vrijblijvend contact op om te bespreken hoe we samen een boeiende, inspirerende en kwalitatieve vorming
            kunnen realiseren voor jouw team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="w-5 h-5 mr-2" />
            Neem contact op
          </Link>
        </div>
      </section>
    </div>
  )
}
