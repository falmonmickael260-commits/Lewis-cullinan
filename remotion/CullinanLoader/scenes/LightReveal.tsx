import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const LightReveal: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const glowSize = interpolate(local, [0, 130], [8, 62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowOpacity = interpolate(local, [0, 40, 130], [0, 0.22, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sweepX = interpolate(local, [10, 95], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const sweepOpacity = interpolate(
    local,
    [10, 35, 60, 95],
    [0, 0.16, 0.16, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 58%, rgba(255,255,255,${glowOpacity}) 0%, rgba(255,255,255,0) ${glowSize}%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(115deg, transparent 0%, rgba(255,255,255,${sweepOpacity}) 50%, transparent 100%)`,
          transform: `translateX(${sweepX}%)`,
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 18vw 4vw rgba(0,0,0,0.9)",
        }}
      />
    </AbsoluteFill>
  );
};
