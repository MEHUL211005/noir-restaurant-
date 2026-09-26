import { motion } from 'motion/react'
import { fadeUp, viewport } from '../../lib/animations'

export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  return (
    <motion.div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-4 flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase"
        >
          {align !== 'center' && <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />}
          {eyebrow}
          {align === 'center' && <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        custom={0.08}
        className="font-display text-4xl leading-[1.05] font-medium text-ivory-100 text-balance sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          custom={0.16}
          className="mt-5 text-base leading-relaxed text-noir-300 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}