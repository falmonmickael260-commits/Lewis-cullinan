"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import {
  CullinanLoaderComposition,
  LOADER_DURATION_IN_FRAMES,
  LOADER_FPS,
} from "@/remotion/CullinanLoader/CullinanLoaderComposition";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function LoaderGate({ onComplete }: { onComplete?: () => void }) {
  const reducedMotion = useReducedMotion();
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w > 0 && h > 0) {
        setSize({ w, h });
      } else {
        raf = requestAnimationFrame(measure);
      }
    };
    measure();
    return () => cancelAnimationFrame(raf);
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFading(true);
    document.body.style.overflow = "";
    window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 700);
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    const t = window.setTimeout(finish, 500);
    return () => window.clearTimeout(t);
  }, [reducedMotion, finish]);

  useEffect(() => {
    if (reducedMotion || !size) return;
    const durationMs = (LOADER_DURATION_IN_FRAMES / LOADER_FPS) * 1000 + 150;
    const t = window.setTimeout(finish, durationMs);
    return () => window.clearTimeout(t);
  }, [reducedMotion, size, finish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-carbon transition-opacity duration-700 ease-out"
      style={{
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden={fading}
      role="status"
      aria-live="polite"
      aria-label="Chargement de l'expérience Rolls-Royce Cullinan"
    >
      {size && !reducedMotion && (
        <Player
          ref={playerRef}
          component={CullinanLoaderComposition}
          durationInFrames={LOADER_DURATION_IN_FRAMES}
          fps={LOADER_FPS}
          compositionWidth={size.w}
          compositionHeight={size.h}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop={false}
          controls={false}
          showVolumeControls={false}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          doubleClickToFullscreen={false}
        />
      )}

      <div className="pointer-events-none absolute top-8 left-6 md:top-10 md:left-10 eyebrow">
        Rolls-Royce
      </div>

      <button
        type="button"
        onClick={finish}
        className="eyebrow absolute bottom-8 right-6 md:bottom-10 md:right-10 rounded-full border border-[color:var(--line)] px-4 py-2 transition-colors hover:border-[color:var(--line-strong)] hover:text-chrome cursor-pointer"
      >
        Passer
      </button>
    </div>
  );
}
