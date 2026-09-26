import Hero from '../components/hero/Hero'
import Marquee from '../components/sections/Marquee'
import SignatureDishes from '../components/sections/SignatureDishes'
import MenuPreview from '../components/menu/MenuPreview'
import CinematicQuote from '../components/sections/CinematicQuote'
import Testimonials from '../components/sections/Testimonials'
import ReservationSection from '../components/sections/ReservationSection'
import FAQ from '../components/sections/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SignatureDishes />
      <CinematicQuote />
      <MenuPreview />
      <Testimonials />
      <ReservationSection />
      <FAQ />
    </>
  )
}