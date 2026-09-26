import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { EASE } from '../../lib/animations'

export default function Testimonials() {
  const [[index, direction], setIndex] = useState([0, 0])
  const reducedMotion = useReducedMotion()
  const touchStart = useRef(null)

  const go = useCallback(
    (dir) => {
      setIndex(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir])
    },
    [],
  )

  useEffect(() => {
    const t = window.setInterval(() => go(1), 7000)
    return () => window.clearInterval(t)
  }, [go, index])

  const t = testimonials[index]

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.4, ease: 'easeIn' } }),
  }

  return (
    <section className="border-y border-ivory-100/10 bg-noir-900 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <p className="mb-10 flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.32em] text-gold-500 uppercase">
          <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
          Voices
          <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
        </p>

        <div
          className="relative min-h-[320px] sm:min-h-[260px]"
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return
            const dx = e.changedTouches[0].clientX - touchStart.current
            if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1)
            touchStart.current = null
          }}
        >
          <Quote className="absolute top-0 left-1/2 size-12 -translate-x-1/2 text-gold-500/30" aria-hidden="true" />
          <AnimatePresence custom={direction} mode="wait">
            <motion.figure
              key={t.id}
              custom={direction}
              variants={reducedMotion ? undefined : variants}
              initial={reducedMotion ? false : 'enter'}
              animate="center"
              exit={reducedMotion ? undefined : 'exit'}
              className="flex h-full flex-col items-center px-2 pt-14 text-center"
            >
              <blockquote className="font-display text-2xl leading-snug text-ivory-100 italic sm:text-3xl lg:text-[2.6rem]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <span className="mx-auto flex size-11 items-center justify-center rounded-full border border-gold-500/50 font-display text-lg text-gold-400">
                  {t.initial}
                </span>
                <span className="mt-3 block font-sans text-sm font-semibold text-ivory-100">
                  {t.name}
                </span>
                <span className="mt-0.5 block text-xs text-noir-400">{t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex size-11 items-center justify-center border border-ivory-100/15 text-ivory-100 transition-colors hover:border-gold-500 hover:text-gold-400"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <div className="flex gap-2.5" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                className={`h-1 transition-all duration-400 ${i === index ? 'w-10 bg-gold-500' : 'w-5 bg-ivory-100/25 hover:bg-ivory-100/50'}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="flex size-11 items-center justify-center border border-ivory-100/15 text-ivory-100 transition-colors hover:border-gold-500 hover:text-gold-400"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}