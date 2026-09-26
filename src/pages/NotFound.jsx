import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[85svh] flex-col items-center justify-center bg-noir-950 px-5 pt-24 pb-16 text-center">
      <p className="font-sans text-xs font-semibold tracking-[0.34em] text-gold-500 uppercase">
        Error 404
      </p>
      <h1 className="mt-5 font-display text-6xl text-ivory-100 sm:text-8xl">
        Off the menu
      </h1>
      <p className="mt-6 max-w-md text-base text-noir-300">
        The page you're looking for has been cleared from the pass. Let's get you back to
        something delicious.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button to="/" variant="primary">
          Back Home
        </Button>
        <Button to="/menu" variant="outline" withArrow>
          Explore the Menu
        </Button>
      </div>
      <Link
        to="/contact"
        className="mt-8 text-xs tracking-[0.22em] text-noir-400 uppercase transition-colors hover:text-gold-300"
      >
        Or find a table instead
      </Link>
    </section>
  )
}