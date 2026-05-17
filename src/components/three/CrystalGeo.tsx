'use client'

import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { colors } from '@/lib/colors'

export default function CrystalGeo() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  const [hovered, setHovered] = useState(false)

  // Track mouse for parallax
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (!meshRef.current) return

    // Slow auto-rotation
    meshRef.current.rotation.y += 0.0025
    meshRef.current.rotation.x += 0.001

    // Smooth mouse parallax
    const targetX = (state.pointer.x * viewport.width) / 2
    const targetY = (state.pointer.y * viewport.height) / 2

    mouse.current.x += (targetX - mouse.current.x) * 0.04
    mouse.current.y += (targetY - mouse.current.y) * 0.04

    meshRef.current.rotation.y += mouse.current.x * 0.0008
    meshRef.current.rotation.x += -mouse.current.y * 0.0006
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} color="#E8EEF5" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#ECF4FF"
        castShadow
      />
      <directionalLight
        position={[-4, -2, -4]}
        intensity={0.8}
        color="#C8DCE8"
      />
      <pointLight
        position={[0, 4, 2]}
        intensity={1.2}
        color={colors.accent}
        distance={10}
      />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* The crystal geometry */}
      <Float
        speed={1.4}
        rotationIntensity={0.2}
        floatIntensity={0.6}
      >
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.04 : 1}
        >
          {/* Icosahedron — a premium geometric form */}
          <icosahedronGeometry args={[2.2, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.04}
            ior={1.52}
            chromaticAberration={0.025}
            thickness={1.6}
            distortion={0.15}
            distortionScale={0.4}
            temporalDistortion={0.08}
            color="#E2E8EE"
            attenuationColor={colors.accentLight}
            attenuationDistance={2}
          />
        </mesh>
      </Float>

      {/* Subtle supporting sphere for depth */}
      <mesh position={[-3.5, -1.5, -3]} scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          transmission={0.8}
          roughness={0.1}
          ior={1.4}
          color="#E2E8EE"
          thickness={0.8}
        />
      </mesh>
    </>
  )
}
