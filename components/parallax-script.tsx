"use client"

import { useEffect } from "react"

export default function ParallaxScript() {
  useEffect(() => {
    const FACTOR = 0.16 // 0.12–0.18 feels best
    const sections = [...document.querySelectorAll("[data-parallax-section]")]

    const state = new WeakMap()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target.querySelector(".parallax-bg img")
          if (!img) return
          if (entry.isIntersecting) {
            state.set(entry.target, { img, active: true, top: entry.boundingClientRect.top + window.scrollY })
          } else {
            state.set(entry.target, { img, active: false, top: 0 })
            img.style.transform = "translate3d(0,0,0)"
          }
        })
      },
      { rootMargin: "10% 0px 10% 0px", threshold: 0 },
    )

    sections.forEach((sec) => io.observe(sec))

    let ticking = false
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    function onScroll() {
      if (ticking || reduce) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset
        sections.forEach((sec) => {
          const s = state.get(sec)
          if (!s || !s.active) return
          const offset = (scrollY - sec.offsetTop) * FACTOR
          s.img.style.transform = `translate3d(0, ${offset}px, 0)`
        })
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    onScroll()

    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return null
}
