"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
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
        ".hero-byline",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.8"
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
        gsap.set(textRef.current, {
          opacity: 1 - Math.min(self.progress / 0.4, 1),
          y: self.progress * -40,
        });
        gsap.set(scrollDownRef.current, {
          opacity: 1 - Math.min(self.progress / 0.15, 1),
        });
        gsap.set(mediaRef.current, {
          scale: 1.15 - self.progress * 0.15,
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
        <div ref={mediaRef} className="absolute inset-0 scale-[1.15]">
          {reducedMotion ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/cullinan-front-blue.jpg"
              alt="Rolls-Royce Cullinan noir mat, calandre éclairée, présentée devant une œuvre murale bleue"
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.85)" }}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/cullinan-front-blue.jpg"
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.85)" }}
            >
              <source src="/videos/hero-mascot.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_25%,transparent_60%,rgba(0,0,0,0.55)_100%)]" />

        <div
          ref={textRef}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] flex flex-col items-center text-center"
        >
          <p className="hero-eyebrow eyebrow mb-4">Rolls-Royce</p>
          <h1 className="hero-title font-display text-[clamp(3.2rem,11vw,9rem)] leading-[0.95] tracking-tight text-chrome">
            Cullinan
          </h1>
          <p className="hero-byline mt-3 font-display text-sm italic text-chrome/45">
            par Nexoo
          </p>
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
