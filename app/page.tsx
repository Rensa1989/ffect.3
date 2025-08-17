"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, GraduationCap, Users, Target, Book, Star, Quote } from "lucide-react"
import Image from "next/image"

const REVIEWS = [
  {
    quote:
      "Dankjewel Bert, het was een zeer goede vorming! En jouw enthousiasme werkt echt super aanstekelijk. Wat zalig om je gedrevenheid te voelen tijdens de hele dag!",
    role: "Leerkracht Basisonderwijs",
  },
  {
    quote:
      "Bedankt voor het bezorgen van de hand-outs! De deelnemers waren in ieder geval heel enthousiast na de opleiding. Ze vonden het een interessante cursus met onmiddellijk toepasbare handvaten. Ze vonden jou als lesgever ook top.",
    role: "Directie Secundair Onderwijs",
  },
  {
    quote: "Bedankt voor de leerrijke bijscholing, je enthousiasme, de hands-outs, je aanpak en de zeer concrete tips.",
    role: "Zorgcoördinator",
  },
  {
    quote:
      "Bedankt voor de presentatie en zeker ook bedankt voor de interessante bijscholing. We zijn er bij ons op school direct mee aan de slag gegaan. We gaan je zeker op de hoogte houden.",
    role: "Team Secundair Onderwijs",
  },
  {
    quote:
      "Ik ben afgelopen week écht al aan de slag gegaan met verschillende tips en voel me gemotiveerd. Dat was exact wat ik nodig had en ik kan niet wachten om alle tips te delen met andere collega's.",
    role: "Leerkracht",
  },
  {
    quote:
      "Bedankt voor de zeer interessante dag. We appreciëren het enorm dat je van je programma bent afgeweken toen je merkte dat de noden elders lagen. Dit was wat we nodig hadden en gaf ons echt veel vertrouwen. Je hebt onze batterijen terug opgeladen!",
    role: "Team Lager Onderwijs",
  },
  {
    quote:
      "Heel wat topics waren nieuw voor me en lijken me zeker de moeite om te implementeren in mijn ondersteuningen. Je hebt de vorming trouwens zeer boeiend en aanstekelijk gebracht! Doe zo verder zou ik zeggen. Graag tot een volgende keer.",
    role: "Leerondersteuner",
  },
  {
    quote:
      "Ik wil je op mijn beurt ook nog eens bedanken voor de vorming van gisteren. Je hebt jouw enthousiasme helemaal overgedragen op mij. Ik ben vandaag al aan de slag gegaan met de 'double E' klasopstelling. Fijn dat mijn leerlingen mee willen experimenteren.",
    role: "Leerkracht",
  },
  {
    quote:
      "Waauw, Bert. Dat was de eerste keer dat ik na een studiedag zo goed gezind naar huis keerde. Iedereen was super enthousiast en vooral voldaan na deze dag vol tips en trucs! Dankjewel en tot snel nog eens.",
    role: "Deelnemer Studiedag",
  },
]

