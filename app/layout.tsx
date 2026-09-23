import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cullinan-black-experience.vercel.app"),
  title: "Rolls-Royce Cullinan — Expérience Noire",
  description:
    "Une expérience digitale immersive et cinématique inspirée de la Rolls-Royce Cullinan Black Badge. La présence, façonnée dans l'obsidienne.",
  openGraph: {
    title: "Rolls-Royce Cullinan — Expérience Noire",
    description:
      "Une expérience digitale immersive et cinématique inspirée de la Rolls-Royce Cullinan Black Badge.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${bodoni.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-chrome">
        {children}
      </body>
    </html>
  );
}
