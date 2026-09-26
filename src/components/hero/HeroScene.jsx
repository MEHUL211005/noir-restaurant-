import { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useIsMobile } from '../../hooks/useMediaQuery'

const Scene3D = lazy(() => import('../../3d/Scene3D'))

const detectWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

export default function HeroScene() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const webglOk = detectWebGL()

  if (!webglOk) {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-label="NOIR dining room">
        <img
          src="/images/hero-fallback.jpg"
          alt="NOIR — the candlelit dining room"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-noir-950/45" />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center" role="status" aria-live="polite">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="size-7 animate-spin text-gold-500" aria-hidden="true" />
            <p className="font-sans text-xs tracking-[0.3em] text-ivory-100/60 uppercase">
              Setting the table
            </p>
          </div>
        </div>
      }
    >
      <Scene3D isMobile={isMobile} reducedMotion={Boolean(reducedMotion)} />
    </Suspense>
  )
}