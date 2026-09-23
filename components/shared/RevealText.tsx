"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type RevealTag = "div" | "p" | "h2";

export function RevealText({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  blur = 10,
}: {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(el, { opacity: 0, y, filter: `blur(${blur}px)` });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion, delay, y, blur]);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  if (as === "p") {
    return (
      <p ref={setRef} className={className}>
        {children}
      </p>
    );
  }

  if (as === "h2") {
    return (
      <h2 ref={setRef} className={className}>
        {children}
      </h2>
    );
  }

  return (
    <div ref={setRef} className={className}>
      {children}
    </div>
  );
}
