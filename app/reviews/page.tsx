"use client"

import { useState, useMemo } from "react"
import { Star, Quote, ChevronDown } from "lucide-react"
import Link from "next/link"

const REVIEWS = [
  {
    quote:
      "Dankjewel Bert, het was een zeer goede vorming! En jouw enthousiasme werkt echt super aanstekelijk. Wat zalig om je gedrevenheid te voelen tijdens de hele dag!",
    role: "Leerkracht Basisonderwijs",
    category: "Leerkrachten",
  },
  {
    quote:
      "Bedankt voor het bezorgen van de hand-outs! De deelnemers waren in ieder geval heel enthousiast na de opleiding. Ze vonden het een interessante cursus met onmiddellijk toepasbare handvaten. Ze vonden jou als lesgever ook top.",
    role: "Directie Secundair Onderwijs",
    category: "Directies",
  },
  {
    quote: "Bedankt voor de leerrijke bijscholing, je enthousiasme, de hands-outs, je aanpak en de zeer concrete tips.",
    role: "Zorgcoördinator",
    category: "Zorgcoördinatoren",
  },
  {
    quote:
      "Bedankt voor de presentatie en zeker ook bedankt voor de interessante bijscholing. We zijn er bij ons op school direct mee aan de slag gegaan. We gaan je zeker op de hoogte houden.",
    role: "Team Secundair Onderwijs",
    category: "Onderwijsteams",
  },
  {
    quote:
      "Ik ben afgelopen week écht al aan de slag gegaan met verschillende tips en voel me gemotiveerd. Dat was exact wat ik nodig had en ik kan niet wachten om alle tips te delen met andere collega's.",
    role: "Leerkracht",
    category: "Leerkrachten",
  },
  {
    quote:
      "Bedankt voor de zeer interessante dag. We appreciëren het enorm dat je van je programma bent afgeweken toen je merkte dat de noden elders lagen. Dit was wat we nodig hadden en gaf ons echt veel vertrouwen. Je hebt onze batterijen terug opgeladen!",
    role: "Team Lager Onderwijs",
    category: "Onderwijsteams",
  },
  {
    quote:
      "Heel wat topics waren nieuw voor me en lijken me zeker de moeite om te implementeren in mijn ondersteuningen. Je hebt de vorming trouwens zeer boeiend en aanstekelijk gebracht! Doe zo verder zou ik zeggen. Graag tot een volgende keer.",
    role: "Leerondersteuner",
    category: "Leerondersteuners",
  },
  {
    quote:
      "Ik wil je op mijn beurt ook nog eens bedanken voor de vorming van gisteren. Je hebt jouw enthousiasme helemaal overgedragen op mij. Ik ben vandaag al aan de slag gegaan met de 'double E' klasopstelling. Fijn dat mijn leerlingen mee willen experimenteren.",
    role: "Leerkracht",
    category: "Leerkrachten",
  },
  {
    quote:
      "Waauw, Bert. Dat was de eerste keer dat ik na een studiedag zo goed gezind naar huis keerde. Iedereen was super enthousiast en vooral voldaan na deze dag vol tips en trucs! Dankjewel en tot snel nog eens.",
    role: "Deelnemer Studiedag",
    category: "Studiedag-deelnemers",
  },
  {
    quote:
      "De vorming was zeer praktijkgericht en gaf ons concrete handvaten om meteen mee aan de slag te gaan. Bert zijn passie voor onderwijs is echt aanstekelijk!",
    role: "Directie Basisonderwijs",
    category: "Directies",
  },
  {
    quote:
      "Fantastische dag gehad! De tips zijn direct toepasbaar en ik merk nu al verschil in mijn klas. Bedankt voor de inspiratie!",
    role: "Leerkracht Secundair",
    category: "Leerkrachten",
  },
  {
    quote:
      "Bert heeft ons team echt geholpen om onze aanpak te verbeteren. Zijn expertise en enthousiasme maken het verschil!",
    role: "Zorgteam",
    category: "Zorgcoördinatoren",
  },
]

const FILTER_OPTIONS = [
  { value: "all", label: "Alle reviews" },
  { value: "Leerkrachten", label: "Leerkrachten" },
  { value: "Directies", label: "Directies" },
  { value: "Zorgcoördinatoren", label: "Zorgcoördinatoren" },
  { value: "Onderwijsteams", label: "Onderwijsteams" },
  { value: "Leerondersteuners", label: "Leerondersteuners" },
  { value: "Studiedag-deelnemers", label: "Studiedag-deelnemers" },
]

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showAll, setShowAll] = useState(false)

  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return REVIEWS
    return REVIEWS.filter((review) => review.category === selectedFilter)
  }, [selectedFilter])

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 9)

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#F0F6FE] pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Reviews</h1>
          <p className="text-lg text-gray-700 max-w-[65ch] mx-auto leading-relaxed">
            Lees hier wat leerkrachten, directies en andere onderwijsprofessionals zeggen over de vormingen van Bert.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              aria-label="Filter reviews op doelgroep"
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review, index) => (
            <blockquote
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 md:px-6 md:py-5 lg:px-7 lg:py-6 hover:shadow-md transition-shadow duration-200"
            >
              {/* Quote Icon and Stars */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-6 h-6 text-teal-600 flex-shrink-0" />
                <div className="flex items-center gap-1" aria-label="5 van 5 sterren">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                  ))}
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 text-[17px] leading-relaxed mb-4">"{review.quote}"</p>

              {/* Author/Role */}
              <cite className="text-teal-600 font-semibold text-sm not-italic">— {review.role}</cite>
            </blockquote>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && filteredReviews.length > 9 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
            >
              Meer laden →
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Wil je ook een review achterlaten na je vorming?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Neem contact met ons op
          </Link>
        </div>
      </section>
    </div>
  )
}
