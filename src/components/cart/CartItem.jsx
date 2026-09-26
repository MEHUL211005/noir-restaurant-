import { motion } from 'motion/react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../hooks/useCart'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 border-b border-ivory-100/10 py-5"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden bg-noir-800">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-lg leading-tight text-ivory-100">{item.name}</h4>
            <p className="mt-0.5 text-sm text-gold-400">${item.price.toFixed(2)}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-noir-400 transition-colors hover:text-red-400"
            aria-label={`Remove ${item.name} from order`}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center border border-ivory-100/15">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex size-8 items-center justify-center text-ivory-100/70 transition-colors hover:text-gold-400 disabled:opacity-30"
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={item.quantity <= 1}
            >
              <Minus className="size-3.5" aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm text-ivory-100" aria-label={`Quantity ${item.quantity}`}>
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex size-8 items-center justify-center text-ivory-100/70 transition-colors hover:text-gold-400"
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus className="size-3.5" aria-hidden="true" />
            </button>
          </div>
          <p className="font-sans text-sm font-semibold text-ivory-100">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.li>
  )
}