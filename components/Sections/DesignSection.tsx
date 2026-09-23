"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/shared/RevealText";
import { TexturePanel } from "@/components/shared/TexturePanel";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function DesignSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="design" className="relative bg-carbon py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <RevealText as="p" className="eyebrow">
            01 — Design
          </RevealText>
          <RevealText
            as="h2"
            className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] text-chrome md:max-w-3xl md:text-right"
          >
            Une Présence Qui S&rsquo;Impose
          </RevealText>
        </div>

        <div className="overflow-hidden rounded-sm">
          <div ref={panelRef}>
            <TexturePanel
              gradient="radial-gradient(140% 100% at 15% 0%, #18181b 0%, #050505 55%), linear-gradient(125deg, #000 0%, #0c0c0d 100%)"
              image="/images/cullinan-front-blue.jpg"
              imageAlt="Rolls-Royce Cullinan noir mat, calandre éclairée, présentée devant une œuvre murale bleue"
              className="aspect-video w-full"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3">
          <RevealText
            as="p"
            className="font-display text-xl italic text-chrome/85 md:col-span-1 md:text-2xl"
          >
            &laquo;&nbsp;Chaque surface est dessinée pour retenir la lumière,
            non pour la poursuivre.&nbsp;&raquo;
          </RevealText>
          <RevealText
            as="p"
            delay={0.1}
            className="text-base leading-relaxed text-chrome/55 md:col-span-2 md:text-lg"
          >
            La silhouette de la Cullinan est délibérément, presque
            farouchement, simple — une ligne ininterrompue du capot au
            hayon, si bien que la carrosserie se lit comme un geste unique
            plutôt qu&rsquo;une somme de panneaux. Une forme conçue pour
            s&rsquo;imposer dans une pièce, immobile, bien avant que le
            moteur ne démarre.
          </RevealText>
        </div>
      </div>
    </section>
  );
}
