import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraRig({ scrollRef, reducedMotion = false }) {
  const smoothPointer = useRef({ x: 0, y: 0 })
  const smoothScroll = useRef(0)

  useFrame((state, delta) => {
    const targetX = state.pointer.x * (reducedMotion ? 0.15 : 0.5)
    const targetY = state.pointer.y * (reducedMotion ? 0.1 : 0.35)

    smoothPointer.current.x = THREE.MathUtils.damp(
      smoothPointer.current.x,
      targetX,
      2.4,
      delta,
    )
    smoothPointer.current.y = THREE.MathUtils.damp(
      smoothPointer.current.y,
      targetY,
      2.4,
      delta,
    )

    const scroll = scrollRef?.current ?? 0
    smoothScroll.current = THREE.MathUtils.damp(smoothScroll.current, scroll, 2.2, delta)

    const baseZ = 5.6 - smoothScroll.current * 0.9
    state.camera.position.x = smoothPointer.current.x * 0.55
    state.camera.position.y = 0.55 + smoothPointer.current.y * 0.35 - smoothScroll.current * 0.35
    state.camera.position.z = baseZ
    state.camera.lookAt(0, 0.05, 0)
  })

  return null
}