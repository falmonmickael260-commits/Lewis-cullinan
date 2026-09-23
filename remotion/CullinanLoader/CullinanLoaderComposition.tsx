import { AbsoluteFill } from "remotion";
import { FilmGrain } from "./scenes/FilmGrain";
import { LightReveal } from "./scenes/LightReveal";
import { CarSilhouette } from "./scenes/CarSilhouette";
import { TitleReveal } from "./scenes/TitleReveal";

export const LOADER_DURATION_IN_FRAMES = 200;
export const LOADER_FPS = 30;

const TIMING = {
  carStart: 24,
  carEnd: 118,
  titleStart: 100,
  subtitleStart: 132,
  fadeOutStart: 168,
};

export const CullinanLoaderComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <LightReveal startFrame={0} />
      <CarSilhouette startFrame={TIMING.carStart} endFrame={TIMING.carEnd} />
      <TitleReveal
        titleStart={TIMING.titleStart}
        subtitleStart={TIMING.subtitleStart}
        fadeOutStart={TIMING.fadeOutStart}
      />
      <FilmGrain intensity={0.045} />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 12vw 3vw rgba(0,0,0,0.85)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
