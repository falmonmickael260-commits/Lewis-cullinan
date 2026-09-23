"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPECIFICATIONS } from "@/data/specifications";
import { RevealText } from "@/components/shared/RevealText";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function StatBlock({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const numeric = parseFloat(value);
  const suffix = value.replace(/^-?[\d.]+/, "");
  const isNumeric = !Number.isNaN(numeric) && /^[\d.]+/.test(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !isNumeric) return;

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: index * 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
      gsap.to(counter, {
        val: numeric,
        duration: 1.6,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          const decimals = value.includes(".") ? 1 : 0;
          el.querySelector(".stat-number")!.textContent =
            counter.val.toFixed(decimals) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion, numeric, isNumeric, suffix, value, index]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="stat-number font-display text-[clamp(2.6rem,6vw,5rem)] leading-none text-chrome">
        {isNumeric ? "0" + suffix : value}
      </span>
      <span className="eyebrow mt-4 text-chrome/45">{label}</span>
    </div>
  );
}

export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="relative bg-void py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <RevealText as="p" className="eyebrow">
            04 — Performance
          </RevealText>
          <RevealText
            as="h2"
            className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] text-chrome md:max-w-2xl md:text-right"
          >
            La Puissance Sans Excès
          </RevealText>
        </div>

        <div className="hairline mb-16 md:mb-20" />

        <div className="grid grid-cols-2 gap-y-16 gap-x-6 md:grid-cols-3 md:gap-x-10">
          {SPECIFICATIONS.map((spec, i) => (
            <StatBlock
              key={spec.label}
              value={spec.value}
              label={spec.label}
              index={i}
            />
          ))}
        </div>

        <RevealText
          as="p"
          delay={0.2}
          className="mt-20 max-w-2xl text-base leading-relaxed text-chrome/45 md:mt-28 md:text-lg"
        >
          Un V12 biturbo, réglé non pour le spectacle mais pour
          l&rsquo;aisance — la sensation de réserves de puissance immenses,
          gardées presque entièrement en retrait.
        </RevealText>
      </div>
    </section>
  );
}
