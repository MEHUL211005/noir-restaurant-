import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Minus, Plus, X, Leaf, Flame, ShoppingBag } from 'lucide-react'
import Modal from '../ui/Modal'
import { useCart } from '../../hooks/useCart'

export default function DishModal({ item, isOpen, onClose }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (isOpen) setQuantity(1)
  }, [isOpen, item?.id])

  if (!item) return null

  const submit = (event) => {
    event.preventDefault()
    addItem(item, quantity)
    setQuantity(1)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="dish-modal-title">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center border border-ivory-100/20 bg-noir-950/60 text-ivory-100 backdrop-blur-sm transition-colors hover:border-gold-500 hover:text-gold-400"
        aria-label="Close dish details"
      >
        <X className="size-4" aria-hidden="true" />
      </button>

      <div className="grid sm:grid-cols-2">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="h-64 w-full object-cover sm:h-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/50 to-transparent sm:bg-gradient-to-r" aria-hidden="true" />
        </div>

        <div className="flex flex-col p-7 sm:p-9">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase">
            {item.vegetarian && (
              <span className="flex items-center gap-1.5 text-gold-400">
                <Leaf className="size-3.5" aria-hidden="true" /> Vegetarian
              </span>
            )}
            {item.spicy && (
              <span className="flex items-center gap-1.5 text-red-300">
                <Flame className="size-3.5" aria-hidden="true" /> Spicy
              </span>
            )}
            {item.popular && <span className="text-noir-300">Chef recommends</span>}
          </div>

          <h2 id="dish-modal-title" className="mt-4 font-display text-4xl leading-tight text-ivory-100">
            {item.name}
          </h2>
          <p className="mt-1.5 text-sm text-noir-400">{item.category}</p>

          <p className="mt-5 text-sm leading-relaxed text-noir-300">{item.description}</p>

          <div className="mt-6">
            <h3 className="font-sans text-xs font-semibold tracking-[0.24em] text-gold-500 uppercase">
              Ingredients
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="border border-ivory-100/12 px-3 py-1 text-xs text-ivory-100/80"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submit} className="mt-auto pt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-3xl text-gold-400">${item.price.toFixed(2)}</p>

              <div className="flex items-center border border-ivory-100/20" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex size-11 items-center justify-center text-ivory-100/70 transition-colors hover:text-gold-400 disabled:opacity-30"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <span className="w-10 text-center font-sans text-sm text-ivory-100" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="flex size-11 items-center justify-center text-ivory-100/70 transition-colors hover:text-gold-400"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="btn btn-primary mt-6 w-full"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              Add to Order — ${(item.price * quantity).toFixed(2)}
            </motion.button>
          </form>
        </div>
      </div>
    </Modal>
  )
}