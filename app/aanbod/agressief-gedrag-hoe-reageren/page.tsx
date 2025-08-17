import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone } from "lucide-react"
import AanbodGoalsTargetGroup from "@/components/aanbod-goals-target-group"

export const metadata = {
  title: "Agressief gedrag: Hoe reageren? - ffect",
  description:
    "Een plan van aanpak voor het hele team. Leer effectieve strategieën om om te gaan met agressief gedrag in de klas.",
}

export default function AgressiefGedragHoeReageren() {
  const goals = [
    "Je herkent de verschillende rollen binnen een groep en kan hierop inspelen.",
    "Je krijgt inzicht in de verschillende fases van de groepsdynamiek en leert hoe, waar en wanneer je wat kan installeren.",
    "Je bouwt samen met je team een preventiebeleid uit rekening houdend met de verschillende fases van de groepsdynamiek.",
    "Je kan aan de hand van een stappenplan de groepsdynamiek beïnvloeden op momenten dat het moeilijk loopt in de klas.",
  ]

  const targetGroups = [
    "Leerkrachten",
    "Directies/middenkader",
    "Leerlingbegeleiders",
    "Zorgcoördinatoren",
    "CLB-medewerkers",
    "Leerondersteuners",
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
            <span className="text-gray-900 font-medium">Agressief gedrag: Hoe reageren?</span>
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agressief%20gedrag_hoe%20reageren2.jpg-ojnAaxp1pZoD6H80vK9ni4K9OQ8gAG.jpeg"
            alt="Agressief gedrag: Hoe reageren?"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Agressief gedrag: Hoe reageren?
        </h1>
        <p className="text-xl text-slate-600 mb-8">Een plan van aanpak voor het hele team</p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 max-w-4xl py-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            In deze vorming gaan we dieper in op het belang van het opbouwen van een hechte klasgroep en hoe je dit kunt
            bereiken door middel van preventieve strategieën, het begrijpen van groepsdynamiek en het actief betrekken
            van alle leerlingen.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            We verkennen, aan de hand van wetenschappelijke instrumenten, bestaande maatregelen en acties die kunnen
            worden genomen om een veilige omgeving te creëren.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Vervolgens duiken we dieper in de concepten van groepsdynamiek, de verschillende rollen in een groep en
            onderzoeken we hoe klasgroepen evolueren in de verschillende fases. We zullen, per fase, praktische
            strategieën aanreiken om te komen tot een veerkrachtige groep.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Een bijzondere focus zal liggen op de cruciale periode van de "gouden weken", waarin de fundamenten worden
            gelegd. We zullen concrete ideeën delen over hoe je deze periode effectief kunt benutten om een hechte groep
            te vormen.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Een essentieel aspect van het opbouwen van een sterke klasgroep is het creëren van kansen voor gezamenlijk
            succes en het vieren van prestaties binnen de groep. We zullen praktische manieren bespreken die bijdragen
            aan dit succes.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Ook zullen we onderzoeken hoe je als leerkracht effectief hen kunt aanmoedigen om onderlinge relaties op te
            bouwen. We zullen verschillende tools en benaderingen bespreken die kunnen helpen bij het leggen van deze
            verbindingen.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Tot slot bekijken we welke kaders we kunnen gebruiken op momenten dat er tijdens het schooljaar moet
            bijgestuurd worden. Dit om een negatieve groepsdynamiek te herstellen.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Deze vorming biedt praktische inzichten en bruikbare tools voor leerkrachten die streven naar het creëren
            van een positieve en ondersteunende klasomgeving waarin elke leerling er toe doet.
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
