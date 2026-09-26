import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SearchX } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import MenuFilters from '../components/menu/MenuFilters'
import MenuItem from '../components/menu/MenuItem'
import DishModal from '../components/menu/DishModal'
import ReservationSection from '../components/sections/ReservationSection'
import { menuItems } from '../data/menu'
import { stagger } from '../lib/animations'

export default function Menu() {
  const [filters, setFilters] = useState({
    category: 'All',
    vegetarian: false,
    nonVegetarian: false,
    spicy: false,
    popular: false,
  })
  const [search, setSearch] = useState('')
  const [activeDish, setActiveDish] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return menuItems.filter((item) => {
      if (filters.category !== 'All' && item.category !== filters.category) return false
      if (filters.vegetarian && !item.vegetarian) return false
      if (filters.nonVegetarian && item.vegetarian) return false
      if (filters.spicy && !item.spicy) return false
      if (filters.popular && !item.popular) return false
      if (q) {
        const haystack = `${item.name} ${item.description} ${item.ingredients.join(' ')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [filters, search])

  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title="Written in fire, seasoned by memory"
        description="Six movements — starters, tandoor, mains, rice & breads, desserts and drinks. Filter, search, and add whatever calls to you."
        image="/images/dish-butter-chicken.jpg"
        alt="Saffron butter chicken at NOIR"
      />

      <section className="bg-noir-950 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <MenuFilters
            filters={filters}
            onChange={setFilters}
            search={search}
            onSearch={setSearch}
            resultCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-5 border border-ivory-100/10 py-24 text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-ivory-100/15 text-noir-400">
                <SearchX className="size-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-3xl text-ivory-100">No dishes found.</h2>
                <p className="mt-2 max-w-sm text-sm text-noir-400">
                  Try a different search or clear the filters — the tandoor is full of other ideas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilters({ category: 'All', vegetarian: false, nonVegetarian: false, spicy: false, popular: false })
                  setSearch('')
                }}
                className="text-xs tracking-[0.22em] text-gold-400 uppercase transition-colors hover:text-gold-300"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <motion.ul
              className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
              variants={stagger}
              initial="hidden"
              animate="visible"
              key={`${filters.category}-${search}`}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <MenuItem key={item.id} item={item} onSelect={setActiveDish} />
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </section>

      <ReservationSection compact />

      <DishModal
        item={activeDish}
        isOpen={Boolean(activeDish)}
        onClose={() => setActiveDish(null)}
      />
    </>
  )
}