import {
  CameraShake,
  Cloud,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import { Suspense } from "react";
import { MathUtils } from "three";
import { Butterfly } from "./Butterfly";
import { Grass } from "./Grass";
import { Particles } from "./Particles";
import Tag from "./Tag";

const rand = new Array(15).fill(0).map(() => ({
  position: [
    MathUtils.randFloat(0.5, 0.7),
    MathUtils.randFloat(0.5, 0.7),
    MathUtils.randFloat(0.5, 0.7),
  ],
  scale: MathUtils.randFloat(0.5, 1),
}));

function Capture() {
  const gl = useThree((state) => state.gl);
  useControls({
    screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
  });

  return null;
}

const App = () => {
  return (
    <>
      <Canvas
        dpr={1.5}
        camera={{ position: [1, -1.25, 1] }} //
      >
        <Environment preset="sunset" />

        <Suspense fallback={null}>
          <Grass />
          {rand.map((e, i) => (
            <Butterfly key={i} {...e} />
          ))}

          <Clouds />
          <Sky />
        </Suspense>
        <Particles />
        {/* <Capture /> */}

        <OrbitControls
          enableZoom={false}
          makeDefault
          autoRotate
          autoRotateSpeed={0.8}
        />
        {/* <OrbitControls makeDefault /> */}
        <CameraShake maxRoll={0.2} maxPitch={0.2} maxYaw={0.2} />
      </Canvas>
      <Tag />
    </>
  );
};

export default App;

function Clouds() {
  return (
    <group>
      <Cloud position={[-10, -6, -10]} speed={0.2} opacity={0.4} />
      <Cloud position={[10, 6, -15]} speed={0.2} opacity={0.25} />
      <Cloud position={[0, 10, 0]} speed={0.2} opacity={0.2} />
      <Cloud position={[0, -10, 0]} speed={0.2} opacity={0.2} />
      <Cloud position={[-10, -6, 15]} speed={0.2} opacity={0.3} />
      <Cloud position={[10, 6, 10]} speed={0.2} opacity={0.25} />
    </group>
  );
}
