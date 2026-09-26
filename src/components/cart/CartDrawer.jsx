import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart, calculateTotals } from '../../hooks/useCart'
import CartItem from './CartItem'
import Button from '../ui/Button'
import { EASE } from '../../lib/animations'

export default function CartDrawer() {
  const { items, isOpen, closeCart, clearCart, subtotal } = useCart()
  const totals = calculateTotals(subtotal)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[70] h-full w-full bg-noir-950/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="fixed top-0 right-0 z-[75] flex h-full w-full max-w-md flex-col border-l border-ivory-100/10 bg-noir-900 shadow-[-30px_0_80px_rgba(0,0,0,0.55)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <header className="flex items-center justify-between border-b border-ivory-100/10 px-6 py-5">
              <h2 className="flex items-center gap-3 font-display text-2xl text-ivory-100">
                <ShoppingBag className="size-5 text-gold-500" aria-hidden="true" />
                Your Order
              </h2>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs tracking-wide text-noir-400 transition-colors hover:text-red-400"
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  className="flex size-9 items-center justify-center border border-ivory-100/15 text-ivory-100 transition-colors hover:border-gold-500 hover:text-gold-400"
                  aria-label="Close cart"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                  <span className="flex size-16 items-center justify-center rounded-full border border-ivory-100/15 text-noir-400">
                    <ShoppingBag className="size-7" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-2xl text-ivory-100">Your cart is empty.</p>
                    <p className="mt-2 text-sm text-noir-400">
                      The tandoor is waiting. Add something wonderful.
                    </p>
                  </div>
                  <Button to="/menu" variant="outline" onClick={closeCart} withArrow>
                    Browse the Menu
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-ivory-100/10">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-ivory-100/10 px-6 py-6">
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
                  to="/checkout"
                  onClick={closeCart}
                  className="btn btn-primary group mt-5 w-full"
                >
                  Proceed to Checkout
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}