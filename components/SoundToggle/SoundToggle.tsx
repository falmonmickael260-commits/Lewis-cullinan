"use client";

import { useState } from "react";

/**
 * Sound design is prepared but inert: no audio asset ships with this
 * concept build, so the toggle only flips visual state. Wire an <audio>
 * element to `enabled` once a licensed ambient track is available.
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={() => setEnabled((v) => !v)}
      aria-pressed={enabled}
      className="eyebrow flex items-center gap-2 self-start text-chrome/50 transition-colors hover:text-chrome"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors ${
          enabled ? "bg-chrome" : "bg-chrome/30"
        }`}
      />
      Son {enabled ? "Activé" : "Désactivé"}
    </button>
  );
}
