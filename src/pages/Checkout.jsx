import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingBag, Loader2, CheckCircle2, ReceiptText } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import Button from '../components/ui/Button'
import { useCart, calculateTotals } from '../hooks/useCart'
import { EASE } from '../lib/animations'

const empty = {
  name: '',
  email: '',
  phone: '',
  orderType: 'Dine-in',
  instructions: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please share your name.'
  if (!values.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email does not look right.'
  if (!values.phone.trim()) errors.phone = 'A phone number is required.'
  else if (!/^[+\d][\d\s()\-.]{6,}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  return errors
}

export default function Checkout() {
  const { items, clearCart, subtotal } = useCart()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const totals = calculateTotals(subtotal)

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
    window.setTimeout(() => {
      setStatus('success')
      clearCart()
    }, 1500)
  }

  if (status === 'success') {
    return (
      <section className="flex min-h-[80svh] items-center bg-noir-950 px-5 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto flex max-w-xl flex-col items-center border border-gold-500/40 bg-noir-900 px-8 py-16 text-center"
          role="status"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-gold-500 text-noir-950">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-display text-3xl text-ivory-100 sm:text-4xl">
            Your order request has been received.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-noir-300">
            Thank you, {values.name.split(' ')[0] || 'friend'}. We'll confirm your {values.orderType.toLowerCase()}{' '}
            order shortly by phone at {values.phone}.
          </p>
          <p className="mt-3 text-xs text-noir-400 italic">
            This is a request — no payment has been taken and nothing is final until we confirm.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/menu" variant="primary">
              Browse the Menu
            </Button>
            <Button to="/" variant="outline">
              Back Home
            </Button>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Almost at the table"
        description="Tell us who and where, and the kitchen will confirm your order by phone."
        image="/images/restaurant-interior.jpg"
        alt="The NOIR kitchen sideboard in the evening"
      />

      <section className="bg-noir-950 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {items.length === 0 ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center border border-ivory-100/10 px-8 py-20 text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-ivory-100/15 text-noir-400">
                <ShoppingBag className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-3xl text-ivory-100">Your cart is empty.</h2>
              <p className="mt-3 max-w-sm text-sm text-noir-400">
                Nothing to check out just yet. The tandoor will keep your ego-warming.
              </p>
              <div className="mt-8">
                <Button to="/menu" variant="primary" withArrow>
                  Explore the Menu
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl text-ivory-100">Your details</h2>
                <form onSubmit={submit} noValidate className="mt-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Name</span>
                      <input type="text" className="field-control" value={values.name} onChange={setField('name')} placeholder="Your full name" autoComplete="name" />
                      {errors.name && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.name}</span>}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Email</span>
                      <input type="email" className="field-control" value={values.email} onChange={setField('email')} placeholder="you@example.com" autoComplete="email" />
                      {errors.email && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.email}</span>}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Phone</span>
                      <input type="tel" className="field-control" value={values.phone} onChange={setField('phone')} placeholder="+1 (555) 000-0000" autoComplete="tel" />
                      {errors.phone && <span className="field-error mt-1.5 block text-xs" role="alert">{errors.phone}</span>}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Order type</span>
                      <select className="field-control" value={values.orderType} onChange={setField('orderType')}>
                        <option value="Dine-in">Dine-in (pick up at table)</option>
                        <option value="Takeaway">Takeaway</option>
                      </select>
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-ivory-100/70 uppercase">Special instructions (optional)</span>
                      <textarea className="field-control" rows={4} value={values.instructions} onChange={setField('instructions')} placeholder="Allergies, spice level, extra ghee on the naan…" />
                    </label>
                  </div>

                  <div className="mt-8 flex flex-col items-start gap-4">
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
                        'Place order request'
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
                    <p className="max-w-lg text-xs leading-relaxed text-noir-400">
                      Submitting this form places a request with the restaurant. It is not a payment
                      and does not reserve or confirm your order until a member of our team calls you.
                    </p>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-5">
                <aside aria-label="Order summary" className="border border-ivory-100/10 bg-noir-900 lg:sticky lg:top-28">
                  <header className="flex items-center justify-between border-b border-ivory-100/10 px-7 py-5">
                    <h2 className="flex items-center gap-3 font-display text-2xl text-ivory-100">
                      <ReceiptText className="size-5 text-gold-500" aria-hidden="true" />
                      Order summary
                    </h2>
                    <span className="text-xs text-noir-400">
                      {items.length} item{items.length === 1 ? '' : 's'}
                    </span>
                  </header>

                  <ul className="max-h-[46dvh] space-y-4 overflow-y-auto px-7 py-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4">
                        <span className="relative">
                          <img src={item.image} alt="" className="h-14 w-14 object-cover" loading="lazy" />
                          <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-noir-950">
                            {item.quantity}
                          </span>
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-ivory-100">{item.name}</p>
                          <p className="text-xs text-noir-400">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <span className="text-sm text-ivory-100">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <footer className="border-t border-ivory-100/10 px-7 py-6">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between text-noir-300">
                        <dt>Subtotal</dt>
                        <dd className="text-ivory-100">${totals.subtotal.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between text-noir-300">
                        <dt>Tax (8.875%)</dt>
                        <dd className="text-ivory-100">${totals.tax.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-ivory-100/10 pt-3 font-semibold text-ivory-100">
                        <dt>Total</dt>
                        <dd>${totals.total.toFixed(2)}</dd>
                      </div>
                    </dl>
                    <Link
                      to="/menu"
                      className="mt-5 inline-block text-xs tracking-[0.2em] text-noir-400 uppercase transition-colors hover:text-gold-300"
                    >
                      ← Keep adding dishes
                    </Link>
                  </footer>
                </aside>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}