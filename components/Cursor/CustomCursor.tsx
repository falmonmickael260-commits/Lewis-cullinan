"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-none-desktop");

    const dotTo = { x: 0, y: 0 };
    const setDotX = gsap.quickSetter(dotRef.current, "x", "px");
    const setDotY = gsap.quickSetter(dotRef.current, "y", "px");
    const ringX = gsap.quickTo(ringRef.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ringRef.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      dotTo.x = e.clientX;
      dotTo.y = e.clientY;
      setDotX(dotTo.x);
      setDotY(dotTo.y);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], [data-cursor='view']"
      );
      setHovering(!!interactive);
      setLabel(
        interactive?.getAttribute("data-cursor") === "view" ? "VOIR" : ""
      );
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.body.classList.remove("cursor-none-desktop");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-200 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chrome transition-opacity duration-200"
        style={{ opacity: hovering ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-200 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--line-strong)] transition-all duration-300 ease-out"
        style={{
          width: hovering ? 72 : 34,
          height: hovering ? 72 : 34,
          background: hovering ? "rgba(246,245,242,0.06)" : "transparent",
        }}
      >
        {label && (
          <span className="eyebrow text-[9px] tracking-[0.2em] text-chrome">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
