import type { DetailItem } from "@/data/details";

export function DetailGlyph({ type }: { type: DetailItem["glyph"] }) {
  const stroke = "rgba(246,245,242,0.85)";

  if (type === "grille") {
    return (
      <svg viewBox="0 0 120 120" className="h-16 w-16 md:h-20 md:w-20">
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={14 + i * 14}
            y={20}
            width={5}
            height={80}
            rx={2}
            fill={stroke}
            opacity={0.85}
          />
        ))}
      </svg>
    );
  }

  if (type === "lamp") {
    return (
      <svg viewBox="0 0 120 120" className="h-16 w-16 md:h-20 md:w-20">
        <rect x={10} y={54} width={100} height={10} rx={5} fill={stroke} />
        <rect
          x={10}
          y={54}
          width={100}
          height={10}
          rx={5}
          fill="url(#lampGlow)"
        />
        <defs>
          <linearGradient id="lampGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (type === "wheel") {
    return (
      <svg viewBox="0 0 120 120" className="h-16 w-16 md:h-20 md:w-20">
        <circle
          cx={60}
          cy={60}
          r={44}
          stroke={stroke}
          strokeWidth={2}
          fill="none"
          opacity={0.85}
        />
        <circle cx={60} cy={60} r={6} fill={stroke} />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 60 + Math.cos(angle) * 38;
          const y = 60 + Math.sin(angle) * 38;
          return (
            <line
              key={i}
              x1={60}
              y1={60}
              x2={x}
              y2={y}
              stroke={stroke}
              strokeWidth={1.5}
              opacity={0.6}
            />
          );
        })}
      </svg>
    );
  }

  if (type === "line") {
    return (
      <svg viewBox="0 0 120 120" className="h-16 w-16 md:h-20 md:w-20">
        <line
          x1={10}
          y1={60}
          x2={110}
          y2={60}
          stroke={stroke}
          strokeWidth={2}
          opacity={0.85}
        />
        <line
          x1={10}
          y1={54}
          x2={110}
          y2={54}
          stroke={stroke}
          strokeWidth={0.75}
          opacity={0.35}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="h-16 w-16 md:h-20 md:w-20">
      <rect
        x={20}
        y={20}
        width={80}
        height={80}
        rx={6}
        stroke={stroke}
        strokeWidth={1.5}
        fill="none"
        opacity={0.5}
      />
      <rect x={48} y={52} width={24} height={6} rx={3} fill={stroke} />
    </svg>
  );
}
