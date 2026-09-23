export type GalleryItem = {
  index: string;
  title: string;
  caption: string;
  gradient: string;
  image?: string;
  imageAlt?: string;
};

/**
 * Items with an `image` render that free-licensed photo (Pexels); the rest
 * fall back to a generated dark studio-lighting gradient panel.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    index: "01",
    title: "Extérieur",
    caption: "Des panneaux d'obsidienne, retenant la lumière plutôt que de la poursuivre.",
    gradient:
      "radial-gradient(120% 100% at 20% 0%, #1a1a1c 0%, #050505 55%), linear-gradient(120deg, #000 0%, #0d0d0e 100%)",
    image: "/images/cullinan-front-blue.jpg",
    imageAlt: "Rolls-Royce Cullinan noir mat de face, fond mural bleu",
  },
  {
    index: "02",
    title: "Nuit",
    caption: "Une silhouette qui ne se révèle que sous une lumière directe.",
    gradient:
      "radial-gradient(90% 70% at 80% 100%, #16161a 0%, #030303 60%), linear-gradient(200deg, #000 0%, #0a0a0b 100%)",
    image: "/images/cullinan-street-night.jpg",
    imageAlt: "Rolls-Royce Cullinan noire garée de nuit sous la neige",
  },
  {
    index: "03",
    title: "Artisanat",
    caption: "Des surfaces finies à la main, ajustées au millimètre près.",
    gradient:
      "radial-gradient(100% 80% at 50% 0%, #1c1c1f 0%, #040404 55%), linear-gradient(160deg, #050505 0%, #101012 100%)",
    image: "/images/wheel-emblem-bw.jpg",
    imageAlt: "Emblème de jante Rolls-Royce en noir et blanc",
  },
  {
    index: "04",
    title: "Intérieur",
    caption: "Un habitacle pensé pour le silence, puis rempli d'intention.",
    gradient:
      "radial-gradient(90% 90% at 30% 100%, #17171a 0%, #030303 55%), linear-gradient(140deg, #060606 0%, #0c0c0e 100%)",
    image: "/images/interior-dash.jpg",
    imageAlt: "Tableau de bord Rolls-Royce, compteurs et fibre de carbone",
  },
  {
    index: "05",
    title: "Black Badge",
    caption: "L'expression la plus sombre de la marque, sans compromis.",
    gradient:
      "radial-gradient(110% 90% at 70% 20%, #1e1e22 0%, #020202 55%), linear-gradient(180deg, #000 0%, #0b0b0c 100%)",
    image: "/images/emblem-bw.jpg",
    imageAlt: "Spirit of Ecstasy et emblème Rolls-Royce en noir et blanc",
  },
  {
    index: "06",
    title: "Présence",
    caption: "Une immobilité qui capte plus l'attention que le mouvement ne le pourrait.",
    gradient:
      "radial-gradient(100% 100% at 50% 50%, #19191c 0%, #030303 60%), linear-gradient(210deg, #000 0%, #0e0e10 100%)",
    image: "/images/interior-console.jpg",
    imageAlt: "Console centrale Rolls-Royce en fibre de carbone et cuir",
  },
];
