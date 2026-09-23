"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  CULLINAN_SILHOUETTE_PATH,
  CULLINAN_SILHOUETTE_WHEELS,
} from "@/lib/cullinanSilhouette";

gsap.registerPlugin(ScrollTrigger);

const BODY_PATH = CULLINAN_SILHOUETTE_PATH;

export function FinalHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo(
          litRef.current,
          { clipPath: "circle(0% at 50% 45%)" },
          {
            clipPath: "circle(75% at 50% 45%)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 20%",
              scrub: 0.6,
            },
          }
        );
      } else {
        gsap.set(litRef.current, { clipPath: "circle(75% at 50% 45%)" });
      }

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 40%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-void"
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <svg viewBox="0 0 760 260" className="w-[70vw] max-w-3xl" style={{ overflow: "visible" }}>
          <path
            d={BODY_PATH}
            fill="none"
            stroke="rgba(246,245,242,0.14)"
            strokeWidth={1.2}
          />
          {CULLINAN_SILHOUETTE_WHEELS.map((cx) => (
            <circle
              key={cx}
              cx={cx}
              cy={218}
              r={44}
              fill="none"
              stroke="rgba(246,245,242,0.14)"
              strokeWidth={1}
            />
          ))}
        </svg>

        <div ref={litRef} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 760 260" className="w-[70vw] max-w-3xl" style={{ overflow: "visible" }}>
            <path d={BODY_PATH} fill="rgba(8,8,9,0.95)" stroke="rgba(246,245,242,0.9)" strokeWidth={1.2} />
            {CULLINAN_SILHOUETTE_WHEELS.map((cx) => (
              <circle key={cx} cx={cx} cy={218} r={44} fill="rgba(4,4,4,0.95)" stroke="rgba(200,203,208,0.6)" strokeWidth={1} />
            ))}
          </svg>
        </div>
      </div>

      <div
        ref={titleRef}
        className="pointer-events-none relative flex flex-col items-center pb-[14%] text-center"
      >
        <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-none text-chrome">
          Cullinan
        </h2>
        <p className="eyebrow mt-5 text-chrome/50">L&rsquo;Art de l&rsquo;Arrivée</p>
      </div>
    </section>
  );
}
