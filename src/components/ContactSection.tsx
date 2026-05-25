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

type Social = { label: string; handle: string; href: string }
const SOCIALS: Social[] = [
  { label: 'Instagram', handle: '@daniel.designs', href: 'https://instagram.com/daniel.designs' },
  { label: 'Dribbble',  handle: '@daniel',          href: 'https://dribbble.com/daniel' },
  { label: 'LinkedIn',  handle: '/in/daniel',       href: 'https://linkedin.com/in/daniel' },
  { label: 'GitHub',    handle: '@daniel',          href: 'https://github.com/daniel' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* Ambient glow */}
      <div
        className="glow glow-amber drift"
        style={{ left: '50%', top: '15%', transform: 'translateX(-50%)' }}
      />

      <motion.div
        className="relative z-10 max-w-shell mx-auto px-6 md:px-20 pt-32 md:pt-40 pb-10 md:pb-14 min-h-screen flex flex-col"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Eyebrow */}
        <motion.div variants={rise} className="flex items-center gap-4 mb-10 md:mb-14">
          <span className="block w-10 h-px bg-[#D9B78F]/70" />
          <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.38em] text-white/70">
            Get in touch
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={rise}
          className="font-display font-extrabold mb-12 md:mb-16 leading-[1.02] tracking-[-0.025em] max-w-[16ch]"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}
        >
          Let&rsquo;s create<br />
          something <span className="font-serif-i text-gold">together</span>.
        </motion.h2>

        {/* Email — primary CTA */}
        <motion.a
          variants={rise}
          href="mailto:hello@daniel.studio"
          className="contact-email group inline-flex items-center gap-4 md:gap-5 self-start mb-16 md:mb-20"
        >
          <span className="block h-px w-8 bg-[#D9B78F]/60 transition-[width] duration-500 group-hover:w-14" />
          <span className="font-display font-light text-2xl md:text-[2.5rem] text-white/95 transition-colors group-hover:text-[#F0D9B4]">
            hello@daniel.studio
          </span>
          <svg
            className="arrow w-5 h-5 md:w-6 md:h-6 text-[#D9B78F]"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M7 17L17 7M17 7H8M17 7V16"/>
          </svg>
        </motion.a>

        {/* Social grid */}
        <motion.div
          variants={rise}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-[860px] mb-auto"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-2xl border border-white/10 bg-white/[0.01] p-4 md:p-5 transition-colors hover:border-[#D9B78F]/40 hover:bg-white/[0.03]"
            >
              <div className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-white/45 mb-2">
                {s.label}
              </div>
              <div className="font-display text-[15px] text-white/90 transition-colors group-hover:text-[#F0D9B4]">
                {s.handle}
              </div>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={rise}
          className="mt-16 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-white/10 pt-8 md:pt-10"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
            © Daniel · ’26
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            Made with care · Philippines
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
