import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import CinematicQuote from '../components/sections/CinematicQuote'
import Testimonials from '../components/sections/Testimonials'
import ReservationSection from '../components/sections/ReservationSection'
import Button from '../components/ui/Button'
import { restaurant } from '../data/restaurant'
import { fadeUp, viewport, stagger, staggerItem } from '../lib/animations'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A love letter to the flames of home"
        description="From a seventeen-seat room above a spice shop to one of SoHo's most talked-about tables."
        image="/images/story.jpg"
        alt="The entryway of NOIR restaurant, warm and candle-lit"
      />

      <StorySection />
      <PhilosophySection />
      <ChefSection />
      <IngredientsSection />
      <CinematicQuote />
      <AtmosphereSection />
      <Testimonials />
      <ReservationSection compact />
    </>
  )
}

function StorySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="overflow-hidden bg-noir-950 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div style={{ y }} className="relative lg:col-span-6">
            <div className="overflow-hidden">
              <motion.img
                src="/images/restaurant-interior.jpg"
                alt="The NOIR dining room in the evening"
                loading="lazy"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute -bottom-8 -left-4 hidden border border-gold-500/40 bg-noir-900 p-6 text-center shadow-2xl sm:-left-8 sm:block"
            >
              <p className="font-display text-4xl text-gold-400">2019</p>
              <p className="mt-1 text-xs tracking-[0.24em] text-ivory-100/70 uppercase">
                Founded
              </p>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6 lg:pl-12">
            <SectionHeading eyebrow="The Beginning" title={restaurant.story[0].title} />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-8"
            >
              {restaurant.story.map((part) => (
                <motion.p
                  key={part.title}
                  variants={staggerItem}
                  className="mt-5 first:mt-0 text-lg leading-relaxed text-noir-300"
                >
                  {part.body}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section className="border-y border-ivory-100/10 bg-noir-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Philosophy"
          title="Three promises, kept nightly"
          align="center"
        />
        <motion.div
          className="mt-16 grid gap-px overflow-hidden border border-ivory-100/10 bg-ivory-100/10 sm:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {restaurant.philosophy.map((item, i) => (
            <motion.div key={item.title} variants={staggerItem} className="group bg-noir-900 p-10 transition-colors duration-500 hover:bg-noir-850">
              <span className="font-display text-5xl text-gold-500/40 transition-colors duration-500 group-hover:text-gold-500/80">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl text-ivory-100">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-noir-300">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ChefSection() {
  return (
    <section className="bg-noir-950 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5 lg:pb-6">
            <SectionHeading eyebrow="The Chef" title={restaurant.chef.name} />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-8"
            >
              <p className="text-sm tracking-[0.22em] text-gold-500 uppercase">
                {restaurant.chef.role}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-noir-300">
                {restaurant.chef.resume}
              </p>
              <div className="mt-8">
                <Button to="/private-dining" variant="ghost" withArrow>
                  Book the Chef's Table
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative overflow-hidden">
              <motion.img
                src="/images/chef.jpg"
                alt={`${restaurant.chef.name}, plates a signature dish`}
                loading="lazy"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IngredientsSection() {
  return (
    <section className="border-y border-ivory-100/10 bg-noir-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Ingredients"
                title="Single-source, stone-ground, never rushed"
                description="Our spice room is the quiet heart of the kitchen. Everything arrives whole and is ground to the dish — never to a calendar."
              />
              <motion.ul
                className="mt-10 space-y-4"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {restaurant.ingredients.map((item) => (
                  <motion.li
                    key={item}
                    variants={staggerItem}
                    className="flex items-baseline gap-4 border-b border-ivory-100/10 pb-4 text-sm text-ivory-100/80"
                  >
                    <span className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-gold-500" aria-hidden="true" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden sm:mt-16"
            >
              <img
                src="/images/ingredients.jpg"
                alt="Whole spices and market vegetables"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <img
                src="/images/dish-gol-gappa.jpg"
                alt="Paan gol gappa plated at NOIR"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AtmosphereSection() {
  return (
    <section className="overflow-hidden bg-noir-950 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Atmosphere"
          title="Seventy-two seats, one long exhale"
          description="Brass, velvet, candlelight and the hum of the tandoor at the far end of the room."
        />
        <motion.div
          className="mt-14 grid gap-5 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {[
            { src: '/images/atmosphere.jpg', alt: 'A candle-lit table mid-service', cls: 'lg:col-span-1 lg:row-span-2' },
            { src: '/images/dish-lamb.jpg', alt: 'Lamb galouti with rose petals', cls: 'lg:col-span-2' },
            { src: '/images/restaurant-interior.jpg', alt: 'The dining room at golden hour', cls: 'lg:col-span-2' },
          ].map((img) => (
            <motion.div key={img.src} variants={staggerItem} className={`overflow-hidden ${img.cls}`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full min-h-[260px] w-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 flex flex-wrap gap-4"
        >
          <Button to="/private-dining" variant="outline">
            Host a private evening
          </Button>
          <Button to="/contact" variant="ghost" withArrow>
            Contact the restaurant
          </Button>
        </motion.div>
      </div>
    </section>
  )
}