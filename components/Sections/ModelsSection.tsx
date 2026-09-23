"use client";

import { MODEL_VARIANTS } from "@/data/models";
import { RevealText } from "@/components/shared/RevealText";
import { TexturePanel } from "@/components/shared/TexturePanel";

export function ModelsSection() {
  return (
    <section id="models" className="relative bg-carbon py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <RevealText as="p" className="eyebrow">
            02 — La Gamme
          </RevealText>
          <RevealText
            as="h2"
            className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-chrome md:max-w-2xl md:text-right"
          >
            Deux caractères, une seule vision.
          </RevealText>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {MODEL_VARIANTS.map((model, i) => (
            <RevealText key={model.index} delay={i * 0.12} y={36}>
              <TexturePanel
                gradient={model.gradient}
                image={model.image}
                imageAlt={model.imageAlt}
                kenBurns
                className="mb-7 flex aspect-4/3 w-full items-end p-7 md:p-9"
              >
                <span className="eyebrow relative text-chrome/50">
                  {model.index} — {model.name}
                </span>
              </TexturePanel>
              <h3 className="mb-2 font-display text-2xl text-chrome md:text-3xl">
                {model.tagline}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-chrome/55 md:text-lg">
                {model.description}
              </p>
            </RevealText>
          ))}
        </div>

        <RevealText
          as="p"
          delay={0.2}
          className="mt-14 max-w-2xl text-sm text-chrome/35 md:mt-20"
        >
          Génération Série II — la même architecture, deux tempéraments.
        </RevealText>
      </div>
    </section>
  );
}
