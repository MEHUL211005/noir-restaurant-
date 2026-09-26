import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { faqs } from '../../data/restaurant'
import { EASE } from '../../lib/animations'

export default function FAQ() {
  const [open, setOpen] = useState(1)

  return (
    <section className="bg-noir-950 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          align="center"
          eyebrow="Common Questions"
          title="Everything else you might be wondering"
        />

        <div className="mt-14 divide-y divide-ivory-100/10 border-y border-ivory-100/10">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-sans text-xs text-noir-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-xl transition-colors duration-300 sm:text-2xl ${
                        isOpen ? 'text-gold-300' : 'text-ivory-100 group-hover:text-gold-300'
                      }`}
                    >
                      {item.question}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex size-9 shrink-0 items-center justify-center border transition-colors ${
                      isOpen
                        ? 'border-gold-500 text-gold-400'
                        : 'border-ivory-100/20 text-ivory-100/70 group-hover:border-gold-500/60'
                    }`}
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-9 text-sm leading-relaxed text-noir-300 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}