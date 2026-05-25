import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

const PORTFOLIO_IMAGES = [
  { src: '/assets/images/website-portfolio/website1.png', alt: 'Project — website 1' },
  { src: '/assets/images/website-portfolio/website2.png', alt: 'Project — website 2' },
  { src: '/assets/images/website-portfolio/website3.png', alt: 'Project — website 3' },
  { src: '/assets/images/website-portfolio/website4.png', alt: 'Project — website 4' },
  { src: '/assets/images/website-portfolio/website5.png', alt: 'Project — website 5' },
  { src: '/assets/images/website-portfolio/website6.png', alt: 'Project — website 6' },
  { src: '/assets/images/website-portfolio/website7.png', alt: 'Project — website 7' },
]

/**
 * Crossfade between two mutually-exclusive layers:
 *
 *   progress  0   → 0.3   ─ mask visible (hole-through SVG overlay; text scales 1 → 7), parallax invisible
 *   progress  0.3 → 0.4   ─ crossfade: mask opacity 1 → 0, parallax opacity 0 → 1
 *   progress  0.4 → 1     ─ parallax visible & zooming (scales 1 → 4–9 per image), mask gone
 *
 * Scrolling back up reverses the crossfade — parallax fades out, mask scales back to its initial state.
 * Parallax scales are clamped to 1 below progress 0.4, so the zoom never plays during the mask scroll.
 */
export default function WorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* ── Mask layer ─────────────────────────────────── */
  const textScale   = useTransform(scrollYProgress, [0,   0.3], [1, 7])
  const maskOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0])

  /* ── Parallax crossfade — dim during mask phase, full during parallax phase ─── */
  const parallaxOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0.15, 1])

  /* ── Parallax scales (frozen at 1 until progress 0.4) ── */
  const scale4 = useTransform(scrollYProgress, [0.4, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0.4, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0.4, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0.4, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0.4, 1], [1, 9])
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  // Both layers stay mounted; opacity drives the crossfade smoothly. After the mask has
  // fully faded we also toggle `visibility: hidden` so the SVG is skipped by the renderer
  // entirely (some browsers paint masked SVGs even at opacity 0). Class-only toggle —
  // the motion.div itself never unmounts, so scrolling back up reliably brings it back.
  const [maskHidden, setMaskHidden] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setMaskHidden(v >= 0.42)
  })

  return (
    <section id="works" ref={sectionRef} className="relative h-[500vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ────  Layer 1 — Zoom parallax (dimly visible behind the mask; fully visible after the crossfade) ──── */}
        <motion.div className="absolute inset-0" style={{ opacity: parallaxOpacity }}>
          {PORTFOLIO_IMAGES.map(({ src, alt }, index) => (
              <motion.div
                key={index}
                style={{ scale: scales[index % scales.length] }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${
                  index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
                } ${
                  index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''
                } ${
                  index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
                } ${
                  index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''
                } ${
                  index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
                } ${
                  index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
                }`}
              >
                <div className="relative h-[25vh] w-[25vw]">
                  <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* ────  Layer 2 — Hole-through SVG mask (Works text punches transparency in a dark overlay) ──── */}
        <motion.div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none z-10 ${maskHidden ? 'invisible' : ''}`}
          style={{ opacity: maskOpacity }}
        >
          <svg width="100%" height="100%" preserveAspectRatio="none" className="block">
            <defs>
              <mask id="works-mask" style={{ maskType: 'luminance' }}>
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <motion.text
                  x="50%" y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="works-svg-text"
                  style={{ scale: textScale }}
                >
                  Works
                </motion.text>
              </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="#050505" mask="url(#works-mask)" />
          </svg>
        </motion.div>

      </div>
    </section>
  )
}
