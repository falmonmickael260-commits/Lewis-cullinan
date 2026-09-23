"use client";

import { RevealText } from "@/components/shared/RevealText";
import { TexturePanel } from "@/components/shared/TexturePanel";

const MARKS = [
  { value: "Goodwood", label: "Angleterre" },
  { value: "À la Main", label: "Chaque Panneau Ajusté" },
  { value: "Sur Mesure", label: "Aucune Ne Se Ressemble" },
];

export function CraftsmanshipSection() {
  return (
    <section
      id="craftsmanship"
      className="relative bg-carbon py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <RevealText y={40}>
            <TexturePanel
              gradient="radial-gradient(120% 100% at 30% 20%, #1a1a1d 0%, #040404 60%), linear-gradient(150deg, #000 0%, #0a0a0b 100%)"
              image="/images/leather-stitch.jpg"
              imageAlt="Cuir noir surpiqué à la main, détail d'une portière Rolls-Royce"
              className="aspect-4/5 w-full md:aspect-auto md:h-full"
            />
          </RevealText>

          <div className="flex flex-col justify-center gap-8">
            <div>
              <RevealText as="p" className="eyebrow mb-4">
                07 — Savoir-faire
              </RevealText>
              <RevealText
                as="h2"
                className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-chrome"
              >
                Fabriquée à la main, éprouvée par le temps.
              </RevealText>
            </div>

            <RevealText
              as="p"
              delay={0.1}
              className="text-base leading-relaxed text-chrome/55 md:text-lg"
            >
              Chaque Cullinan est assemblée au siège de la marque, à
              Goodwood, en Angleterre — où l&rsquo;ajustement des panneaux,
              la profondeur de la peinture et les coutures sont encore
              jugés à la main et à l&rsquo;œil avant qu&rsquo;une voiture
              ne soit autorisée à porter le nom.
            </RevealText>

            <div className="hairline" />

            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {MARKS.map((mark) => (
                <div key={mark.value}>
                  <dt className="font-display text-2xl text-chrome md:text-3xl">
                    {mark.value}
                  </dt>
                  <dd className="eyebrow mt-2 text-chrome/40">
                    {mark.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
