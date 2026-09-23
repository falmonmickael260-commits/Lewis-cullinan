import { NAV_LINKS } from "@/data/navigation";
import { SoundToggle } from "@/components/SoundToggle/SoundToggle";

export function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--line)] bg-void">
      <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-display text-xl text-chrome">
              CULLINAN
            </span>
            <p className="mt-1 text-xs italic text-chrome/35">par Nexoo</p>
            <p className="mt-3 max-w-xs text-sm text-chrome/40">
              Une expérience conceptuelle non officielle explorant le
              langage de design de la Rolls-Royce Cullinan. Non affiliée
              à, approuvée par, ni produite par Rolls-Royce Motor Cars.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="eyebrow text-chrome/50 transition-colors hover:text-chrome"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <SoundToggle />
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-3 text-chrome/30 sm:flex-row sm:items-center sm:justify-between">
          <span className="eyebrow">
            Expérience Noire — Étude Digitale Conceptuelle
          </span>
          <span className="eyebrow">
            Rolls-Royce est une marque déposée de son propriétaire
          </span>
        </div>

        <p className="mt-6 text-xs text-chrome/25">
          Photographies et vidéo libres de droits via{" "}
          <a
            href="https://www.pexels.com"
            className="underline decoration-chrome/20 underline-offset-2 hover:text-chrome/50"
          >
            Pexels
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
