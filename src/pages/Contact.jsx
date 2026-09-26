import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2, Navigation } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ReservationSection from '../components/sections/ReservationSection'
import { restaurant } from '../data/restaurant'
import { stagger, staggerItem, viewport, fadeUp } from '../lib/animations'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come find us in SoHo"
        description="A corner of the city that smells faintly of charcoal and cardamom."
        image="/images/contact-city.jpg"
        alt="The streets of SoHo at dusk"
      />

      <section className="bg-noir-950 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <InfoColumn />
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <MapSection />

      <ReservationSection />
    </>
  )
}

function InfoColumn() {
  return (
    <div className="lg:col-span-5">
      <motion.div
        className="space-y-10 lg:sticky lg:top-32"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <motion.div variants={staggerItem}>
            <h2 className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">
              <MapPin className="size-4" aria-hidden="true" />
              Address
            </h2>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-lg leading-snug text-ivory-100 transition-colors hover:text-gold-300"
            >
              {restaurant.address}
            </a>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">
              <Phone className="size-4" aria-hidden="true" />
              Phone
            </h2>
            <a
              href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
              className="mt-4 block text-lg text-ivory-100 transition-colors hover:text-gold-300"
            >
              {restaurant.phone}
            </a>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">
              <Mail className="size-4" aria-hidden="true" />
              Email
            </h2>
            <a
              href={`mailto:${restaurant.email}`}
              className="mt-4 block text-lg text-ivory-100 transition-colors hover:text-gold-300"
            >
              {restaurant.email}
            </a>
          </motion.div>
        </div>

        <motion.div variants={staggerItem}>
          <h2 className="flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">
            <Clock className="size-4" aria-hidden="true" />
            Opening hours
          </h2>
          <dl className="mt-4 space-y-2.5">
            {restaurant.hoursList.map((h) => (
              <div key={h.day} className="flex items-baseline justify-between gap-6 border-b border-ivory-100/8 pb-2.5 text-sm">
                <dt className="text-noir-300">{h.day}</dt>
                <dd className={h.time === 'Closed' ? 'text-noir-400 italic' : 'text-ivory-100'}>
                  {h.time}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </div>
  )
}

const empty = { name: '', email: '', subject: 'General enquiry', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please share your name.'
  if (!values.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email does not look right.'
  if (!values.message.trim()) errors.message = 'A message goes a long way.'
  return errors
}

function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 1200)
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[420px] flex-col items-center justify-center border border-gold-500/40 bg-noir-900 px-8 text-center"
        role="status"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-gold-500 text-noir-950">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-3xl text-ivory-100">Message sent.</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-noir-300">
          Thank you, {values.name.split(' ')[0]}. We reply to every message within a day.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(empty)
            setStatus('idle')
          }}
          className="mt-8 text-xs tracking-[0.22em] text-gold-400 uppercase transition-colors hover:text-gold-300"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border border-ivory-100/10 bg-noir-900/60 p-6 sm:p-10">
      <h2 className="font-display text-3xl text-ivory-100">Write to us</h2>
      <p className="mt-2 text-sm text-noir-400">
        For immediate bookings, call the restaurant — we answer until midnight on Fridays.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Name</span>
          <input type="text" className="field-control" value={values.name} onChange={setField('name')} placeholder="Your name" />
          {errors.name && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Email</span>
          <input type="email" className="field-control" value={values.email} onChange={setField('email')} placeholder="you@example.com" />
          {errors.email && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.email}</span>}
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Subject</span>
          <select className="field-control" value={values.subject} onChange={setField('subject')}>
            {['General enquiry', 'Private dining', 'Press & media', 'Careers', 'Something else'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Message</span>
          <textarea className="field-control" rows={6} value={values.message} onChange={setField('message')} placeholder="Tell us everything." />
          {errors.message && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.message}</span>}
        </label>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          disabled={status === 'loading'}
          className="btn btn-primary"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </motion.button>
        <AnimatePresence>
          {Object.keys(errors).length > 0 && status === 'idle' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-300"
              role="alert"
            >
              Please review the highlighted fields.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function MapSection() {
  const { lat, lng } = restaurant.map
  const bbox = `${lng - 0.007},${lat - 0.007},${lng + 0.007},${lat + 0.007}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`

  return (
    <section className="border-t border-ivory-100/10 bg-noir-950 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col justify-end lg:col-span-4"
          >
            <SectionHeading
              eyebrow="Find us"
              title="The corner of Crosby & Prince"
              description="Two blocks from the Broadway–Lafayette stop, tucked between a bookshop and a bronze facade. Arrive early, leave late."
            />
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-8 space-y-3"
            >
              {[
                { label: 'Walk', body: '5 min from Broadway–Lafayette (B, D, F, M)' },
                { label: 'Valet', body: 'Evenings & weekends at the corner' },
                { label: 'Rideshare', body: 'Drop at Prince & Crosby — we look after the door' },
              ].map((item) => (
                <motion.li key={item.label} variants={staggerItem} className="flex items-baseline gap-4 border-b border-ivory-100/8 pb-3 text-sm">
                  <span className="w-20 shrink-0 font-sans text-[11px] font-semibold tracking-[0.24em] text-gold-500 uppercase">
                    {item.label}
                  </span>
                  <span className="text-ivory-100/75">{item.body}</span>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-8">
              <Button
                href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                variant="outline"
                withArrow
              >
                Get directions
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-8"
          >
            <div className="relative overflow-hidden border border-ivory-100/10 bg-noir-900">
              <div className="relative h-[380px] sm:h-[480px] lg:h-full lg:min-h-[560px]">
                <iframe
                  src={src}
                  title="Map showing NOIR at 128 Crosby Street, SoHo, New York"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.55)_contrast(0.92)_brightness(0.9)]"
                />
                <div className="pointer-events-none absolute inset-0 bg-noir-950/10" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-noir-950/20" aria-hidden="true" />
              </div>

              <div className="absolute bottom-6 left-6 z-[1] hidden max-w-xs items-start gap-4 border border-gold-500/40 bg-noir-900/90 p-5 backdrop-blur-sm sm:flex">
                <span className="flex size-10 shrink-0 items-center justify-center border border-gold-500/60 text-gold-500">
                  <Navigation className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-lg leading-tight text-ivory-100">{restaurant.address}</p>
                  <p className="mt-1.5 text-xs text-noir-300">
                    Ring the brass doorbell — someone will let you in.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-noir-400">
              Map data © OpenStreetMap contributors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}