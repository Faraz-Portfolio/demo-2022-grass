import {
  CameraShake,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MathUtils } from "three";
import { Butterfly } from "./Butterfly";
import { Grass } from "./Grass";
import { Particles } from "./Particles";

const rand = new Array(15).fill(0).map(() => ({
  position: [
    MathUtils.randFloat(0.5, 0.7),
    MathUtils.randFloat(0.5, 0.7),
    MathUtils.randFloat(0.5, 0.7),
  ],
  scale: MathUtils.randFloat(0.5, 1),
}));

const App = () => {
  return (
    <>
      <Canvas
        dpr={1.5}
        camera={{ position: [1, -1.25, 1] }} //
      >
        <Environment preset="sunset" />

        <Grass />

        {rand.map((e, i) => (
          <Butterfly key={i} {...e} />
        ))}

        <Sky />
        <Particles />

        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.8} />
        <CameraShake maxRoll={0.2} maxPitch={0.2} maxYaw={0.2} />
      </Canvas>
    </>
  );
};

export default App;
