"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_ITEMS } from "@/data/gallery";
import { RevealText } from "@/components/shared/RevealText";
import { TexturePanel } from "@/components/shared/TexturePanel";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function GallerySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current!;
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, {
            x: -(track.scrollWidth - window.innerWidth) * self.progress,
          });
        },
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section id="gallery" className="relative bg-carbon">
      <div className="mx-auto max-w-[1600px] px-6 pt-32 md:px-10 md:pt-48">
        <RevealText as="p" className="eyebrow mb-4">
          06 — Galerie
        </RevealText>
        <RevealText
          as="h2"
          className="mb-16 max-w-2xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-chrome md:mb-20"
        >
          Une œuvre, non une fiche technique.
        </RevealText>
      </div>

      <div
        ref={wrapperRef}
        className="relative h-auto overflow-hidden lg:h-screen"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 pb-32 md:px-10 lg:h-full lg:flex-row lg:items-center lg:gap-8 lg:pb-0 lg:pl-10"
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={item.index} item={item} offset={i % 2 === 1} />
          ))}
          <div className="hidden shrink-0 lg:block lg:w-[8vw]" />
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  offset,
}: {
  item: (typeof GALLERY_ITEMS)[number];
  offset: boolean;
}) {
  return (
    <div
      className={`group relative aspect-4/5 w-full shrink-0 lg:h-[62vh] lg:w-[46vw] ${
        offset ? "lg:translate-y-8" : "lg:-translate-y-8"
      }`}
    >
      <TexturePanel
        gradient={item.gradient}
        image={item.image}
        imageAlt={item.imageAlt}
        kenBurns
        className="h-full w-full"
      >
        <div
          data-cursor="view"
          className="absolute inset-0 flex flex-col justify-end p-7 transition-all duration-500 group-hover:scale-[1.03] md:p-9"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="eyebrow relative text-chrome/50">
            {item.index} / {GALLERY_ITEMS_LENGTH}
          </span>
          <h3 className="relative mt-2 font-display text-2xl text-chrome md:text-3xl">
            {item.title}
          </h3>
          <p className="relative mt-2 max-w-xs text-sm text-chrome/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {item.caption}
          </p>
        </div>
      </TexturePanel>
    </div>
  );
}

const GALLERY_ITEMS_LENGTH = GALLERY_ITEMS.length.toString().padStart(2, "0");
