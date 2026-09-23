"use client";

import { DETAIL_ITEMS } from "@/data/details";
import { DetailGlyph } from "@/components/shared/DetailGlyph";
import { RevealText } from "@/components/shared/RevealText";
import { TexturePanel } from "@/components/shared/TexturePanel";

export function DetailsSection() {
  return (
    <section id="details" className="relative bg-carbon py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <RevealText as="p" className="eyebrow mb-4">
          03 — En Détail
        </RevealText>
        <RevealText
          as="h2"
          className="mb-20 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-chrome md:mb-28"
        >
          Découverte de près, retenue de loin.
        </RevealText>

        <div className="flex flex-col gap-24 md:gap-32">
          {DETAIL_ITEMS.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={item.index}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <RevealText y={40}>
                  <TexturePanel
                    gradient="radial-gradient(120% 100% at 30% 20%, #1a1a1d 0%, #040404 60%), linear-gradient(150deg, #000 0%, #0a0a0b 100%)"
                    image={item.image}
                    imageAlt={item.imageAlt}
                    className="flex aspect-4/3 w-full items-center justify-center"
                  >
                    {!item.image && <DetailGlyph type={item.glyph} />}
                  </TexturePanel>
                </RevealText>

                <RevealText delay={0.1} y={30}>
                  <span className="eyebrow mb-4 block text-chrome/40">
                    {item.index} / 05
                  </span>
                  <h3 className="mb-5 font-display text-3xl text-chrome md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-chrome/55 md:text-lg">
                    {item.description}
                  </p>
                </RevealText>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
