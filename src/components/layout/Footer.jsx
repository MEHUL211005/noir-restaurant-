import { Link, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { restaurant } from '../../data/restaurant'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/private-dining', label: 'Private Dining' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const location = useLocation()

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-ivory-100/10 bg-noir-950">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" onClick={scrollTop} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-gold-500/60 font-display text-2xl font-semibold text-gold-500">
                N
              </span>
              <span className="font-display text-2xl tracking-[0.14em] text-ivory-100">
                NOIR
              </span>
            </Link>
            <p className="mt-5 font-display text-xl text-noir-300 italic">
              {restaurant.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-noir-400">
              Bold Indian flavors, refined through a contemporary lens. A cinematic dining
              room in the heart of SoHo.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOIR on Instagram"
                className="flex size-10 items-center justify-center border border-ivory-100/15 text-noir-300 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NOIR on Facebook"
                className="flex size-10 items-center justify-center border border-ivory-100/15 text-noir-300 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
                  <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V11H5.5v3.5H8V21h3.5v-6.5h2.7l.8-3.5h-3.5V8a1 1 0 0 1 1-1h3.5V3Z" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h3 className="font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">
              Visit
            </h3>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={scrollTop}
                    className={`group inline-flex items-center gap-1 text-sm transition-colors ${
                      location.pathname === item.to
                        ? 'text-gold-400'
                        : 'text-ivory-100/80 hover:text-gold-300'
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight
                      className="size-3 opacity-0 transition-opacity group-hover:opacity-60"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="font-sans text-xs font-semibold tracking-[0.28em] text-gold-500 uppercase">
              Find us
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-ivory-100/80">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-gold-300"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden="true" />
                  {restaurant.address}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold-300"
                >
                  <Phone className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
                  {restaurant.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurant.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-gold-300"
                >
                  <Mail className="size-4 shrink-0 text-gold-500" aria-hidden="true" />
                  {restaurant.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-noir-400">
              {restaurant.hoursList.slice(0, 3).map((h) => (
                <span key={h.day}>
                  <span className="text-ivory-100/60">{h.day}</span> · {h.time}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory-100/10 pt-8 text-xs text-noir-400 sm:flex-row">
          <p>© {new Date().getFullYear()} NOIR Restaurant. All rights reserved.</p>
          <p className="font-display text-ivory-100/40 italic">
            Tradition, Reimagined — every single day.
          </p>
        </div>
      </div>
    </footer>
  )
}