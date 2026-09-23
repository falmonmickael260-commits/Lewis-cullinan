import { Composition } from "remotion";
import {
  CullinanLoaderComposition,
  LOADER_DURATION_IN_FRAMES,
  LOADER_FPS,
} from "./CullinanLoader/CullinanLoaderComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CullinanLoader"
        component={CullinanLoaderComposition}
        durationInFrames={LOADER_DURATION_IN_FRAMES}
        fps={LOADER_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
