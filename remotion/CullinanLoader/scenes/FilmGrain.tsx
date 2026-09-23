import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const FilmGrain: React.FC<{ intensity?: number }> = ({
  intensity = 0.05,
}) => {
  const frame = useCurrentFrame();
  const offsetX = Math.sin(frame * 3.1) * 40;
  const offsetY = Math.cos(frame * 2.3) * 40;

  const flicker = interpolate(
    Math.sin(frame * 8),
    [-1, 1],
    [intensity * 0.7, intensity * 1.3]
  );

  return (
    <AbsoluteFill
      style={{
        opacity: flicker,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(1.5)`,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </AbsoluteFill>
  );
};
