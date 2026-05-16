'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroOrb from './HeroOrb'

interface PrismSceneProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number; clicked: boolean }>
}

export default function PrismScene({ mouseRef }: PrismSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <HeroOrb mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  )
}
