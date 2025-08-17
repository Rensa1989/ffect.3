import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacybeleid | ffect.",
  description: "Uw privacy is belangrijk voor ons. Lees hier hoe ffect. omgaat met uw persoonsgegevens.",
  robots: "index,follow",
  openGraph: {
    title: "Privacybeleid | ffect.",
    description: "Uw privacy is belangrijk voor ons. Lees hier hoe ffect. omgaat met uw persoonsgegevens.",
    type: "website",
  },
}

export default function PrivacybeleidPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Privacybeleid</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacybeleid</h1>
          <p className="text-xl text-gray-600 leading-relaxed">Uw privacy is belangrijk voor ons</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section id="algemene-informatie" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Algemene informatie</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ffect., gevestigd te Kelbergenstraat 97, 3290 Diest, België (BTW BE 0705.797.734), hecht veel belang aan
              de bescherming van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke persoonsgegevens wij
              verzamelen, waarom wij deze verzamelen en hoe wij deze gebruiken.
            </p>
          </section>

          <section id="welke-gegevens" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Welke gegevens verzamelen wij?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wij kunnen de volgende persoonsgegevens van u verzamelen:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-6">
              <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
              <li>Organisatie en functie</li>
              <li>Communicatie via ons contactformulier</li>
              <li>Technische gegevens (IP-adres, browsertype, bezoekgedrag)</li>
            </ul>
          </section>

          <section id="waarom" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Waarom verzamelen wij uw gegevens?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Wij gebruiken uw persoonsgegevens voor:</p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-6">
              <li>Het beantwoorden van uw vragen en verzoeken</li>
              <li>Het versturen van informatie over onze diensten</li>
              <li>Het verbeteren van onze website en dienstverlening</li>
              <li>Het naleven van wettelijke verplichtingen</li>
            </ul>
          </section>

          <section id="rechtsgrond" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Rechtsgrond voor verwerking</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Wij verwerken uw persoonsgegevens op basis van uw toestemming, voor de uitvoering van een overeenkomst,
              voor het naleven van een wettelijke verplichting of op basis van ons gerechtvaardigd belang.
            </p>
          </section>

          <section id="cookies" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Onze website gebruikt cookies om de functionaliteit te verbeteren en om statistieken bij te houden. U kunt
              uw cookie-voorkeuren aanpassen via de cookie-instellingen op onze website.
            </p>
          </section>

          <section id="rechten" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Uw rechten</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              U heeft de volgende rechten betreffende uw persoonsgegevens:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-6">
              <li>Recht op inzage in uw persoonsgegevens</li>
              <li>Recht op rectificatie van onjuiste gegevens</li>
              <li>Recht op verwijdering van uw gegevens</li>
              <li>Recht op beperking van de verwerking</li>
              <li>Recht op overdraagbaarheid van gegevens</li>
              <li>Recht van bezwaar tegen de verwerking</li>
            </ul>
          </section>

          <section id="beveiliging" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Beveiliging</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen
              verlies, misbruik en ongeautoriseerde toegang.
            </p>
          </section>

          <section id="contact" className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Voor vragen over dit privacybeleid of het uitoefenen van uw rechten kunt u contact opnemen via:
            </p>
            <div className="text-gray-700 leading-relaxed space-y-2 mb-6">
              <p>
                E-mail:{" "}
                <a href="mailto:bert@ffect.be" className="text-teal-600 hover:text-teal-700 underline">
                  bert@ffect.be
                </a>
              </p>
              <p>
                Telefoon:{" "}
                <a href="tel:+32495508415" className="text-teal-600 hover:text-teal-700 underline">
                  +32(0)495 50 84 15
                </a>
              </p>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">Laatst bijgewerkt: 26/6/2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
