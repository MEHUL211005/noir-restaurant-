import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu } from 'lucide-react'
import Button from '../ui/Button'
import CartButton from '../cart/CartButton'
import MobileMenu from './MobileMenu'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/private-dining', label: 'Private Dining' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ivory-100/10 bg-noir-950/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12"
          aria-label="Primary"
        >
          <Link
            to="/"
            className="group relative z-[60] flex items-center gap-3 focus-visible:outline-none"
            aria-label="NOIR — home"
          >
            <span className="flex size-9 items-center justify-center border border-gold-500/60 font-display text-2xl font-semibold text-gold-500 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-noir-950">
              N
            </span>
            <span className="font-display text-xl tracking-[0.1em] text-ivory-100 sm:text-2xl sm:tracking-[0.14em]">
              NOIR
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink item={link} />
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <CartButton />
            <Button to="/contact#reserve" variant="primary" className="px-6! py-3!">
              Reserve a Table
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="relative z-[60] flex size-11 items-center justify-center rounded-full border border-ivory-100/20 text-ivory-100 transition-colors hover:border-gold-500 hover:text-gold-400"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu isOpen onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function NavLink({ item }) {
  const location = useLocation()
  const active =
    item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)

  return (
    <Link
      to={item.to}
      className={`relative py-2 text-[12px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
        active ? 'text-gold-400' : 'text-ivory-100/85 hover:text-gold-300'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {item.label}
      {active && (
        <motion.span
          layoutId="desktop-active-indicator"
          className="absolute -bottom-1 left-0 h-px w-full bg-gold-500"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}