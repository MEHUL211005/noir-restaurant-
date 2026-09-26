import { Environment, ContactShadows, Lightformer } from '@react-three/drei'
import CameraRig from './CameraRig'
import InteractiveModel from './InteractiveModel'

export default function RestaurantScene({ scrollRef, reducedMotion = false, lowPower = false }) {
  return (
    <>
      <ambientLight intensity={lowPower ? 0.5 : 0.32} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={lowPower ? 1.4 : 1.8}
        color="#fff1dc"
        castShadow={!lowPower}
        shadow-mapSize={[lowPower ? 512 : 1024, lowPower ? 512 : 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-5, 3, -3]} intensity={lowPower ? 0.5 : 0.7} color="#bfa06a" />
      <pointLight position={[0, 2.2, 2.6]} intensity={lowPower ? 0.6 : 0.9} color="#ffb45e" decay={2} />

      <Environment resolution={lowPower ? 128 : 256}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 0]} scale={[8, 4, 1]} color="#fff6e3" />
        <Lightformer form="rect" intensity={1.4} position={[-4, 1, 2]} rotation-y={Math.PI / 2} scale={[5, 3, 1]} color="#e0a94f" />
        <Lightformer form="ring" intensity={1.6} position={[4, 1.5, 1]} scale={[3, 3, 1]} color="#ffcf8a" />
        <Lightformer form="rect" intensity={0.8} position={[0, -1, -4]} rotation-y={Math.PI} scale={[10, 3, 1]} color="#1a1410" />
      </Environment>

      <ContactShadows
        position={[0, 0.015, 0]}
        opacity={0.65}
        scale={10}
        blur={2.4}
        far={4}
        resolution={lowPower ? 128 : 256}
        color="#000000"
      />

      <InteractiveModel scrollRef={scrollRef} reducedMotion={reducedMotion} lowPower={lowPower} />
      <CameraRig scrollRef={scrollRef} reducedMotion={reducedMotion} />
    </>
  )
}