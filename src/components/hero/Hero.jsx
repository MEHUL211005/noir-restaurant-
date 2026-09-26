import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import HeroScene from './HeroScene'
import { EASE } from '../../lib/animations'

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const lineReveal = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 1.1, ease: EASE, delay: 0.25 + i * 0.14 },
  }),
}

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-noir-950"
      aria-label="Welcome to NOIR — modern Indian cuisine"
    >
      <HeroScene />

      {/* Ambient scrims */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-noir-950/90 via-noir-950/55 to-noir-950/10 lg:via-noir-950/25" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-noir-950 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[6] grain opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-2xl"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={heroItem}
            className="mb-6 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.32em] text-gold-500 uppercase sm:text-sm"
          >
            <span className="h-px w-10 bg-gold-500/70" aria-hidden="true" />
            Modern Indian Cuisine
          </motion.p>

          <h1 className="font-display text-[17vw] leading-[0.95] font-medium text-ivory-100 sm:text-7xl md:text-8xl xl:text-[7rem]">
            <span className="block overflow-hidden">
              <motion.span custom={0} variants={lineReveal} initial="hidden" animate="visible" className="block">
                Tradition,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                custom={1}
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                className="block text-transparent italic"
                style={{ WebkitTextStroke: '1.5px var(--color-ivory-100)' }}
              >
                Reimagined.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={heroItem}
            className="mt-7 max-w-md text-base leading-relaxed text-noir-300 sm:text-lg"
          >
            Bold Indian flavors, refined through a contemporary lens.
          </motion.p>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/menu" variant="primary" withArrow>
              Explore Menu
            </Button>
            <Button to="/contact#reserve" variant="outline">
              Reserve a Table
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => document.querySelector('#signatures')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory-100/70 transition-colors hover:text-gold-400 focus-visible:text-gold-400"
        aria-label="Scroll to signature dishes"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="flex flex-col items-center gap-2 font-sans text-[10px] tracking-[0.34em] uppercase">
          Scroll
          <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
        </span>
      </motion.button>
    </section>
  )
}