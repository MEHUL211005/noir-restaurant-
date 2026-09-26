import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { X, ArrowUpRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import { restaurant } from '../../data/restaurant'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/private-dining', label: 'Private Dining' },
  { to: '/contact', label: 'Contact' },
]

const LIST_STAGGER = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
}

const LIST_ITEM = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-[55] bg-noir-950"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { clipPath: 'circle(150% at 92% 6%)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
        closed: { clipPath: 'circle(0% at 92% 6%)', transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
      }}
      aria-hidden={!isOpen}
      aria-label="Mobile navigation"
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pt-24 pb-10">
        <motion.ul
          className="flex flex-1 flex-col justify-start"
          variants={reducedMotion ? undefined : LIST_STAGGER}
          initial={reducedMotion ? false : 'hidden'}
          animate={isOpen && !reducedMotion ? 'visible' : false}
        >
          {links.map((link, i) => {
            const active = isActive(link.to)
            return (
              <motion.li key={link.to} variants={LIST_ITEM}>
                <Link
                  to={link.to}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={onClose}
                  className={`group flex items-baseline gap-3 py-3 font-display text-4xl transition-colors duration-300 sm:text-5xl ${
                    active ? 'text-gold-400 italic' : 'text-ivory-100 hover:text-gold-300'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="font-sans text-xs tracking-[0.3em] text-noir-400">
                    0{i + 1}
                  </span>
                  {link.label}
                  <ArrowUpRight
                    className="size-5 self-center opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                    aria-hidden="true"
                  />
                </Link>
                {active && <span className="block h-px w-24 bg-gold-500/60" />}
              </motion.li>
            )
          })}
        </motion.ul>

        <div className="mt-auto space-y-5 border-t border-ivory-100/10 pt-8">
          <div className="flex flex-wrap gap-3">
            <Button to="/contact#reserve" variant="primary" className="flex-1" onClick={onClose}>
              Reserve a Table
            </Button>
            <Button to="/menu" variant="outline" className="flex-1" onClick={onClose}>
              Explore Menu
            </Button>
          </div>
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm text-noir-300 transition-colors hover:text-gold-300"
          >
            <Phone className="size-4" aria-hidden="true" />
            {restaurant.phone}
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-5 flex size-11 items-center justify-center rounded-full border border-ivory-100/20 text-ivory-100 transition-colors hover:border-gold-500 hover:text-gold-400"
          aria-label="Close menu"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  )
}