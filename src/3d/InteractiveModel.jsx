import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DEEP_UMBER = '#4a2412'
const MID_UMBER = '#6b3418'
const GOLD = '#d8b45a'
const DARK_GOLD = '#b8862e'
const CERAMIC = '#1a1512'
const CREAM = '#f3e2c8'
const HERB = '#2f5d3a'
const SPICE = '#6b3a1f'
const MADDER = '#8a241c'

function Cilantro({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.14, 0.16, 0.015]} />
        <meshStandardMaterial color={HERB} roughness={0.7} />
      </mesh>
      <mesh position={[0.11, -0.02, 0.02]}>
        <boxGeometry args={[0.11, 0.13, 0.015]} />
        <meshStandardMaterial color="#3e7046" roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function InteractiveModel({ scrollRef, reducedMotion = false, lowPower = false }) {
  const group = useRef(null)
  const spinner = useRef(null)
  const smoothRot = useRef({ x: 0, y: 0.45 })
  const smoothScroll = useRef(0)

  const mound = useMemo(() => {
    const arr = []
    for (let i = 0; i < 26; i += 1) {
      const angle = (i / 26) * Math.PI * 2
      const ring = Math.floor(i / 6)
      const radius = 0.22 + ring * 0.13 + (i % 3) * 0.03
      const scale = 0.34 - ring * 0.07
      arr.push({
        x: Math.cos(angle) * radius * 1.15,
        z: Math.sin(angle) * radius * 0.9,
        y: 0.34 + Math.sin(angle * 3 + i) * (ring * 0.05) + ring * 0.12,
        s: scale,
      })
    }
    return arr
  }, [])

  const spices = useMemo(
    () =>
      Array.from({ length: lowPower ? 5 : 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2 + 0.4
        const radius = 1.55 + (i % 3) * 0.14
        return {
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
          s: 0.05 + (i % 2) * 0.02,
          y: 0.05 + (i % 2) * 0.04,
        }
      }),
    [lowPower],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    const targetY = 0.45 + state.pointer.x * (reducedMotion ? 0.06 : 0.28)
    const targetX = state.pointer.y * (reducedMotion ? 0.03 : 0.12)

    smoothRot.current.y = THREE.MathUtils.damp(smoothRot.current.y, targetY, 2.6, delta)
    smoothRot.current.x = THREE.MathUtils.damp(smoothRot.current.x, targetX, 2.6, delta)

    const scroll = scrollRef?.current ?? 0
    smoothScroll.current = THREE.MathUtils.damp(smoothScroll.current, scroll, 2.2, delta)

    if (group.current) {
      const float = reducedMotion ? 0 : Math.sin(t * 0.9) * 0.06
      group.current.position.y = float
      group.current.rotation.x = smoothRot.current.x - smoothScroll.current * 0.1
      group.current.rotation.z = Math.sin(t * 0.5) * 0.01
    }
    if (spinner.current && !reducedMotion) {
      spinner.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={group}>
      <group ref={spinner}>
        {/* Ceramic serving platter */}
        <mesh receiveShadow castShadow position={[0, -0.02, 0]}>
          <cylinderGeometry args={[2.3, 2.42, 0.16, 64, 1]} />
          <meshStandardMaterial color={CERAMIC} roughness={0.45} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[2.28, 2.28, 0.02, 64]} />
          <meshStandardMaterial color="#231c17" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Gold rim */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.29, 0.022, 16, 96]} />
          <meshStandardMaterial color={GOLD} roughness={0.28} metalness={0.85} />
        </mesh>

        {/* Ground spice ring */}
        <mesh position={[0, 0.095, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.98, 0.05, 12, 64]} />
          <meshStandardMaterial color={SPICE} roughness={1} />
        </mesh>

        {/* Scattered spices */}
        {spices.map((s, i) => (
          <mesh key={`s${i}`} position={[s.x, s.y, s.z]} castShadow>
            <sphereGeometry args={[s.s, 16, 12]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#5d3a20' : '#c9a962'} roughness={0.5} metalness={0.3} />
          </mesh>
        ))}

        {/* Glazed serving bowl */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <sphereGeometry args={[1.32, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <meshStandardMaterial
            color={MADDER}
            roughness={0.22}
            metalness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner bowl glaze highlight */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.18, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          <meshStandardMaterial color="#a8322a" roughness={0.15} metalness={0.4} side={THREE.DoubleSide} />
        </mesh>

        {/* The mound — saffron butter chicken */}
        <group position={[0, 0.66, 0]}>
          <mesh position={[0, -0.12, 0]} scale={[1.25, 0.5, 1.02]} castShadow>
            <sphereGeometry args={[0.82, 40, 24]} />
            <meshStandardMaterial color={MID_UMBER} roughness={0.5} />
          </mesh>
          {mound.map((b, i) => (
            <mesh key={`m${i}`} position={[b.x, b.y, b.z]} scale={[b.s, b.s * 0.92, b.s]} castShadow>
              <sphereGeometry args={[0.6, 24, 16]} />
              <meshStandardMaterial color={i % 4 === 0 ? DEEP_UMBER : MID_UMBER} roughness={0.55} />
            </mesh>
          ))}

          {/* Golden sauce dome */}
          <mesh position={[0.05, 0.72, 0.02]} castShadow>
            <sphereGeometry args={[0.66, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={DARK_GOLD} roughness={0.25} metalness={0.5} />
          </mesh>
          <mesh position={[-0.2, 0.42, 0.1]}>
            <sphereGeometry args={[0.34, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
            <meshStandardMaterial color="#c98f2e" roughness={0.3} metalness={0.45} />
          </mesh>

          {/* Cream swirl */}
          <mesh position={[0.24, 0.95, -0.14]} rotation={[0.6, 0, 0.5]}>
            <torusGeometry args={[0.22, 0.026, 10, 32, Math.PI * 1.3]} />
            <meshStandardMaterial color={CREAM} roughness={0.4} />
          </mesh>

          {/* Gold thread */}
          <mesh position={[-0.05, 0.92, 0.2]} rotation={[0.9, 0.3, -0.4]}>
            <torusGeometry args={[0.18, 0.012, 8, 24, Math.PI * 1.5]} />
            <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Cilantro garnish */}
          <Cilantro position={[-0.55, 0.42, 0.4]} rotation={[0.2, -0.6, 0.3]} />
          <Cilantro position={[0.6, 0.36, 0.2]} rotation={[0.3, 1.2, -0.2]} />
          <Cilantro position={[0.1, 0.78, 0.55]} rotation={[0.1, 0.4, 0.5]} />
        </group>
      </group>
    </group>
  )
}