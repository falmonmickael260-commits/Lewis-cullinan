"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "high" | "low";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

/**
 * Coarse heuristic to keep the 3D scene at 60fps on weaker hardware:
 * touch-primary devices, small viewports, and low core counts get the
 * lighter render path.
 */
function getSnapshot(): DeviceTier {
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallViewport = window.innerWidth < 820;
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  return coarsePointer || smallViewport || lowCores ? "low" : "high";
}

function getServerSnapshot(): DeviceTier {
  return "high";
}

export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
