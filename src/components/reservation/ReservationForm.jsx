import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarDays, CheckCircle2, Loader2 } from 'lucide-react'
import { EASE } from '../../lib/animations'

const empty = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  requests: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email does not look right.'
  if (!values.phone.trim()) errors.phone = 'A phone number is required.'
  else if (!/^[+\d][\d\s()\-.]{6,}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!values.date) errors.date = 'Choose a date for your visit.'
  else if (new Date(values.date) < new Date(new Date().toDateString())) errors.date = 'The date cannot be in the past.'
  if (!values.time) errors.time = 'Pick a time.'
  if (!values.guests || values.guests < 1 || values.guests > 20) errors.guests = 'Between 1 and 20 guests.'
  return errors
}

export default function ReservationForm({ compact = false }) {
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

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col items-center border border-gold-500/40 bg-noir-900 px-8 py-16 text-center"
        role="status"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-gold-500 text-noir-950">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-3xl text-ivory-100">Your reservation request has been received.</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-noir-300">
          Merci — we will call {values.name.split(' ')[0] || 'you'} shortly at {values.phone} to
          confirm your table for {values.guests} on {values.date}.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(empty)
            setStatus('idle')
          }}
          className="mt-8 text-xs tracking-[0.22em] text-gold-400 uppercase transition-colors hover:text-gold-300"
        >
          Make another request
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border border-ivory-100/10 bg-noir-900/70 p-6 sm:p-9">
      <div className={`grid gap-5 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        <Field label="Name" error={errors.name}>
          <input type="text" className="field-control" value={values.name} onChange={setField('name')} placeholder="Aisha Verma" autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" className="field-control" value={values.email} onChange={setField('email')} placeholder="you@example.com" autoComplete="email" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input type="tel" className="field-control" value={values.phone} onChange={setField('phone')} placeholder="+1 (555) 000-0000" autoComplete="tel" />
        </Field>
        <Field label="Date" error={errors.date}>
          <input type="date" className="field-control" value={values.date} onChange={setField('date')} min={new Date().toISOString().split('T')[0]} />
        </Field>
        <Field label="Time" error={errors.time}>
          <select className={`field-control ${!values.time ? 'text-noir-400' : ''}`} value={values.time} onChange={setField('time')}>
            <option value="" disabled>Select a time</option>
            {['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Guests" error={errors.guests} className={compact ? 'hidden sm:block' : ''}>
          <select className="field-control" value={values.guests} onChange={setField('guests')}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Special requests (optional)">
          <textarea
            className="field-control"
            value={values.requests}
            onChange={setField('requests')}
            rows={compact ? 3 : 4}
            placeholder="Anniversaries, allergies, window seats — tell us everything."
          />
        </Field>
      </div>

      <div className={`mt-7 flex flex-col items-start gap-4 ${compact ? 'sm:flex-row sm:items-center sm:justify-between' : ''}`}>
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          disabled={status === 'loading'}
          className="btn btn-primary w-full sm:w-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <CalendarDays className="size-4" aria-hidden="true" />
              Request Reservation
            </>
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

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-sans text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">
        {label}
      </span>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="field-error mt-1.5 block text-xs"
          role="alert"
        >
          {error}
        </motion.span>
      )}
    </label>
  )
}