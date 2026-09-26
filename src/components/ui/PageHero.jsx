import { motion } from 'motion/react'
import { fadeUp, stagger } from '../../lib/animations'

export default function PageHero({ eyebrow, title, description, image, alt, align = 'left' }) {
  return (
    <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-noir-950 pt-28 pb-16 lg:min-h-[70svh] lg:pb-24">
      <motion.img
        src={image}
        alt={alt}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/55 to-noir-950/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-noir-950/70 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div
          className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className={`mb-5 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.32em] text-gold-500 uppercase ${align === 'center' ? 'justify-center' : ''}`}
          >
            <span className="h-px w-8 bg-gold-500/70" aria-hidden="true" />
            {eyebrow}
            {align === 'center' && <span className="h-px w-8 bg-gold-500/70" aria-hidden="true" />}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl leading-[1.02] font-medium text-ivory-100 text-balance sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className={`mt-6 max-w-xl text-base leading-relaxed text-ivory-100/70 sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}