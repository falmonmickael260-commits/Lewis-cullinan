"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NAV_LINKS } from "@/data/navigation";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const links = linksRef.current.filter(Boolean);

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(containerRef.current, { display: "flex" });
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        links,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.06,
          delay: 0.15,
          ease: "expo.out",
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-90 hidden flex-col bg-carbon"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <span className="font-display text-lg tracking-wide">CULLINAN</span>
        <button
          type="button"
          onClick={onClose}
          className="eyebrow cursor-pointer"
          aria-label="Fermer le menu"
        >
          Fermer
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-start justify-center gap-4 px-6 md:px-10">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => {
              linksRef.current[i] = el;
            }}
            href={link.href}
            onClick={onClose}
            className="font-display text-4xl text-chrome/90 transition-colors hover:text-chrome sm:text-6xl"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="hairline mx-6 md:mx-10" />
      <div className="flex items-center justify-between px-6 py-6 text-chrome/45 md:px-10 md:py-8">
        <span className="eyebrow">Rolls-Royce Cullinan</span>
        <span className="eyebrow">Expérience Noire</span>
      </div>
    </div>
  );
}
