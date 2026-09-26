import { motion } from 'motion/react'
import { Leaf, Flame } from 'lucide-react'
import { staggerItem } from '../../lib/animations'

export default function MenuItem({ item, onSelect }) {
  return (
    <motion.article variants={staggerItem} className="group">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="flex h-full w-full cursor-pointer flex-col text-left focus-visible:outline-gold-500"
        aria-label={`${item.name} — $${item.price.toFixed(2)}. View details.`}
      >
        <div className="relative overflow-hidden bg-noir-800">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
          <span className="absolute top-3 left-3 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase">
            {item.vegetarian && (
              <span className="flex items-center gap-1 border border-gold-500/50 bg-noir-950/70 px-2 py-1 text-gold-400 backdrop-blur-sm" title="Vegetarian">
                <Leaf className="size-3" aria-hidden="true" />
                Veg
              </span>
            )}
            {item.spicy && (
              <span className="flex items-center gap-1 border border-red-400/50 bg-noir-950/70 px-2 py-1 text-red-300 backdrop-blur-sm" title="Spicy">
                <Flame className="size-3" aria-hidden="true" />
                Spicy
              </span>
            )}
          </span>
          {item.popular && (
            <span className="absolute right-3 bottom-3 border border-gold-500/60 bg-noir-950/80 px-2 py-1 text-[10px] tracking-[0.2em] text-gold-300 uppercase backdrop-blur-sm">
              Popular
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col border border-ivory-100/10 border-t-0 p-5 transition-colors duration-500 group-hover:border-gold-500/30">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl leading-tight text-ivory-100 transition-colors duration-300 group-hover:text-gold-300">
              {item.name}
            </h3>
            <span className="shrink-0 font-display text-xl text-gold-400">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-noir-400">
            {item.description}
          </p>
          <span className="mt-4 text-[11px] font-semibold tracking-[0.22em] text-noir-400 uppercase transition-colors duration-300 group-hover:text-gold-400">
            View & add
          </span>
        </div>
      </button>
    </motion.article>
  )
}