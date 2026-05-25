import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'

const ease = [0.2, 0.7, 0.2, 1] as const

const CYCLE_WORDS = ['Digital', 'Bold', 'Quiet', 'Living'] as const
const LONGEST_WORD = CYCLE_WORDS.reduce((a, b) => (b.length > a.length ? b : a))

function CyclingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])
  const word = CYCLE_WORDS[i]
  return (
    <span className="relative inline-block align-baseline pr-[0.15em]">
      {/* sizer locked to the longest word so the container never narrows mid-cycle */}
      <span className="font-serif-i invisible whitespace-nowrap" aria-hidden="true">{LONGEST_WORD}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="font-serif-i text-gold absolute left-0 top-0 whitespace-nowrap"
          initial={{ y: '0.55em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0,        opacity: 1, filter: 'blur(0px)' }}
          exit={{    y: '-0.55em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  /* Pointer parallax on portrait + glow */
  const reduceMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 })

  const glowX = useTransform(sx, (v) => -v * 4)
  const glowY = useTransform(sy, (v) =>  v * 8)

  useEffect(() => {
    if (reduceMotion) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth  - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [mx, my, reduceMotion])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const menuRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="rail left"  aria-hidden="true" />
      <div className="rail right" aria-hidden="true" />

      {/* ════════  NAV  ════════ */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/25">
        <div className="max-w-shell mx-auto flex items-center justify-between px-6 md:px-20 py-6">
          <a href="#home" className="font-display font-bold text-[15px] tracking-tight inline-flex items-center gap-3">
            <img src="/assets/images/DANIEL-logo.svg" alt="Daniel logo" className="h-6 w-auto" />
          </a>

          <ul className="hidden md:flex items-center gap-12 text-[10.5px] uppercase tracking-[0.32em] font-light text-white/70">
            <li><a href="#home"    className="nav-link">Home</a></li>
            <li><a href="#about"   className="nav-link">About</a></li>
            <li><a href="#works"   className="nav-link">Works</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          <a href="#contact"
             className="nav-cta hidden md:inline-flex items-center gap-2.5 border border-white/25 rounded-full pl-5 pr-4 py-2.5 text-[10.5px] uppercase tracking-[0.3em] font-light text-white/90">
            Let's talk
            <svg className="arrow w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H8M17 7V16"/>
            </svg>
          </a>

          <button onClick={() => setMenuOpen(true)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
            <span className="block w-7 h-px bg-white"></span>
            <span className="block w-5 h-px bg-white ml-auto"></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div ref={menuRef}
           className={`mobile-menu fixed inset-0 z-50 bg-[#050505] md:hidden flex flex-col ${menuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <a href="#home" className="font-display font-bold text-[15px] inline-flex items-center gap-3" onClick={closeMenu}>
            <img src="/assets/images/DANIEL-logo.svg" alt="Daniel logo" className="h-6 w-auto" />
          </a>
          <button onClick={closeMenu} aria-label="Close menu" className="w-9 h-9 grid place-items-center text-white/80 text-xl">✕</button>
        </div>
        <ul className="flex-1 flex flex-col items-center justify-center gap-10 text-3xl uppercase tracking-[0.22em] font-display font-light">
          <li><a href="#home"    className="mobile-link" onClick={closeMenu}>Home</a></li>
          <li><a href="#about"   className="mobile-link" onClick={closeMenu}>About</a></li>
          <li><a href="#works"   className="mobile-link" onClick={closeMenu}>Works</a></li>
          <li><a href="#contact" className="mobile-link" onClick={closeMenu}>Contact</a></li>
        </ul>
        <div className="p-6">
          <a href="#contact" onClick={closeMenu}
             className="block text-center border border-white/30 rounded-full py-4 uppercase tracking-[0.3em] text-[11px] font-light">
            Let's talk &nbsp;→
          </a>
        </div>
      </div>

      {/* ════════  HERO  ════════ */}
      <section id="home" className="relative min-h-screen w-full vignette">
        <div className="glow glow-amber drift" style={{ right: '-180px', top: '18%' }} />
        <div className="glow glow-cool drift"  style={{ left: '-120px',  top: '8%', animationDelay: '-5s' }} />

        <motion.img
          src="/assets/images/DANIEL.svg"
          alt=""
          aria-hidden="true"
          className="bg-daniel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.div
          className="relative z-10 max-w-shell mx-auto px-6 md:px-20 pt-32 md:pt-36 pb-16 md:pb-0 min-h-screen flex flex-col md:grid md:grid-cols-12 md:gap-10 md:items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* LEFT */}
          <div className="md:col-span-8 lg:col-span-8 relative z-20 order-2 md:order-1">
            <motion.div variants={rise} className="flex items-center gap-4 mb-8 md:mb-10">
              <span className="block w-10 h-px bg-[#D9B78F]/70"></span>
              <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.38em] text-white/70">
                Graphic Designer &nbsp;/&nbsp; Web Developer
              </span>
            </motion.div>

            <h1 className="h-display font-display font-extrabold mb-9 md:mb-11">
              <motion.span variants={rise} className="block whitespace-nowrap">
                Designing&nbsp;<CyclingWord />
              </motion.span>
              <motion.span variants={rise} className="block">Experiences</motion.span>
              <motion.span variants={rise} className="block text-white/75">
                That <span className="underline-accent">Inspire.</span>
              </motion.span>
            </h1>

            <motion.p variants={rise}
              className="max-w-[500px] text-white/55 leading-[1.75] text-[15px] md:text-[15.5px] mb-10 md:mb-12 font-light">
              I help businesses and brands create modern websites, strong visual identities,
              and engaging user experiences through creative design and development.
            </motion.p>

            <motion.div variants={rise} className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <a href="#works"
                 className="btn-primary group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4
                            text-[10.5px] uppercase tracking-[0.32em] font-semibold">
                Explore my works
                <span className="arrow">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M7 17L17 7M17 7H8M17 7V16"/>
                  </svg>
                </span>
              </a>
              <a href="#about"
                 className="btn-secondary inline-flex items-center justify-center gap-3 border rounded-full px-7 py-4
                            text-[10.5px] uppercase tracking-[0.32em] font-light text-white/90">
                About me
              </a>
            </motion.div>
          </div>

          {/* RIGHT — image is rendered via the scroll-driven overlay in App.tsx */}
          <div className="md:col-span-4 lg:col-span-4 relative z-10 mt-10 md:mt-0 md:h-screen order-1 md:order-2">
            <div className="portrait-stage">
              <motion.div className="portrait-glow"
                aria-hidden="true"
                style={{ x: glowX, y: glowY }} />
              <div className="portrait-floor" aria-hidden="true" />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden md:flex absolute bottom-10 left-1/2 z-20 items-center gap-4"
          initial={{ opacity: 0, y: 16, x: '-50%' }}
          animate={{ opacity: 1, y: 0,  x: '-50%' }}
          transition={{ duration: 0.9, delay: 0.94, ease }}
        >
          <div className="relative w-5 h-9 border border-white/35 rounded-full flex items-start justify-center pt-2">
            <span className="block w-px h-1.5 bg-white scroll-dot"></span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-white/65">Scroll down</span>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-white/35">to explore</span>
          </div>
        </motion.div>

        {/* Meta (bottom-right) */}
        <motion.div
          className="hidden md:flex absolute bottom-10 right-20 z-20 items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.94, ease }}
        >
          <div className="flex flex-col leading-tight text-right">
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-white/65">Based in</span>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-white/35">Philippines · ’26</span>
          </div>
          <span className="block w-10 h-px bg-white/25"></span>
        </motion.div>
      </section>
    </>
  )
}
