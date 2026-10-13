'use client';

// components/Hero3D.tsx
// Atmospheric gold particles for the PRESSI luxury beauty hero.

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import type { Group } from 'three';

type PointerPosition = {
  x: number;
  y: number;
};

type ParticleProps = {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
  pointer: PointerPosition;
  animate: boolean;
};

const PARTICLE_COUNT = 30;

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
    x: Math.sin(index * 127.1) * 4.8,
    y: Math.sin(index * 78.2) * 2.9,
    z: Math.cos(index * 31.7) * 0.8,
    size: 0.018 + (index % 4) * 0.009,
    speed: 0.16 + (index % 5) * 0.045,
    phase: index * 0.83,
    opacity: 0.32 + (index % 4) * 0.13,
  }));
}

function GoldParticle({
  x,
  y,
  z,
  size,
  speed,
  phase,
  opacity,
  pointer,
  animate,
}: ParticleProps) {
  const groupRef = useRef<Group | null>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.elapsedTime;

    if (animate) {
      group.position.x = x + pointer.x * 0.12;
      group.position.y =
        y + Math.sin(time * speed + phase) * 0.12 + pointer.y * 0.09;

      group.rotation.x = Math.sin(time * speed + phase) * 0.15;
      group.rotation.y = time * speed * 0.35;
      group.rotation.z = Math.sin(time * speed * 0.7 + phase) * 0.12;
    } else {
      group.position.set(x, y, z);
      group.rotation.set(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]} scale={size}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#C9A961"
          emissive="#A8843F"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.24}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

function ParticleField({
  pointer,
  animate,
}: {
  pointer: PointerPosition;
  animate: boolean;
}) {
  const particles = useMemo(() => createParticles(), []);

  return (
    <>
      <ambientLight intensity={0.85} />
      <pointLight position={[0, 2, 4]} intensity={1.1} color="#F6E8C8" />

      {particles.map((particle, index) => (
        <GoldParticle
          key={index}
          {...particle}
          pointer={pointer}
          animate={animate}
        />
      ))}
    </>
  );
}

export default function Hero3D() {
  const reducedMotion = useReducedMotion();
  const pointerRef = useRef<PointerPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleField
          pointer={pointerRef.current}
          animate={!reducedMotion}
        />
      </Canvas>
    </div>
  );
}
