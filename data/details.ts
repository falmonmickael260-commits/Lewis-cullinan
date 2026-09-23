export type DetailItem = {
  index: string;
  title: string;
  description: string;
  glyph: "grille" | "lamp" | "wheel" | "line" | "handle";
  image?: string;
  imageAlt?: string;
};

export const DETAIL_ITEMS: DetailItem[] = [
  {
    index: "01",
    title: "La Calandre",
    description:
      "Une grille verticale, ciselée en fines lames qui accrochent la lumière — la première chose que l'on remarque, la dernière que l'on oublie.",
    glyph: "grille",
  },
  {
    index: "02",
    title: "L'Éclairage",
    description:
      "Des bandeaux lumineux fins et bas, dessinant une signature reconnaissable à toute distance.",
    glyph: "lamp",
  },
  {
    index: "03",
    title: "La Stature",
    description:
      "Des jantes en acier brossé ancrent une silhouette qui ne semble jamais forcer.",
    glyph: "wheel",
    image: "/images/wheel-emblem-bw.jpg",
    imageAlt: "Emblème de jante Rolls-Royce en noir et blanc, reflet architectural",
  },
  {
    index: "04",
    title: "La Ligne de Caisse",
    description:
      "Une ombre file sur toute la longueur du corps — une simple ligne sombre qui rend quatre tonnes apparemment légères.",
    glyph: "line",
  },
  {
    index: "05",
    title: "Chaque Détail",
    description:
      "Poignées affleurantes, jeux de carrosserie millimétrés, finitions à la main — des détails pensés pour ceux qui savent les remarquer.",
    glyph: "handle",
  },
];