function pickRandom<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isCollabHovered, setIsCollabHovered] = useState(false)
  const [isKennismakingHovered, setIsKennismakingHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleReviews, setVisibleReviews] = useState<typeof REVIEWS>([])
  const [reviewRotationPaused, setReviewRotationPaused] = useState(false)

  const animatedTexts = ["het verschil maken", "blijven hangen", "op maat ontworpen worden", "blijvend effect hebben"]

  useEffect(() => {
    setVisibleReviews(pickRandom(REVIEWS, 3))
  }, [])

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || isPaused) {
      return
    }

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length)
    }, 2400) // Reduced from 3900ms to 2400ms for quicker animation (2s visible + 0.4s transition)

    return () => clearInterval(interval)
  }, [isPaused, animatedTexts.length])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || reviewRotationPaused || visibleReviews.length === 0) {
      return
    }

    const interval = setInterval(() => {
      setVisibleReviews((current) => {
        const availableReviews = REVIEWS.filter((review) => !current.includes(review))
        if (availableReviews.length === 0) return current

        const randomIndex = Math.floor(Math.random() * current.length)
        const newReview = availableReviews[Math.floor(Math.random() * availableReviews.length)]
        const updated = [...current]
        updated[randomIndex] = newReview
        return updated
      })
    }, 15000) // Changed from 8000ms to 15000ms (15 seconds)

    return () => clearInterval(interval)
  }, [reviewRotationPaused, visibleReviews.length])

  return (
    <div className="flex flex-col min-h-screen" id="top">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[hsl(var(--fitect-navy))] text-white py-12 md:py-24">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="grid gap-5 md:gap-8 lg:gap-14 xl:gap-16 grid-cols-1 lg:grid-cols-[1fr,auto] items-stretch">
              <div className="flex flex-col h-full">
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-[clamp(40px,5.5vw,64px)] font-bold leading-[1.05] tracking-tight text-white">
                    vormingen en trajecten
                  </h1>

                  <div className="flex flex-wrap items-baseline gap-2 mt-3 md:flex-nowrap">
                    <span className="text-[clamp(18px,1.8vw,24px)] font-semibold text-blue-100 whitespace-nowrap">
                      die écht
                    </span>{" "}
                    {/* Reduced font size from clamp(22px,2.2vw,30px) to clamp(18px,1.8vw,24px) and added whitespace-nowrap */}
                    <span
                      className="dyn-wrap relative inline-block whitespace-nowrap align-baseline md:whitespace-nowrap"
                      style={{ "--dyn-min": "28ch", minWidth: "var(--dyn-min)" } as React.CSSProperties}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      aria-live="polite"
                    >
                      {animatedTexts.map((text, index) => (
                        <span
                          key={text}
                          className={`absolute top-0 left-0 text-[clamp(28px,2.6vw,40px)] font-bold text-[hsl(var(--fitect-teal))] transition-all duration-400 ease-out leading-[1.1] z-10 ${
                            index === currentTextIndex
                              ? "opacity-100 transform translate-y-0"
                              : "opacity-0 transform translate-y-2"
                          }`}
                          aria-hidden={index !== currentTextIndex}
                        >
                          {text}
                        </span>
                      ))}
                      <span
                        className="invisible text-[clamp(28px,2.6vw,40px)] font-bold leading-[1.1]"
                        aria-hidden="true"
                      >
                        op maat ontworpen worden
                      </span>
                    </span>
                  </div>
                  <div className="mb-2 md:mb-0"></div>
                </div>

                <div className="mt-4 md:mt-auto relative z-0">
                  <div className="text-blue-100 text-[clamp(16px,1.4vw,18px)] leading-[1.6] max-w-[68ch]">
                    <p>
                      Met meer dan <span className="font-semibold text-white">25 jaar ervaring</span> in het onderwijs
                      bied ik <span className="font-semibold text-white">interactieve</span> vormingen en trajecten die
                      écht het verschil maken. Altijd <span className="font-semibold text-white">op maat</span>,
                      praktisch en <span className="font-semibold text-white">wetenschappelijk onderbouwd</span> voor
                      een <span className="font-semibold text-white">blijvend effect</span> tot in de klas. Samen werken
                      we aan <span className="font-semibold text-white">groei</span>,{" "}
                      <span className="font-semibold text-white">verbinding</span> en{" "}
                      <span className="font-semibold text-white">duurzame verandering</span> voor scholen en teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[300px] lg:h-[400px] aspect-[16/11] rounded-lg overflow-hidden">
                  <Image
                    src="/foto-1.jpg"
                    alt="Professional presenter in training environment"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-center italic text-lg font-medium">
                      Wat als een studiedag écht iets in beweging zet?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-teal-50 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter text-[hsl(var(--fitect-navy))]">
                <span className="font-bold">Interactieve opleidingen en trajecten</span> met direct en{" "}
                <span className="font-bold">blijvend effect</span>
              </h2>
              <p className="mt-6 text-gray-700 md:text-lg max-w-4xl mx-auto leading-relaxed">
                De vormingen richten zich tot leerkrachten, leerlingbegeleiders, zorgcoördinatoren, directies,
                begeleiders buitenschoolse opvang, secretariaatsmedewerkers, CLB-medewerkers, internaatmedewerkers, maar
                ook tot ouders en alle andere geïnteresseerde onderwijsprofessionals. Steeds vanuit{" "}
                <span className="font-bold">eigen praktijkervaring</span>, een{" "}
                <span className="font-bold">duidelijke visie</span> en{" "}
                <span className="font-bold">wetenschappelijke kaders</span> als fundament.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--fitect-navy))] via-slate-800 to-[hsl(var(--fitect-teal))] p-8 md:p-12">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center space-y-6">
                  <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    Zijn jullie op zoek naar een interactieve studiedag voor jullie team, scholengroep of lezing voor
                    ouders? Neem dan zeker vrijblijvend contact op om af te stemmen hoe we samen een boeiende,
                    inspirerende en kwalitatieve vorming kunnen realiseren.
                  </p>

                  <div className="pt-4">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="bg-white text-[hsl(var(--fitect-navy))] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        mail hier voor een gratis adviesgesprek
                        {isHovered ? (
                          <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300" />
                        ) : (
                          <Phone className="ml-3 h-5 w-5 transition-all duration-300" />
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <GraduationCap className="h-12 w-12 text-[hsl(var(--fitect-navy))]" />
                    </div>
                    <p className="text-[hsl(var(--fitect-navy))] font-semibold text-sm md:text-base">
                      +25 jaar expertise
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <Users className="h-12 w-12 text-[hsl(var(--fitect-navy))]" />
                    </div>
                    <p className="text-[hsl(var(--fitect-navy))] font-semibold text-sm md:text-base">interactief</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <Target className="h-12 w-12 text-[hsl(var(--fitect-navy))]" />
                    </div>
                    <p className="text-[hsl(var(--fitect-navy))] font-semibold text-sm md:text-base">op maat</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <Book className="h-12 w-12 text-[hsl(var(--fitect-navy))]" />
                    </div>
                    <p className="text-[hsl(var(--fitect-navy))] font-semibold text-sm md:text-base">
                      wetenschappelijk
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bert Vanhees Profile Section */}
        <section id="wie-ben-ik" className="section--white py-12 md:py-24" data-parallax-section>
          <div className="parallax-bg parallax-bg--expertise" aria-hidden="true">
            <img src="/logo-white.png" alt="" />
          </div>
          <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center max-w-6xl mx-auto">
              <div className="relative w-full max-w-sm mx-auto h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
                <Image
                  src="/foto-2.jpg"
                  alt="Bert Vanhees - Educational Expert"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="space-y-8 order-1 lg:order-2 px-4 lg:px-0">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[hsl(var(--fitect-navy))] leading-tight">
                  meer dan 25 jaar expertise in onderwijs en ondersteuning
                </h2>

                <p className="text-gray-700 text-lg leading-relaxed">
                  Mijn naam is <span className="font-bold">Bert Vanhees</span> en sinds{" "}
                  <span className="font-bold">1997</span> actief in het onderwijs. Met meer dan{" "}
                  <span className="font-bold">25 jaar ervaring</span> ondersteunde en begeleidde ik al{" "}
                  <span className="font-bold">+70 scholen</span> in het buitengewoon en het regulier onderwijs.
                </p>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[hsl(var(--fitect-navy))]" />
                  <p className="text-gray-700 leading-relaxed">
                    Mijn carrière begon in het <span className="font-bold">buitengewoon onderwijs</span>, waar ik werkte
                    met jongeren met ernstige <span className="font-bold">gedrags- en emotionele moeilijkheden</span>,
                    vaak in combinatie met <span className="font-bold">autisme</span>. Later breidde ik mijn expertise
                    uit naar interne en externe <span className="font-bold">leerlingbegeleiding</span>.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[hsl(var(--fitect-navy))]" />
                  <p className="text-gray-700 leading-relaxed">
                    Na <span className="font-bold">11 jaar</span> schakelde ik over naar het{" "}
                    <span className="font-bold">regulier onderwijs</span>, waar ik begeleiding gaf op kleuter-, lager-,
                    secundair en hoger onderwijsniveau. Daarnaast werkte ik ook als{" "}
                    <span className="font-bold">pedagogisch coördinator</span> en was ik vanaf deze periode{" "}
                    <span className="font-bold">gastspreker</span> in verschillende hogescholen, onderwijsnetten en
                    vormingscentra.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[hsl(var(--fitect-navy))]" />
                  <p className="text-gray-700 leading-relaxed">
                    Vandaag werk ik deeltijds als <span className="font-bold">leerondersteuner</span>. Ik help scholen
                    bij het ontwikkelen van gerichte <span className="font-bold">ondersteuningstrajecten</span> voor
                    leerlingen én <span className="font-bold">schoolteams</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Collaboration CTA Block */}
            <div className="max-w-4xl mx-auto mt-16">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--fitect-navy))] via-slate-800 to-[hsl(var(--fitect-teal))] p-8 md:p-12">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center space-y-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold">samenwerken?</h3>
                  <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    Zoek je expertise in leerlingbegeleiding, gedragsproblematieken, attitudebeleid of inclusie in jouw
                    school?
                  </p>

                  <div className="pt-4">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="bg-white text-[hsl(var(--fitect-navy))] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onMouseEnter={() => setIsCollabHovered(true)}
                        onMouseLeave={() => setIsCollabHovered(false)}
                      >
                        ontvang een aanbod op maat
                        {isCollabHovered ? (
                          <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300" />
                        ) : (
                          <Phone className="ml-3 h-5 w-5 transition-all duration-300" />
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section id="missie-visie" className="bg-[hsl(var(--fitect-navy))] py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {/* Header Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 shadow-2xl">
              <Image
                src="/girl-binoculars.jpg"
                alt="Child exploring with binoculars - representing curiosity and discovery in education"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="max-w-6xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white tracking-tight mb-8">
                missie & visie
              </h2>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute -top-4 -left-4 text-6xl md:text-8xl text-[hsl(var(--fitect-teal))] opacity-30 font-serif">
                  "
                </div>
                <div className="bg-gradient-to-r from-[hsl(var(--fitect-teal))]/10 to-blue-500/10 rounded-2xl p-6 md:p-8 border-l-4 border-[hsl(var(--fitect-teal))] backdrop-blur-sm">
                  <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-center relative z-10">
                    De maatschappij is in volle verandering en dit brengt heel wat teweeg. Samen op weg gaan, elkaar
                    inspireren en versterken zijn essentieel om iedereen in maximale groei te kunnen zetten.
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 text-6xl md:text-8xl text-[hsl(var(--fitect-teal))] opacity-30 font-serif rotate-180">
                  "
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-blue-100 text-xl md:text-2xl leading-relaxed text-center font-light">
                  Via <span className="font-bold text-[hsl(var(--fitect-teal))] text-xl md:text-2xl">vijf pijlers</span>{" "}
                  tracht ik de visie rond alle trajecten vorm te geven. Bij het opstellen van deze vijf kernwaarden die
                  de organisatie typeert, heb ik me gebaseerd op het{" "}
                  <span className="font-bold text-[hsl(var(--fitect-teal))] text-xl md:text-2xl">AMORE-PRINCIPE</span>{" "}
                  (ambitieus, motiverend, onderscheidend, relevant, echt en eenvoudig).
                </p>
              </div>

              <div className="space-y-12">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-[hsl(var(--fitect-teal))] mb-12">
                  De 5 pijlers
                </h3>

                {/* First row - 3 items */}
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Persoonlijke groei */}
                  <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
                    <h4 className="text-2xl font-bold text-[hsl(var(--fitect-navy))] mb-6 group-hover:text-[hsl(var(--fitect-teal))] transition-colors duration-300">
                      persoonlijke groei
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      In de aangeboden opleidingen staat <span className="font-semibold">persoonlijke groei</span>{" "}
                      centraal. Telkens vanuit het geloof dat iedereen het potentieel heeft om te{" "}
                      <span className="font-semibold">excelleren</span> en uitgedaagd moet worden om{" "}
                      <span className="font-semibold">talenten</span> te ontdekken, herkennen, erkennen en verder te
                      ontwikkelen.
                    </p>
                  </div>

                  {/* Interactief */}
                  <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
                    <h4 className="text-2xl font-bold text-[hsl(var(--fitect-navy))] mb-6 group-hover:text-[hsl(var(--fitect-teal))] transition-colors duration-300">
                      interactief
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Tijdens de studiedagen en trajecten werk ik steeds met een{" "}
                      <span className="font-semibold">interactieve benadering</span>, waarbij gebruik gemaakt wordt van{" "}
                      <span className="font-semibold">kaders</span>, <span className="font-semibold">handvaten</span> en{" "}
                      <span className="font-semibold">wetenschappelijk onderzoek</span> om elke opleiding te
                      onderbouwen.
                    </p>
                  </div>

                  {/* Met effect */}
                  <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
                    <h4 className="text-2xl font-bold text-[hsl(var(--fitect-navy))] mb-6 group-hover:text-[hsl(var(--fitect-teal))] transition-colors duration-300">
                      met effect
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Deze <span className="font-semibold">wisselwerking</span> en het inzetten op{" "}
                      <span className="font-semibold">persoonlijke groei</span> zorgen ervoor dat de kennis en
                      vaardigheden die worden opgedaan een{" "}
                      <span className="font-semibold">direct en blijvend effect</span> hebben.
                    </p>
                  </div>
                </div>

                {/* Second row - 2 centered items */}
                <div className="flex justify-center">
                  <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
                    {/* Ervaringsgericht */}
                    <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
                      <h4 className="text-2xl font-bold text-[hsl(var(--fitect-navy))] mb-6 group-hover:text-[hsl(var(--fitect-teal))] transition-colors duration-300">
                        ervaringsgericht
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        De trainingen en workshops zijn <span className="font-semibold">ervaringsgericht</span>, waarbij
                        alle deelnemers <span className="font-semibold">actief betrokken</span>
                        worden. Dit zorgt niet alleen voor een diepere verankering van de geleerde concepten, maar maakt
                        het ook mogelijk om direct te <span className="font-semibold">reflecteren</span> op en te{" "}
                        <span className="font-semibold">leren van eigen ervaringen</span>.
                      </p>
                    </div>

                    {/* Inspirerend */}
                    <div className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
                      <h4 className="text-2xl font-bold text-[hsl(var(--fitect-navy))] mb-6 group-hover:text-[hsl(var(--fitect-teal))] transition-colors duration-300">
                        inspirerend
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        Elke werkomgeving is <span className="font-semibold">uniek</span> en daarom worden alle
                        vormingen <span className="font-semibold">op maat aangepast</span> om aan te sluiten bij de
                        specifieke behoeften en uitdagingen van jullie organisatie. Door deze aanpak wordt een
                        leeromgeving gecreëerd die niet alleen <span className="font-semibold">inspirerend</span> is,
                        maar ook <span className="font-semibold">direct toepasbaar</span> en relevant voor jullie{" "}
                        <span className="font-semibold">dagelijkse praktijk</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section--white py-16 md:py-20" data-parallax-section>
          <div className="parallax-bg parallax-bg--long" aria-hidden="true">
            <img src="/logo-white.png" alt="" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--fitect-navy))] via-slate-800 to-[hsl(var(--fitect-teal))] p-8 md:p-12">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center space-y-6">
                  <p className="text-white text-2xl md:text-3xl leading-loose max-w-4xl mx-auto">
                    Samen bouwen aan een optimale werk-, leer- en leefomgeving waarin persoonlijke groei en
                    professionele ontwikkeling hand in hand gaan, met de focus op een direct en duurzaam effect tot op
                    de werk- of klasvloer.
                  </p>

                  <div className="pt-4">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="bg-white text-[hsl(var(--fitect-navy))] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onMouseEnter={() => setIsKennismakingHovered(true)}
                        onMouseLeave={() => setIsKennismakingHovered(false)}
                      >
                        plan vrijblijvend een kennismakingsgesprek
                        {isKennismakingHovered ? (
                          <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300" />
                        ) : (
                          <Phone className="ml-3 h-5 w-5 transition-all duration-300" />
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          className="bg-[#E5FFD5]/15 pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
          onMouseEnter={() => setReviewRotationPaused(true)}
          onMouseLeave={() => setReviewRotationPaused(false)}
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              role="region"
              aria-live="polite"
              aria-label="Customer reviews"
            >
              {visibleReviews.map((review, index) => (
                <article
                  key={`${review.role}-${index}`}
                  className="bg-white rounded-2xl px-5 py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 shadow-sm border border-teal-600/10 hover:shadow-md hover:-translate-y-[1px] transition-all duration-250 ease-out"
                  role="article"
                  aria-label="Review"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Quote className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <div className="flex" aria-label="5 van 5 sterren">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#FFC107] text-[#FFC107]" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-700 text-[17px] leading-relaxed mb-6 line-clamp-4 md:line-clamp-5">
                    {review.quote}
                  </blockquote>
                  <cite className="not-italic">
                    <p className="font-semibold text-teal-600">{review.role}</p>
                  </cite>
                </article>
              ))}
            </div>

            <div className="text-center mt-8 md:mt-10 lg:mt-12">
              <Link
                href="/reviews"
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
              >
                Lees meer reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
