"use client";

import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/cullinan/scene.glb";

const BLACK_PAINT = new THREE.MeshPhysicalMaterial({
  color: "#0c0c0e",
  metalness: 0.55,
  roughness: 0.28,
  clearcoat: 0.9,
  clearcoatRoughness: 0.15,
});

const GLASS = new THREE.MeshPhysicalMaterial({
  color: "#050506",
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.55,
  transparent: true,
  opacity: 0.55,
});

const WHITE_LIGHT = new THREE.MeshStandardMaterial({
  color: "#eef0f4",
  emissive: "#ffffff",
  emissiveIntensity: 0.4,
  roughness: 0.25,
});

const RED_LIGHT = new THREE.MeshStandardMaterial({
  color: "#3a0507",
  emissive: "#a41118",
  emissiveIntensity: 0.5,
  roughness: 0.35,
});

const AMBER_LIGHT = new THREE.MeshStandardMaterial({
  color: "#4a2c05",
  emissive: "#d97a10",
  emissiveIntensity: 0.4,
  roughness: 0.35,
});

const TIRE_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#0a0a0a",
  roughness: 0.9,
});

const RIM_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#c9cacb",
  metalness: 1,
  roughness: 0.28,
});

/**
 * This particular free asset ships several rig parts — all four wheels,
 * plus underbody/mechanical bits — with broken transforms: their geometry
 * is baked at the world origin instead of their real position (confirmed
 * by inspecting the glTF node graph, where every ancestor transform up to
 * these meshes is identity). A legitimate body panel is never a small
 * cluster of vertices sitting exactly at the car's origin, so that's used
 * as a generic detector instead of chasing material names one by one.
 * Detected meshes are hidden and, for the wheels, replaced with simple
 * procedural ones placed at the real wheel-arch positions.
 */
function isMisplacedRigPart(mesh: THREE.Mesh) {
  const geometry = mesh.geometry;
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return false;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  return center.length() < 0.5 && Math.max(size.x, size.y, size.z) < 1.5;
}

function classifyMaterial(name: string) {
  const n = name.toLowerCase();
  if (n.includes("glass") || n.includes("mirror")) return GLASS;
  if (
    n.includes("taillight") ||
    n.includes("reverselight") ||
    n.includes("chmsl")
  )
    return RED_LIGHT;
  if (n.includes("signal")) return AMBER_LIGHT;
  if (
    n.includes("lowbeam") ||
    n.includes("highbeam") ||
    n.includes("foglight") ||
    n.includes("runninglight")
  )
    return WHITE_LIGHT;
  return BLACK_PAINT;
}

const WHEEL_RADIUS = 0.42;
const WHEEL_Y = 1.0;
const WHEEL_POSITIONS: Array<[number, number, number]> = [
  [-0.98, WHEEL_Y, -1.68],
  [0.98, WHEEL_Y, -1.68],
  [-0.98, WHEEL_Y, 1.55],
  [0.98, WHEEL_Y, 1.55],
];

function ProceduralWheels() {
  return (
    <>
      {WHEEL_POSITIONS.map((pos, i) => (
        <group key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={TIRE_MATERIAL}>
            <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.34, 32]} />
          </mesh>
          {/* THREE.TorusGeometry lies flat with its normal along Z by
              default, while CylinderGeometry's axis is Y — without this
              extra 90°-X rotation the rim ends up in the wrong plane from
              the tire once the shared 90°-Z rotation above is applied,
              which is what read as a "bent" or "twisted" rim. */}
          <mesh
            position={[0, 0.002, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={RIM_MATERIAL}
          >
            <torusGeometry args={[WHEEL_RADIUS * 0.76, 0.05, 8, 32]} />
          </mesh>
          <mesh position={[0, 0.19, 0]} material={RIM_MATERIAL}>
            <cylinderGeometry args={[0.035, 0.035, 0.05, 6]} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export function CullinanModel() {
  const { scene } = useGLTF(MODEL_URL);

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const original = mesh.material as THREE.Material | THREE.Material[];
        const name = Array.isArray(original)
          ? original[0]?.name
          : original?.name;

        if (isMisplacedRigPart(mesh)) {
          mesh.visible = false;
          return;
        }

        mesh.material = classifyMaterial(name ?? "");
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [cloned]);

  return (
    <>
      {/* The source file was authored Z-up (Blender's convention) and
          never converted on export, and isn't centered on its own origin.
          This rotation swaps Z/Y to match three.js's Y-up world, and the
          offset sets the car's belly on the ground plane and centers it
          on Z. */}
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.419, 0.359]}>
        <primitive object={cloned} />
      </group>
      <ProceduralWheels />
    </>
  );
}

useGLTF.preload(MODEL_URL);
