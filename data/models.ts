export type ModelVariant = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  image: string;
  imageAlt: string;
};

/**
 * The current Cullinan lineup (Series II, introduced 2024/2025) — two
 * distinct characters built on the same architecture. Kept deliberately
 * light on specification numbers here; the verified performance figures
 * live in the Performance section so nothing is stated twice.
 */
export const MODEL_VARIANTS: ModelVariant[] = [
  {
    index: "01",
    name: "Cullinan",
    tagline: "Le Grand Tourisme Absolu",
    description:
      "La version originelle — celle qui a inventé la catégorie. Une présence imposante, un confort sans compromis, et cette capacité rare à traverser n'importe quel terrain sans jamais perdre son calme.",
    gradient:
      "radial-gradient(120% 100% at 25% 10%, #1c1c1f 0%, #050505 55%), linear-gradient(135deg, #000 0%, #0d0d0e 100%)",
    image: "/images/cullinan-street-night.jpg",
    imageAlt: "Rolls-Royce Cullinan noire garée de nuit devant un hôtel enneigé",
  },
  {
    index: "02",
    name: "Black Badge",
    tagline: "L'Alter Ego",
    description:
      "La même architecture, poussée dans ses retranchements. Chromes noircis, réponse moteur plus vive, une présence plus sombre et plus affirmée — pensée pour ceux qui préfèrent l'ombre à la lumière.",
    gradient:
      "radial-gradient(120% 100% at 75% 90%, #1a1a1d 0%, #030303 55%), linear-gradient(315deg, #000 0%, #0b0b0c 100%)",
    image: "/images/emblem-bw.jpg",
    imageAlt: "Spirit of Ecstasy et emblème Rolls-Royce en noir et blanc",
  },
];
