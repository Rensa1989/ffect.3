import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Algemene Voorwaarden | ffect.",
  description: "Transparante voorwaarden voor onze dienstverlening - ffect. opleidingen en trainingen",
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container px-4 py-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Algemene Voorwaarden</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Algemene Voorwaarden</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Transparante voorwaarden voor onze dienstverlening
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Definities</h2>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p>
                    <strong>ffect.:</strong> Bert Vanhees, gevestigd te Kelbergenstraat 97, 3290 Diest, België (BTW BE
                    0705.797.734)
                  </p>
                  <p>
                    <strong>Klant:</strong> De natuurlijke of rechtspersoon die gebruik maakt van onze diensten
                  </p>
                  <p>
                    <strong>Diensten:</strong> Alle door ffect. aangeboden opleidingen, trainingen en consultancy
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Toepasselijkheid</h2>
                <p className="text-gray-700 leading-relaxed">
                  Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen
                  ffect. en de klant, tenzij schriftelijk anders overeengekomen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Aanbiedingen en offertes</h2>
                <p className="text-gray-700 leading-relaxed">
                  Alle aanbiedingen en offertes zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders vermeld.
                  Prijzen zijn exclusief BTW, tenzij anders aangegeven.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Totstandkoming overeenkomst</h2>
                <p className="text-gray-700 leading-relaxed">
                  Een overeenkomst komt tot stand door schriftelijke bevestiging van beide partijen of door aanvang van
                  de uitvoering van de diensten door ffect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Uitvoering diensten</h2>
                <p className="text-gray-700 leading-relaxed">
                  ffect. voert de diensten uit met de nodige zorgvuldigheid en in overeenstemming met de geldende
                  professionele standaarden. Alle diensten worden uitgevoerd op basis van een inspanningsverbintenis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Annulering</h2>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-3">Annuleringen zijn mogelijk onder de volgende voorwaarden:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Tot 14 dagen voor de training: geen kosten</li>
                    <li>7-14 dagen voor de training: 50% van het tarief</li>
                    <li>Minder dan 7 dagen voor de training: 100% van het tarief</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Betaling</h2>
                <p className="text-gray-700 leading-relaxed">
                  Betaling dient te geschieden binnen 30 dagen na factuurdatum. Bij overschrijding van de
                  betalingstermijn is de klant van rechtswege in gebreke en is een rente verschuldigd van 1% per maand.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Aansprakelijkheid</h2>
                <p className="text-gray-700 leading-relaxed">
                  De aansprakelijkheid van ffect. is beperkt tot het bedrag dat door de verzekeraar wordt uitgekeerd,
                  met een maximum van het factuurbedrag van de betreffende opdracht.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Intellectueel eigendom</h2>
                <p className="text-gray-700 leading-relaxed">
                  Alle intellectuele eigendomsrechten op de door ffect. ontwikkelde materialen blijven eigendom van
                  ffect. De klant verkrijgt een gebruiksrecht voor interne doeleinden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Toepasselijk recht</h2>
                <p className="text-gray-700 leading-relaxed">
                  Op alle overeenkomsten is het Belgische recht van toepassing. Geschillen worden voorgelegd aan de
                  bevoegde rechtbank van het arrondissement Leuven.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">Laatst bijgewerkt: 26/6/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
