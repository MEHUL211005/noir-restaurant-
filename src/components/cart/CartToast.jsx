import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { EASE } from '../../lib/animations'

export default function CartToast() {
  const { lastAdded, openCart } = useCart()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!lastAdded) return undefined
    setShow(true)
    const t = window.setTimeout(() => setShow(false), 2600)
    return () => window.clearTimeout(t)
  }, [lastAdded])

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[95] w-full max-w-sm -translate-x-1/2 px-4">
      <AnimatePresence>
        {show && lastAdded && (
          <motion.button
            type="button"
            onClick={openCart}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pointer-events-auto flex w-full items-center gap-4 border border-gold-500/40 bg-noir-800/95 p-4 text-left shadow-2xl backdrop-blur-sm"
            aria-live="polite"
          >
            <span className="flex size-10 shrink-0 items-center justify-center bg-gold-500 text-noir-950">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            {lastAdded.image && (
              <img
                src={lastAdded.image}
                alt=""
                className="h-12 w-12 shrink-0 rounded-none object-cover"
                loading="eager"
              />
            )}
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg leading-tight text-ivory-100">
                Added to your order
              </span>
              <span className="block truncate text-sm text-noir-300">
                {lastAdded.quantity} × {lastAdded.name}
              </span>
            </span>
            <span className="shrink-0 text-xs tracking-wide text-gold-400 uppercase">
              View cart
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}