import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type SectionId = 'home' | 'about' | 'works' | 'contact'

const LABELS: Record<SectionId, { primary: string; secondary: string } | null> = {
  home:    { primary: 'Scroll down', secondary: 'to know about me' },
  about:   { primary: 'Scroll down', secondary: 'to see my works' },
  works:   { primary: 'Scroll down', secondary: 'to contact me' },
  contact: null,
}

/**
 * Tracks which section is currently crossing the viewport's vertical center.
 * Using a 0-height detection band (`-50% / -50%` rootMargin) means exactly one
 * section is "active" at any time, regardless of how tall each section is.
 */
function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const ids: SectionId[] = ['home', 'about', 'works', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return active
}

export default function ScrollIndicator() {
  const active = useActiveSection()
  const label = LABELS[active]

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          key="indicator"
          className="hidden md:flex fixed bottom-10 left-1/2 z-50 items-center gap-4 pointer-events-none"
          initial={{ opacity: 0, y: 16, x: '-50%' }}
          animate={{ opacity: 1, y: 0,  x: '-50%' }}
          exit={{    opacity: 0, y: 16, x: '-50%' }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="relative w-5 h-9 border border-white/35 rounded-full flex items-start justify-center pt-2">
            <span className="block w-px h-1.5 bg-white scroll-dot" />
          </div>

          <div className="flex flex-col leading-tight overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-white/65 block">
                  {label.primary}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-white/35 block">
                  {label.secondary}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
