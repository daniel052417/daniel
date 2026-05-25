import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import WorksSection from './components/WorksSection'
import ContactSection from './components/ContactSection'
import ScrollIndicator from './components/ScrollIndicator'

const ease = [0.2, 0.7, 0.2, 1] as const

export default function App() {
  /* Smooth scrolling — drives the buttery feel for the scroll-tied animations */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  /* Scroll-driven portrait morph runs across Hero + About only */
  const heroAboutRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroAboutRef,
    offset: ['start start', 'end end'],
  })

  const imgX     = useTransform(scrollYProgress, [0, 1], ['0vw',  '-55vw'])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['0vh',  '12vh'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1,      0.55])

  return (
    <main className="relative">
      {/* ════════  Hero + About (with the scroll-driven portrait overlay) ════════ */}
      <div ref={heroAboutRef} className="relative">
        <HeroSection />
        <AboutSection />

        {/* Sticky scroll-driven portrait that morphs from hero to about */}
        <div className="absolute inset-0 pointer-events-none hidden md:block z-30">
          <div className="sticky top-0 h-screen w-full">
            <div className="relative max-w-shell mx-auto px-6 md:px-20 h-full
                            grid grid-cols-12 gap-10 items-center">
              <div className="col-span-8" />
              <div className="col-span-4 relative h-full">
                <div className="portrait-stage">
                  <motion.img
                    src="/assets/images/daniel-image.png"
                    alt="Portrait of Daniel — Graphic Designer and Web Developer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.34, ease }}
                    style={{ x: imgX, y: imgY, scale: imgScale, transformOrigin: 'top right' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only static portrait inside the hero */}
        <img
          src="/assets/images/daniel-image.png"
          alt="Portrait of Daniel — Graphic Designer and Web Developer"
          className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ════════  Works (its own scroll-tied content) ════════ */}
      <WorksSection />

      {/* ════════  Contact ════════ */}
      <ContactSection />

      {/* Persistent scroll indicator — switches label as the active section changes */}
      <ScrollIndicator />
    </main>
  )
}
