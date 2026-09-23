"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero3D } from "@/components/Hero3D/Hero3D";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!textRef.current) return;

    const entrance = gsap.timeline({ delay: 0.2 });
    entrance
      .fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" }
      )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 30, filter: "blur(16px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
        },
        "-=0.7"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
        "-=0.9"
      )
      .fromTo(
        scrollDownRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

    if (reducedMotion) return;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        gsap.set(textRef.current, {
          opacity: 1 - Math.min(self.progress / 0.4, 1),
          y: self.progress * -40,
        });
        gsap.set(scrollDownRef.current, {
          opacity: 1 - Math.min(self.progress / 0.15, 1),
        });
      },
    });

    return () => st.kill();
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className="relative h-[200vh] bg-carbon"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Hero3D scrollProgress={scrollProgress} />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />

        <div
          ref={textRef}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] flex flex-col items-center text-center"
        >
          <p className="hero-eyebrow eyebrow mb-4">Rolls-Royce</p>
          <h1 className="hero-title font-display text-[clamp(3.2rem,11vw,9rem)] leading-[0.95] tracking-tight text-chrome">
            Cullinan
          </h1>
          <p className="hero-subtitle eyebrow mt-5 text-chrome/55">
            Une Déclaration En Mouvement
          </p>
        </div>

        <div
          ref={scrollDownRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
        >
          <span className="eyebrow text-chrome/40">Défiler</span>
          <div className="h-10 w-px bg-gradient-to-b from-chrome/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
