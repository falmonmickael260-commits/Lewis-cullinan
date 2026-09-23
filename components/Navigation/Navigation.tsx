"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/navigation";
import { Magnetic } from "@/components/shared/Magnetic";
import { MobileMenu } from "./MobileMenu";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 transition-all duration-500 ${
          scrolled
            ? "border-b border-[color:var(--line)] bg-carbon/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <a
            href="#hero"
            className="font-display text-lg tracking-[0.06em] text-chrome"
          >
            CULLINAN
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="eyebrow text-chrome/60 transition-colors duration-300 hover:text-chrome"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic>
              <a
                href="#gallery"
                data-cursor="hover"
                className="eyebrow rounded-full border border-[color:var(--line-strong)] px-5 py-2.5 text-chrome transition-colors duration-300 hover:bg-chrome hover:text-void"
              >
                Découvrir
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="eyebrow cursor-pointer lg:hidden"
            aria-label="Ouvrir le menu"
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
