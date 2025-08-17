"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"

export default function AanbodPage() {
  const trainings = [
    {
      id: 1,
      slug: "verbindende-begeleidingsgesprekken-met-pubers",
      title: "Verbindende begeleidingsgesprekken met pubers",
      description: "Inzetten op een verbindend klas- en schoolklimaat",
      popular: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/verbindende%20begeleidingsgesprekken%20met%20pubers.jpg-Frat2mIDVNq3pfrmtGowcbM5ccZBeV.jpeg",
    },
    {
      id: 2,
      slug: "een-klas-krijg-je-een-groep-maak-je",
      title: "Een klas krijg je, een groep maak je",
      description: "populair bij leerkrachten",
      popular: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/een%20klas%20krijg%20je%20een%20groep%20maak%20je.jpg-dDUkbsUAplQurIpp5RUfB47xDogqpD.jpeg",
    },
    {
      id: 3,
      slug: "constructief-omgaan-met-moeilijk-hanteerbaar-gedrag",
      title: "Constructief begrenzen van moeilijk hanteerbaar gedrag",
      description: "populair bij leerkrachten en leerlingbegeleiders",
      popular: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/constructief%20omgaan%20met%20moeillijk%20hanteerbaar%20gedrag.jpg-JQCH1xVeHrpjQZz2YqqwsqgqzF5wKB.jpeg",
    },
    {
      id: 4,
      slug: "nieuwe-job-in-het-onderwijs-hoe-manage-ik-mijn-klas",
      title: "Nieuwe job in het onderwijs: Hoe manage ik mijn klas?",
      description: "Wat ik zeker moet weten om aan de slag te gaan",
      popular: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nieuwe%20job%20in%20het%20onderwijs_hoe%20manage%20ik%20mijn%20klas.jpg-THdGt6JAw3wgIy0Xax2do53dErt0WO.jpeg",
    },
    {
      id: 5,
      slug: "effectief-beleid-en-constructieve-aanpak-bij-moeilijk-hanteerbaar-gedrag",
      title: "Effectief beleid en constructieve aanpak bij moeilijk hanteerbaar gedrag",
      description: "Een onderbouwd beleid voor een optimale leer-, leef- en werkomgeving",
      popular: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/effectief%20beleid%20voor%20moeilijk%20hanteerbaar%20gedrag.jpg-VLakj4MvhGgY2kP4LidqBcV5UNfbBO.jpeg",
    },
    {
      id: 6,
      slug: "agressief-gedrag-hoe-reageren",
      title: "Agressief gedrag: Hoe reageren?",
      description: "populair bij schoolteams",
      popular: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agressief%20gedrag_hoe%20reageren2.jpg-ojnAaxp1pZoD6H80vK9ni4K9OQ8gAG.jpeg",
    },
    {
      id: 7,
      slug: "de-kunst-van-verbindend-communiceren-tijdens-moeilijke-gesprekken-met-ouders",
      title: "De kunst van verbindend communiceren tijdens moeilijke gesprekken met ouders",
      description: "Oudercontacten en slechtnieuwsgesprek, hoe pak ik dat aan?",
      popular: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/de%20kunst%20van%20verbindend%20communiceren%20tijdens%20moeilijke%20gesprekken%20met%20ouders.jpg-zUUh829VTu2KVWJNL8XhUv6Alxd4tF.jpeg",
    },
    {
      id: 8,
      slug: "van-uitdaging-naar-verbinding-succesvol-samenwerken-met-ouders",
      title: "Van uitdaging naar verbinding: succesvol samenwerken met ouders",
      description: "populair bij secretariaatsmedewerkers",
      popular: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/van%20uitdaging%20naar%20verbinding_succesvol%20samenwerken%20met%20ouders.jpg-FZSVouoOZc1VPW7flAsLCdLV2c7WIJ.jpeg",
    },
    {
      id: 9,
      slug: "van-een-machtige-naar-een-krachtige-aanpak",
      title: "Van een machtige naar een krachtige aanpak",
      description: "Introductie in nieuwe autoriteit, geweldloos verzet",
      popular: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/van%20een%20machtige%20naar%20een%20krachtige%20aanpak.jpg-poOsWhmPHxHP5rQg8lOHoLTfR8lV27.jpeg",
    },
    {
      id: 10,
      slug: "verbonden-in-groei-hechtingsproblematiek-begrijpen-en-omgaan-met-ongewenst-gedrag",
      title: "Verbonden in groei: hechtingsproblematiek begrijpen en omgaan met ongewenst gedrag",
      description: "Hoe kwetsbare plekjes in de ontwikkeling kunnen leiden tot problemen op school",
      popular: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/verbonden%20in%20groei_hechtingsproblematiek%20begrijpen%20en%20omgaan%20met%20ongewenst%20gedrag.jpg-kDn5gUhP0XBNkrfeGjUwW6RUF5CUO2.jpeg",
    },
  ]

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          const headerHeight = 64
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white" id="top">
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Aanbod</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Aanbod</h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Vormingen die het verschil maken in de klas
            </p>
          </div>
        </div>
      </section>

      {/* Trainings Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trainings.map((training) => (
              <Link
                key={training.id}
                href={`/aanbod/${training.slug}`}
                className="block group cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    window.location.href = `/aanbod/${training.slug}`
                  }
                }}
              >
                <Card className="h-full hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border-slate-200 hover:border-teal-300 hover:outline hover:outline-1 hover:outline-teal-200 overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={training.image || "/placeholder.svg"}
                      alt={`Training: ${training.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {training.popular && (
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-teal-600 text-white hover:bg-teal-700 shadow-lg border-0 font-semibold"
                        >
                          Populair
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-teal-700 transition-colors leading-tight mb-3">
                        {training.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-700 text-base leading-relaxed mb-6 font-semibold">
                      {training.description}
                    </CardDescription>
                    <div className="inline-flex items-center text-teal-600 group-hover:text-teal-700 font-medium transition-colors opacity-75 group-hover:opacity-100 group-hover:font-semibold">
                      Meer informatie
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tarieven Section */}
      <section id="tarieven" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Tarieven</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hieronder vinden jullie de tarieven voor de vormingen. Alle sessies zijn ontworpen voor een volledige dag.
              Op deze manier kan ook de inhoud van de vorming op een interactieve manier verwerkt worden. Uiteraard
              kunnen deze vormingen ook ingekort of opgesplitst worden in deelvormingen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">Een dagdeel</h3>
                  <div className="w-8 h-0.5 bg-[#004751]"></div>
                </div>
                <p className="text-sm text-slate-600 mb-4">3 uren</p>
                <p className="text-2xl font-bold text-slate-800">€ 590</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">Een hele dag</h3>
                  <div className="w-8 h-0.5 bg-[#004751]"></div>
                </div>
                <p className="text-sm text-slate-600 mb-4">6 uren</p>
                <p className="text-2xl font-bold text-slate-800">€ 990</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-6">
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Omdat geen enkele situatie hetzelfde is, vind ik het belangrijk om te werken op een manier die afgestemd
              is op jullie school of organisatie. Na een vrijblijvend kennismakingsgesprek bezorg ik jullie daarom
              altijd een offerte op maat, volledig afgestemd op specifieke wensen en behoeften.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Interesse in een van deze vormingen?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Neem vrijblijvend contact op om te bespreken hoe we samen een boeiende, inspirerende en kwalitatieve vorming
            kunnen realiseren voor jouw team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Neem contact op
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
