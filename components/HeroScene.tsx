"use client";

import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { Shape, ExtrudeGeometry, MathUtils, Group } from "three";
import { useMemo, useRef } from "react";

function TShirtMesh() {
  const group = useRef<Group>(null);

  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-1.2, 1.85);
    shape.lineTo(-1.85, 1.1);
    shape.lineTo(-2.45, 1.28);
    shape.lineTo(-2.9, 0.38);
    shape.lineTo(-2.2, -0.08);
    shape.lineTo(-1.75, 0.18);
    shape.lineTo(-1.55, -2.85);
    shape.lineTo(1.55, -2.85);
    shape.lineTo(1.75, 0.18);
    shape.lineTo(2.2, -0.08);
    shape.lineTo(2.9, 0.38);
    shape.lineTo(2.45, 1.28);
    shape.lineTo(1.85, 1.1);
    shape.lineTo(1.2, 1.85);
    shape.quadraticCurveTo(0.55, 1.15, 0, 1.05);
    shape.quadraticCurveTo(-0.55, 1.15, -1.2, 1.85);

    return new ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.08,
      curveSegments: 24
    });
  }, []);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      -0.18 + pointerX * 0.5 + Math.sin(t * 0.4) * 0.06,
      0.06
    );
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      pointerY * 0.2 + Math.sin(t * 0.8) * 0.04,
      0.06
    );
    group.current.position.y = Math.sin(t * 0.9) * 0.18;
    group.current.position.x = MathUtils.lerp(group.current.position.x, pointerX * 0.35, 0.04);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.24} floatIntensity={0.65}>
      <group ref={group} rotation={[0.18, -0.3, 0]}>
        <mesh geometry={geometry} castShadow receiveShadow position={[0, 0, -0.25]}>
          <meshPhysicalMaterial
            color="#090909"
            roughness={0.22}
            metalness={0.42}
            clearcoat={1}
            clearcoatRoughness={0.12}
            sheen={1}
            sheenColor="#8a1812"
            envMapIntensity={1.6}
          />
        </mesh>

        <mesh position={[0, 0.1, 0.34]} castShadow>
          <planeGeometry args={[2.4, 2.5, 1, 1]} />
          <MeshTransmissionMaterial
            color="#ff4c2e"
            thickness={0.4}
            roughness={0.18}
            ior={1.15}
            transmission={0.5}
            chromaticAberration={0.03}
            backside
          />
        </mesh>

        <mesh position={[0, 0.18, 0.38]}>
          <planeGeometry args={[1.55, 1.7]} />
          <meshBasicMaterial transparent opacity={0.88} color="#ffe7d4" />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#050505", 8, 20]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 6, 4]} intensity={4.5} color="#fff4ed" castShadow />
      <directionalLight position={[-4, -2, 6]} intensity={2.2} color="#ff6d4d" />
      <spotLight position={[0, 4, 6]} intensity={20} angle={0.35} penumbra={1} color="#ff5a36" />
      <TShirtMesh />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
    </>
  );
}
