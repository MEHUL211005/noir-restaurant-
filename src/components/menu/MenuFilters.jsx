import { motion } from 'motion/react'
import { Search, X, Leaf, Flame, Star, Drumstick } from 'lucide-react'
import { categories } from '../../data/menu'

export default function MenuFilters({ filters, onChange, search, onSearch, resultCount }) {
  const toggle = (key) => {
    onChange({ ...filters, [key]: !filters[key] })
  }

  const isFiltered = search.length > 0 || filters.vegetarian || filters.nonVegetarian || filters.spicy || filters.popular || filters.category !== 'All'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="flex max-w-full flex-wrap gap-2"
        >
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onChange({ ...filters, category: cat })}
              aria-pressed={filters.category === cat}
              className={`border px-4 py-2 font-sans text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
                filters.category === cat
                  ? 'border-gold-500 bg-gold-500 text-noir-950'
                  : 'border-ivory-100/15 text-ivory-100/70 hover:border-gold-500/60 hover:text-gold-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-noir-400" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search dishes…"
            aria-label="Search dishes"
            className="w-full border border-ivory-100/15 bg-transparent py-3 pr-10 pl-11 text-sm text-ivory-100 placeholder:text-noir-400 transition-colors focus:border-gold-500 focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-noir-400 transition-colors hover:text-gold-400"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Dietary filters" className="flex flex-wrap gap-2">
          <FilterToggle active={filters.vegetarian} onClick={() => toggle('vegetarian')} icon={Leaf} label="Vegetarian" />
          <FilterToggle active={filters.nonVegetarian} onClick={() => toggle('nonVegetarian')} icon={Drumstick} label="Non-vegetarian" />
          <FilterToggle active={filters.spicy} onClick={() => toggle('spicy')} icon={Flame} label="Spicy" />
          <FilterToggle active={filters.popular} onClick={() => toggle('popular')} icon={Star} label="Popular" />
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={() => onChange({ category: 'All', vegetarian: false, nonVegetarian: false, spicy: false, popular: false })}
            className="flex items-center gap-1.5 text-xs tracking-wide text-noir-300 transition-colors hover:text-gold-400 uppercase"
          >
            <X className="size-3.5" aria-hidden="true" />
            Clear filters
          </button>
        )}

        <motion.p
          key={resultCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-auto text-sm text-noir-400"
          aria-live="polite"
        >
          {resultCount} dish{resultCount === 1 ? '' : 'es'}
        </motion.p>
      </div>
    </div>
  )
}

function FilterToggle({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 border px-4 py-2 font-sans text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
        active
          ? 'border-gold-500 bg-gold-500/10 text-gold-400'
          : 'border-ivory-100/12 text-ivory-100/55 hover:border-ivory-100/30 hover:text-ivory-100'
      }`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  )
}