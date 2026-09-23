"use client";

/**
 * A small studio rig built entirely from local Three.js lights — no remote
 * HDR environment map — so the hero renders identically offline and online,
 * and a near-black clearcoat body still reads its form from every angle.
 */
export function Lights({ lowDetail = false }: { lowDetail?: boolean }) {
  return (
    <>
      <hemisphereLight color="#3d4048" groundColor="#000000" intensity={0.55} />
      <ambientLight intensity={0.14} />

      {/* Key light — upper front-left */}
      <directionalLight position={[-4, 5, 4]} intensity={2.6} color="#f2f4f8" />

      {/* Rim light — behind and above, carves the silhouette against black */}
      <directionalLight position={[3, 4.5, -5]} intensity={3.2} color="#eef1f6" />

      {/* Fill — soft, opposite the key, keeps the front face legible */}
      <directionalLight position={[4, 2, 3]} intensity={0.9} color="#dfe3ea" />

      {/* Low practical bounce, as if from a pale studio floor */}
      <pointLight position={[0, -1.2, 3]} intensity={0.6} color="#ffffff" />

      {!lowDetail && (
        <spotLight
          position={[-2, 4.5, -2]}
          angle={0.55}
          penumbra={1}
          intensity={1.4}
          color="#ffffff"
        />
      )}
    </>
  );
}
