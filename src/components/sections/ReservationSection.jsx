import { motion } from 'motion/react'
import ReservationForm from '../reservation/ReservationForm'
import { fadeUp, viewport } from '../../lib/animations'

export default function ReservationSection({ compact = false }) {
  return (
    <section id="reserve" className="relative overflow-hidden bg-noir-950 py-24 lg:py-32">
      <motion.img
        src="/images/restaurant-interior.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-noir-950/80 to-noir-950" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.32em] text-gold-500 uppercase">
            <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
            Reservations
            <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
          </p>
          <h2 className="font-display text-4xl leading-[1.05] font-medium text-ivory-100 text-balance sm:text-5xl lg:text-6xl">
            Your table, in candlelight
          </h2>
          <p className="mt-5 text-base leading-relaxed text-noir-300 sm:text-lg">
            We hold a handful of tables each evening. Tell us when, and the kitchen will take it from there.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14"
        >
          <ReservationForm compact={compact} />
        </motion.div>
      </div>
    </section>
  )
}