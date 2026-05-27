'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface HeroOrbProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number; clicked: boolean }>
}

const PARTICLE_COUNT = 48
const dummy = new THREE.Object3D()

export default function HeroOrb({ mouseRef }: HeroOrbProps) {
  const orbRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const instancedRef = useRef<THREE.InstancedMesh>(null)
  const clickTime = useRef(-10)
  const prevClicked = useRef(false)

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        radius: 3.4 + Math.random() * 2.8,
        speed: 0.06 + Math.random() * 0.12,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        size: 0.03 + Math.random() * 0.07,
      })),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mouse = mouseRef.current

    // Detect click edge
    if (mouse.clicked && !prevClicked.current) {
      clickTime.current = t
    }
    prevClicked.current = mouse.clicked

    const clickElapsed = t - clickTime.current
    const clickBurst = Math.max(0, Math.sin(Math.min(clickElapsed * 2.5, Math.PI)))

    if (orbRef.current && materialRef.current) {
      // Entrance animation: wait briefly (0.2s), then slide in from left
      const entranceDelay = 0.2
      let entranceOffset = 0
      if (t < entranceDelay) {
        entranceOffset = -2.5 // Start from the left (center of screen)
      } else {
        // Smoothly glide into position after preloader
        entranceOffset = -2.5 * Math.exp(-(t - entranceDelay) * 2.0)
      }

      // Smooth follow cursor, biased to the right
      const targetX = mouse.x * 1.4 + 2.5 + entranceOffset
      const targetY = mouse.y * 0.9
      orbRef.current.position.x += (targetX - orbRef.current.position.x) * 0.04
      orbRef.current.position.y += (targetY - orbRef.current.position.y) * 0.04

      // Slow organic rotation
      orbRef.current.rotation.y = t * 0.1 + mouse.x * 0.5
      orbRef.current.rotation.x = Math.sin(t * 0.25) * 0.1 - mouse.y * 0.3

      // Distort reacts to mouse + click
      const dist = Math.hypot(mouse.x, mouse.y)
      const targetDistort = 0.22 + dist * 0.35 + clickBurst * 0.7
      materialRef.current.distort += (targetDistort - materialRef.current.distort) * 0.06

      const targetSpeed = 1.0 + dist * 1.8 + clickBurst * 4
      materialRef.current.speed += (targetSpeed - materialRef.current.speed) * 0.06

      const targetEmissive = 0.06 + dist * 0.18 + clickBurst * 0.55
      materialRef.current.emissiveIntensity +=
        (targetEmissive - materialRef.current.emissiveIntensity) * 0.08
    }

    if (instancedRef.current) {
      particles.forEach((p, i) => {
        const angle = p.theta + t * p.speed
        const r = p.radius + Math.sin(t * 0.35 + p.phaseX) * 0.5 + clickBurst * 1.5
        const x = r * Math.sin(p.phi) * Math.cos(angle)
        const y = r * Math.cos(p.phi) + Math.sin(t * 0.28 + p.phaseY) * 0.25
        const z = r * Math.sin(p.phi) * Math.sin(angle)
        const s = p.size * (1 + clickBurst * 0.9)
        dummy.position.set(x, y, z)
        dummy.scale.setScalar(s)
        dummy.updateMatrix()
        instancedRef.current!.setMatrixAt(i, dummy.matrix)
      })
      instancedRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <>
      {/* Minimal lighting — cooler tones for blue theme */}
      <ambientLight intensity={1.1} color="#E8EEF5" />
      <directionalLight position={[6, 6, 4]} intensity={2.2} color="#ECF4FF" />
      <directionalLight position={[-4, -3, -5]} intensity={0.7} color="#C8DCE8" />
      <pointLight position={[2, 2, 5]} intensity={1.0} color="#0A4AEB" decay={2} />

      {/* Main orb — morphing metallic sphere */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[2.6, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#E2E8EE"
          roughness={0.08}
          metalness={0.78}
          emissive="#0A4AEB"
          emissiveIntensity={0.06}
          distort={0.22}
          speed={1.0}
        />
      </mesh>

      {/* Orbital particle field */}
      <instancedMesh ref={instancedRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#3B7AFF" transparent opacity={0.5} />
      </instancedMesh>
    </>
  )
}
