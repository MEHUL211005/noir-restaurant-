import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'motion/react'
import RestaurantScene from './RestaurantScene'

export default function Scene3D({ isMobile, reducedMotion }) {
  const containerRef = useRef(null)
  const scrollRef = useRef(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const total = el.offsetHeight || window.innerHeight
      const progress = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / total))
      scrollRef.current = progress
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 300)
    return () => window.clearTimeout(timer)
  }, [])

  const canvasProps = useMemo(
    () => ({
      shadows: true,
      dpr: isMobile ? [1, 1.5] : [1, 2],
      camera: { position: [0, 0.55, 5.6], fov: 35 },
      gl: { antialias: true, alpha: true, powerPreference: 'high-performance' },
    }),
    [isMobile],
  )

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <Canvas {...canvasProps}>
          <RestaurantScene
            scrollRef={scrollRef}
            reducedMotion={reducedMotion}
            lowPower={isMobile}
          />
        </Canvas>
      </motion.div>
    </div>
  )
}