import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import {
  CULLINAN_SILHOUETTE_PATH,
  CULLINAN_SILHOUETTE_WHEELS,
} from "../../../lib/cullinanSilhouette";

const BODY_PATH = CULLINAN_SILHOUETTE_PATH;

export const CarSilhouette: React.FC<{
  startFrame: number;
  endFrame: number;
}> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const revealDuration = endFrame - startFrame;

  const draw = interpolate(local, [0, revealDuration * 0.8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const strokeOpacity = interpolate(
    local,
    [0, 20, revealDuration * 0.75, revealDuration],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fillOpacity = interpolate(
    local,
    [revealDuration * 0.35, revealDuration * 0.8, revealDuration],
    [0, 0.9, 0.55],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rimOpacity = interpolate(
    local,
    [revealDuration * 0.3, revealDuration * 0.6, revealDuration],
    [0, 0.5, 0.28],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 760 260"
        width="46vw"
        style={{ overflow: "visible" }}
      >
        <path
          d={BODY_PATH}
          fill="rgba(8,8,9,1)"
          fillOpacity={fillOpacity}
          stroke="rgba(255,255,255,1)"
          strokeOpacity={strokeOpacity}
          strokeWidth={1.4}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={draw}
        />
        <path
          d={BODY_PATH}
          fill="none"
          stroke="rgba(235,238,245,1)"
          strokeOpacity={rimOpacity}
          strokeWidth={0.8}
        />
        {CULLINAN_SILHOUETTE_WHEELS.map((cx) => (
          <circle
            key={cx}
            cx={cx}
            cy={218}
            r={44}
            fill="rgba(4,4,4,1)"
            fillOpacity={fillOpacity}
            stroke="rgba(200,203,208,1)"
            strokeOpacity={rimOpacity * 0.7}
            strokeWidth={1}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
