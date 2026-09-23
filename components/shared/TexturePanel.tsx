import Image from "next/image";

export function TexturePanel({
  gradient,
  image,
  imageAlt = "",
  className,
  children,
}: {
  gradient: string;
  image?: string;
  imageAlt?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: image ? "#050505" : gradient }}
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ filter: "brightness(1.15) contrast(1.05) saturate(0.92)" }}
        />
      )}
      {image && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_55%,rgba(0,0,0,0.4)_100%)]" />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      {!image && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)]" />
      )}
      {children}
    </div>
  );
}
