// src/components/three/FloatingSphere.js
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

function AnimatedSphere() {
  const sphereRef = useRef()

  useFrame(({ clock }) => {
    sphereRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2
    sphereRef.current.rotation.z = clock.getElapsedTime() * 0.2
  })

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#4299e1"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
      />
    </Sphere>
  )
}

export default function FloatingSphere() {
  return (
    <div className="absolute right-0 top-0 w-96 h-96 -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  )
}