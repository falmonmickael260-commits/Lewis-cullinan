"use client";
/* eslint-disable react-hooks/immutability --
 * react-three-fiber's documented pattern is to mutate the camera and refs
 * imperatively inside useFrame every tick for performance — the React
 * Compiler-oriented immutability/refs rules don't yet model that idiom.
 */

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CullinanModel } from "./CullinanModel";
import { Lights } from "./Lights";

export function Scene({
  scrollProgress,
  reducedMotion,
  lowDetail,
}: {
  scrollProgress: React.RefObject<number>;
  reducedMotion: boolean;
  lowDetail: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, camera } = useThree();

  const targetTilt = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const progress = scrollProgress.current ?? 0;

    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.055;

      targetTilt.current.x = pointer.y * -0.04;
      targetTilt.current.y = pointer.x * 0.1;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTilt.current.x,
        0.04
      );
    }

    // Scroll-driven reveal: car rises slightly and camera dollies in
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.15, 0.05, progress);

    const baseZ = 10.8;
    const targetZ = baseZ - progress * 2.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    const targetY = 1.05 - progress * 0.35;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);

    camera.lookAt(0, 0.15, 0);
  });

  return (
    <>
      <Lights lowDetail={lowDetail} />
      <group ref={groupRef} rotation={[0, 1.15, 0]}>
        <CullinanModel />
      </group>
      <fog attach="fog" args={["#050505", 11, 20]} />
    </>
  );
}
