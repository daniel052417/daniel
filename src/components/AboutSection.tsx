import { motion, type Variants } from 'framer-motion'

const ease = [0.2, 0.7, 0.2, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.9, ease } },
}

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen w-full">
      <motion.div
        className="relative z-10 max-w-shell mx-auto px-6 md:px-20 py-32 md:py-40 min-h-screen
                   flex flex-col md:grid md:grid-cols-12 md:gap-10 md:items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* LEFT — empty space; the daniel portrait lands here via the scroll overlay */}
        <div className="hidden md:block md:col-span-5 lg:col-span-5" aria-hidden="true" />

        {/* RIGHT — copy */}
        <div className="md:col-span-7 lg:col-span-7 relative z-10">
          <motion.div variants={rise} className="flex items-center gap-4 mb-8 md:mb-10">
            <span className="block w-10 h-px bg-[#D9B78F]/70" />
            <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.38em] text-white/70">
              About me
            </span>
          </motion.div>

          <motion.h2
            variants={rise}
            className="font-display font-extrabold mb-9 md:mb-11 leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2rem, 5.2vw, 4.75rem)' }}
          >
            Crafting <span className="font-serif-i text-gold">visual stories</span><br />
            with intent &amp; soul.
          </motion.h2>

          <motion.div variants={rise} className="space-y-6 max-w-[560px] text-white/60 font-light leading-[1.85] text-[15px] md:text-[16px]">
            <p>
              I&rsquo;m Daniel — a designer and developer obsessed with the quiet moments
              where craft meets clarity. For five years I&rsquo;ve helped studios, founders,
              and brands turn ambitious ideas into refined digital experiences.
            </p>
            <p>
              My work balances editorial typography, considered motion, and engineering
              rigor — sites that feel as good to read as they are to use, and visual
              identities built to last.
            </p>
          </motion.div>

          <motion.div variants={rise} className="grid grid-cols-3 gap-6 mt-12 max-w-[540px]">
            <Stat number="50" suffix="+" label="Projects shipped" />
            <Stat number="5"  suffix="y" label="Years of craft" />
            <Stat number="12" suffix="+" label="Studios & brands" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function Stat({ number, suffix, label }: { number: string; suffix: string; label: string }) {
  return (
    <div>
      <div className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
        {number}<span className="text-[#D9B78F]">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mt-2">
        {label}
      </div>
    </div>
  )
}
