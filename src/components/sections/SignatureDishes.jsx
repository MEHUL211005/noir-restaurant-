import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Leaf, Flame, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import DishModal from '../menu/DishModal'
import { signatures } from '../../data/menu'
import { stagger, staggerItem, fadeUp, viewport } from '../../lib/animations'

export default function SignatureDishes() {
  const [activeDish, setActiveDish] = useState(null)

  return (
    <section id="signatures" className="bg-noir-950 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The Signatures"
            title="Four plates we refuse to take off the menu"
            description="Each signature is a love letter to a grandmother's recipe, re-plated for the modern table."
          />
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <Link
              to="/menu"
              className="group mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-gold-400 uppercase transition-colors hover:text-gold-300"
            >
              View the full menu
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.span>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {signatures.map((dish, i) => (
            <motion.article
              key={dish.id}
              variants={staggerItem}
              className="group relative cursor-pointer overflow-hidden bg-noir-900"
              onClick={() => setActiveDish(dish)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveDish(dish)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${dish.name} — $${dish.price.toFixed(2)}. Open details.`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                    i === 0 || i === 3 ? 'aspect-[3/4]' : 'aspect-[4/5]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/20 to-transparent transition-opacity duration-500 group-hover:via-noir-950/40" aria-hidden="true" />
                <span className="absolute top-4 left-4 font-display text-sm text-gold-500/80">
                  0{i + 1}
                </span>
              </div>

              <div className="absolute right-5 bottom-5 left-5 z-[1]">
                <div className="mb-2 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase">
                  {dish.vegetarian && (
                    <span className="flex items-center gap-1 text-gold-400">
                      <Leaf className="size-3" aria-hidden="true" /> Veg
                    </span>
                  )}
                  {dish.spicy && (
                    <span className="flex items-center gap-1 text-red-300">
                      <Flame className="size-3" aria-hidden="true" /> Spicy
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl leading-tight text-ivory-100">
                  {dish.name}
                </h3>
                <div className="mt-2 grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-noir-300">{dish.description}</p>
                    <span className="mt-3 block font-display text-xl text-gold-400">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <DishModal
          item={activeDish}
          isOpen={Boolean(activeDish)}
          onClose={() => setActiveDish(null)}
        />
      </div>
    </section>
  )
}