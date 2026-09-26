import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, Loader2, Gem, Users } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { restaurant } from '../data/restaurant'
import { fadeUp, viewport } from '../lib/animations'

const empty = {
  name: '',
  email: '',
  phone: '',
  eventType: 'Corporate Dining',
  guests: 20,
  date: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please share your name.'
  if (!values.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email does not look right.'
  if (!values.phone.trim()) errors.phone = 'A phone number is required.'
  else if (!/^[+\d][\d\s()\-.]{6,}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!values.guests || values.guests < 1) errors.guests = 'Enter your guest count.'
  if (!values.date) errors.date = 'Choose a preferred date.'
  return errors
}

export default function PrivateDining() {
  return (
    <>
      <PageHero
        eyebrow="Private Dining"
        title="Rooms built for unforgettable evenings"
        description="Four private spaces — from a twelve-seat chef's kitchen to a sixty-guest gallery."
        image="/images/private-wedding.jpg"
        alt="A candle-lit wedding table in the NOIR Gallery"
      />

      <DiningSpaces />
      <EnquirySection />
    </>
  )
}

function DiningSpaces() {
  return (
    <section className="bg-noir-950 py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="The Spaces"
          title="Every celebration, properly held"
          description="Each room has its own host, its own rhythm and its own menu. Tell us the occasion — we will set the table."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {restaurant.privateDining.map((space, i) => (
            <motion.article
              key={space.type}
              className={`group ${i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-16'}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className="relative overflow-hidden">
                <img
                  src={space.image}
                  alt={space.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute top-5 right-5 border border-ivory-100/25 bg-noir-950/60 px-3 py-1.5 text-[10px] tracking-[0.2em] text-ivory-100/90 uppercase backdrop-blur-sm">
                  {space.type}
                </span>
                <span className="absolute bottom-5 left-5 flex items-center gap-2 text-xs text-ivory-100/90">
                  <Users className="size-4 text-gold-400" aria-hidden="true" />
                  {space.capacity}
                </span>
              </div>
              <div className="border border-ivory-100/10 border-t-0 p-7">
                <h3 className="font-display text-3xl text-ivory-100">{space.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-noir-300">{space.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function EnquirySection() {
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
    window.setTimeout(() => setStatus('success'), 1400)
  }

  return (
    <section id="enquire" className="border-t border-ivory-100/10 bg-noir-900 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-start gap-4">
          <Gem className="mt-1 size-6 shrink-0 text-gold-500" aria-hidden="true" />
          <SectionHeading
            eyebrow="Enquire"
            title="Let's plan your evening"
            description="Tell us about the occasion and our events team will reply within one business day."
          />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center border border-gold-500/40 bg-noir-950 px-8 py-16 text-center"
              role="status"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-gold-500 text-noir-950">
                <CheckCircle2 className="size-8" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-3xl text-ivory-100">
                Your enquiry has been received.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-noir-300">
                Our events team will reach out to {values.name.split(' ')[0] || 'you'} about your{' '}
                {values.eventType.toLowerCase()} for {values.guests} guests.
              </p>
              <button
                type="button"
                onClick={() => {
                  setValues(empty)
                  setStatus('idle')
                }}
                className="mt-8 text-xs tracking-[0.22em] text-gold-400 uppercase transition-colors hover:text-gold-300"
              >
                Send another enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Name</span>
                  <input type="text" className="field-control" value={values.name} onChange={setField('name')} placeholder="Priya Nair" />
                  {errors.name && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Email</span>
                  <input type="email" className="field-control" value={values.email} onChange={setField('email')} placeholder="you@example.com" />
                  {errors.email && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.email}</span>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Phone</span>
                  <input type="tel" className="field-control" value={values.phone} onChange={setField('phone')} placeholder="+1 (555) 000-0000" />
                  {errors.phone && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.phone}</span>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Event type</span>
                  <select className="field-control" value={values.eventType} onChange={setField('eventType')}>
                    {restaurant.privateDining.map((s) => (
                      <option key={s.type} value={s.type}>{s.type}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Guest count</span>
                  <select className="field-control" value={values.guests} onChange={setField('guests')}>
                    {[10, 12, 14, 20, 24, 30, 40, 50, 60].map((n) => (
                      <option key={n} value={n}>{n} guests</option>
                    ))}
                  </select>
                  {errors.guests && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.guests}</span>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Preferred date</span>
                  <input type="date" className="field-control" value={values.date} onChange={setField('date')} min={new Date().toISOString().split('T')[0]} />
                  {errors.date && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.date}</span>}
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Tell us about the occasion</span>
                  <textarea className="field-control" rows={4} value={values.message} onChange={setField('message')} placeholder="Engagement, retirement, a very long lunch…" />
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
                    'Send enquiry'
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
          )}
        </motion.div>
      </div>
    </section>
  )
}