"use client";

import { useState } from "react";
import { RevealText } from "@/components/shared/RevealText";
import { TexturePanel } from "@/components/shared/TexturePanel";
import { Magnetic } from "@/components/shared/Magnetic";

export function VideoSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative bg-carbon py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <RevealText as="p" className="eyebrow mb-4">
          05 — Film
        </RevealText>

        <div
          className={`relative overflow-hidden transition-all duration-700 ease-out ${
            expanded ? "aspect-video" : "aspect-21/9"
          }`}
        >
          <TexturePanel
            gradient="radial-gradient(140% 120% at 50% 30%, #1c1c20 0%, #030303 60%), linear-gradient(160deg, #000 0%, #0a0a0b 100%)"
            image="/images/motion-night.jpg"
            imageAlt="Berline Rolls-Royce noire filant dans une rue, effet de filé"
            className="h-full w-full"
          >
            <div
              className="absolute inset-0 animate-[sweep_9s_linear_infinite]"
              style={{
                background:
                  "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
            />
          </TexturePanel>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/25">
            <h2 className="eyebrow text-center text-chrome/80">
              La Puissance Sans Excès
            </h2>
            <Magnetic className="pointer-events-auto">
              <button
                type="button"
                data-cursor="hover"
                onClick={() => setExpanded((v) => !v)}
                className="eyebrow cursor-pointer rounded-full border border-[color:var(--line-strong)] bg-black/30 px-7 py-3.5 text-chrome backdrop-blur-sm transition-colors hover:bg-chrome hover:text-void"
              >
                {expanded ? "Fermer" : "Regarder le Film"}
              </button>
            </Magnetic>
          </div>
        </div>

        <RevealText
          as="p"
          delay={0.15}
          className="mx-auto mt-10 max-w-xl text-center text-sm text-chrome/35"
        >
          Une image d&rsquo;ambiance, pas un arrêt sur la Cullinan elle-même
          — et non des images officielles Rolls-Royce.
        </RevealText>
      </div>
    </section>
  );
}
