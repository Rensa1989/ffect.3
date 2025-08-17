"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    const headerHeight = 64 // 4rem = 64px for sticky header
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

const handleAanbodNavigation = (sectionId: string) => {
  if (window.location.pathname === "/aanbod") {
    // Already on aanbod page, just scroll
    smoothScrollTo(sectionId)
  } else {
    // Navigate to aanbod page then scroll
    window.location.href = `/aanbod#${sectionId}`
  }
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/fitect-logo.png" alt="Fitect" width={120} height={40} className="h-8 w-auto" />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuTrigger
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    pathname === "/"
                      ? "text-[hsl(var(--fitect-navy))]"
                      : "text-gray-700 hover:text-[hsl(var(--fitect-teal))]",
                  )}
                >
                  Home
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="grid w-[250px] gap-1 p-2 bg-white">
                  <li>
                    <Link
                      href="/#top"
                      className="block px-4 py-2 text-sm hover:bg-teal-50 hover:text-[hsl(var(--fitect-navy))]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#wie-ben-ik"
                      className="block px-4 py-2 text-sm hover:bg-teal-50 hover:text-[hsl(var(--fitect-navy))]"
                    >
                      Wie ben ik
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#missie-visie"
                      className="block px-4 py-2 text-sm hover:bg-teal-50 hover:text-[hsl(var(--fitect-navy))]"
                    >
                      Missie & Visie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reviews"
                      className="block px-4 py-2 text-sm hover:bg-teal-50 hover:text-[hsl(var(--fitect-navy))]"
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/aanbod" legacyBehavior passHref>
                <NavigationMenuTrigger
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    pathname.startsWith("/aanbod")
                      ? "text-[hsl(var(--fitect-navy))]"
                      : "text-gray-700 hover:text-[hsl(var(--fitect-teal))]",
                  )}
                >
                  Aanbod
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="grid w-[250px] gap-1 p-2 bg-white">
                  <li>
                    <button
                      onClick={() => handleAanbodNavigation("top")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-teal-50 hover:text-[hsl(var(--fitect-navy))]"
                    >
                      Het aanbod
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleAanbodNavigation("tarieven")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-teal-50 hover:text-[hsl(var(--fitect-navy))]"
                    >
                      Tarieven
                    </button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    pathname === "/contact"
                      ? "text-[hsl(var(--fitect-navy))]"
                      : "text-gray-700 hover:text-[hsl(var(--fitect-teal))]",
                  )}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="md:hidden bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
