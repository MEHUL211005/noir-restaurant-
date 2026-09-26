import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Leaf, Flame } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { menuItems } from '../../data/menu'
import { stagger, staggerItem, fadeUp, viewport } from '../../lib/animations'

const picks = [
  menuItems.find((i) => i.id === 8),
  menuItems.find((i) => i.id === 12),
  menuItems.find((i) => i.id === 13),
  menuItems.find((i) => i.id === 4),
].filter(Boolean)

export default function MenuPreview() {
  const scrollRef = useRef(null)

  return (
    <section className="bg-noir-900 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="From the Kitchen"
                title="A menu written in fire"
                description="Tandoor embers, market produce and a spice room that never sleeps. Every dish arrives the way the previous one left — remembered."
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-8"
              >
                <Link
                  to="/menu"
                  className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-gold-400 uppercase transition-colors hover:text-gold-300"
                >
                  Explore the full menu
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.ul
            ref={scrollRef}
            className="space-y-5 lg:col-span-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ ...viewport, amount: 0.2 }}
          >
            {picks.map((item) => (
              <motion.li key={item.id} variants={staggerItem}>
                <Link
                  to="/menu"
                  className="group grid grid-cols-[40%_1fr] items-stretch gap-0 border border-ivory-100/10 bg-noir-950 transition-colors duration-500 hover:border-gold-500/40 sm:grid-cols-[240px_1fr]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full min-h-[150px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase">
                      <span className="text-noir-400">{item.category}</span>
                      {item.vegetarian && (
                        <span className="flex items-center gap-1 text-gold-400">
                          <Leaf className="size-3" aria-hidden="true" /> Veg
                        </span>
                      )}
                      {item.spicy && (
                        <span className="flex items-center gap-1 text-red-300">
                          <Flame className="size-3" aria-hidden="true" /> Spicy
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-ivory-100 transition-colors duration-300 group-hover:text-gold-300 sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-noir-400">{item.description}</p>
                    <span className="mt-3 font-display text-xl text-gold-400">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="hidden items-center border-l border-ivory-100/10 px-6 text-noir-400 transition-colors duration-300 group-hover:text-gold-400 sm:flex">
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}