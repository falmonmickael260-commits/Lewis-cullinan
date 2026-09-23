"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function BlackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          once: true,
        },
      });

      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 2.6, ease: "sine.out" }
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 20, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "expo.out",
          },
          "-=1.8"
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 20, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "expo.out",
          },
          "-=1.1"
        );

      if (!reducedMotion) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.85,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2.6,
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-void"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div className="relative flex flex-col items-center px-6 text-center">
        <h2
          ref={line1Ref}
          className="font-display text-[clamp(1.9rem,5.5vw,4rem)] leading-tight text-chrome/85"
        >
          Le noir n&rsquo;est pas une absence.
        </h2>
        <h2
          ref={line2Ref}
          className="font-display text-[clamp(1.9rem,5.5vw,4rem)] leading-tight text-chrome"
        >
          C&rsquo;est une présence.
        </h2>
      </div>
    </section>
  );
}
