import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../hooks/useCart'

export default function CartButton({ className = '' }) {
  const { count, openCart } = useCart()
  const [justChanged, setJustChanged] = useState(false)
  const prevCount = useRef(count)

  useEffect(() => {
    if (count > prevCount.current) {
      setJustChanged(true)
      const t = window.setTimeout(() => setJustChanged(false), 700)
      prevCount.current = count
      return () => window.clearTimeout(t)
    }
    prevCount.current = count
    return undefined
  }, [count])

  return (
    <motion.button
      type="button"
      onClick={openCart}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={`group relative flex size-11 items-center justify-center rounded-full border border-ivory-100/20 text-ivory-100 transition-colors hover:border-gold-500 hover:text-gold-400 ${className}`}
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
    >
      <ShoppingBag className="size-5" aria-hidden="true" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={`badge-${count}`}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gold-500 font-sans text-[10px] font-bold text-noir-950"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
      {justChanged && (
        <motion.span
          key="pulse"
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-gold-500"
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}