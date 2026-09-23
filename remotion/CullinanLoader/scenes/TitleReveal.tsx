import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const TitleReveal: React.FC<{
  titleStart: number;
  subtitleStart: number;
  fadeOutStart: number;
}> = ({ titleStart, subtitleStart, fadeOutStart }) => {
  const frame = useCurrentFrame();

  const titleLocal = frame - titleStart;
  const titleOpacity = interpolate(titleLocal, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleBlur = interpolate(titleLocal, [0, 26], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleLocal, [0, 26], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleTracking = interpolate(titleLocal, [0, 40], [0.5, 0.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subLocal = frame - subtitleStart;
  const subOpacity = interpolate(subLocal, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subLocal, [0, 24], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const lineWidth = interpolate(subLocal, [0, 30], [0, 64], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const fadeLocal = frame - fadeOutStart;
  const exitOpacity = interpolate(fadeLocal, [0, 24], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
      }}
    >
      <h1
        style={{
          fontFamily: "'Bodoni Moda', 'Times New Roman', serif",
          fontWeight: 500,
          fontSize: "7.5vw",
          color: "#f6f5f2",
          margin: 0,
          opacity: titleOpacity,
          filter: `blur(${titleBlur}px)`,
          transform: `translateY(${titleY}px)`,
          letterSpacing: `${titleTracking}em`,
        }}
      >
        CULLINAN
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1.6vw",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        <div
          style={{
            width: lineWidth,
            height: 1,
            background: "rgba(246,245,242,0.5)",
            marginBottom: "1vw",
          }}
        />
        <p
          style={{
            fontFamily:
              "'Inter', -apple-system, 'Segoe UI', sans-serif",
            fontSize: "1vw",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(246,245,242,0.55)",
            margin: 0,
          }}
        >
          Expérience Noire
        </p>
      </div>
    </AbsoluteFill>
  );
};
