import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { restaurant } from '../../data/restaurant'

export default function CinematicQuote() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  return (
    <section ref={ref} className="relative flex min-h-[80svh] items-center justify-center overflow-hidden">
      <motion.img
        src="/images/atmosphere.jpg"
        alt="Fine dining plated at NOIR — saffron butter chicken"
        style={{ y, scale }}
        className="absolute inset-0 h-[130%] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-noir-950/70" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl px-5 py-28 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs font-semibold tracking-[0.34em] text-gold-500 uppercase"
        >
          {restaurant.chef.name}
        </motion.p>
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-3xl leading-snug text-ivory-100 italic sm:text-4xl lg:text-5xl"
        >
          “{restaurant.chef.quote}”
        </motion.blockquote>
      </div>
    </section>
  )
}