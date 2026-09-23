"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type RefObject } from "react";
import { Scene } from "./Scene";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useDeviceTier } from "@/lib/useDeviceTier";

export function Hero3D({
  scrollProgress,
}: {
  scrollProgress: RefObject<number>;
}) {
  const reducedMotion = useReducedMotion();
  const deviceTier = useDeviceTier();
  const lowDetail = deviceTier === "low";

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={lowDetail ? [1, 1.25] : [1, 2]}
        camera={{ position: [0, 1.05, 10.8], fov: 30 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050505"]} />
        <Suspense fallback={null}>
          <Scene
            scrollProgress={scrollProgress}
            reducedMotion={reducedMotion}
            lowDetail={lowDetail}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
