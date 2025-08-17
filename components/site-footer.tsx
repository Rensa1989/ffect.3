import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-[hsl(var(--fitect-navy))] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] gap-6 lg:gap-12 items-start">
          {/* Left column - Logo + Tagline */}
          <div className="max-w-[32ch]">
            <div className="mb-5">
              <Image
                src="/fitect-logo-white-final.png"
                alt="fitect"
                width={140}
                height={40}
                className="h-auto brightness-0 invert"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-white/85 text-base leading-relaxed">
              Interactieve opleidingen en trajecten met direct en blijvend effect tot op de klasvloer.
            </p>
          </div>

          {/* Middle column - Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Contact</h3>
            <div className="space-y-1.5 text-white/85 text-base leading-relaxed">
              <p>Bert Vanhees</p>
              <p>Kelbergenstraat 97</p>
              <p>3290 Diest</p>
              <p>T +32(0)495 50 84 15</p>
              <p>M bert@ffect.be</p>
              <p>BTW BE 0705.797.734</p>
            </div>
          </div>

          {/* Right column - Legal + Contact button */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Juridisch</h3>
            <ul className="space-y-1.5 mb-6">
              <li>
                <Link
                  href="/privacybeleid"
                  className="text-white/85 text-base hover:text-[#E5FFD5] hover:underline transition-colors"
                >
                  Privacybeleid
                </Link>
              </li>
              <li>
                <Link
                  href="/algemene-voorwaarden"
                  className="text-white/85 text-base hover:text-[#E5FFD5] hover:underline transition-colors"
                >
                  Algemene voorwaarden
                </Link>
              </li>
            </ul>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#E5FFD5] text-[#E5FFD5] hover:bg-[#E5FFD5] hover:text-[hsl(var(--fitect-navy))] bg-transparent rounded-full px-6 py-2 font-semibold transition-all duration-300"
              >
                Contact opnemen
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-px bg-white/25 my-8"></div>
        <p className="text-center text-white/70 text-sm">© 2025 ffect. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  )
}
