import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils, Vector2 } from "three";
import { FBM } from "three-noise";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

const vec = new Vector2();
export function Butterfly(props) {
  const group = useRef();
  const { scene, animations } = useGLTF(
    "/demo-2022-grass/models/butterfly.glb"
  );
  const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);
  const fbm = useMemo(() => new FBM({ seed: Math.random() }), []);
  const offset = useMemo(() => Math.random() * 100, []);

  useEffect(() => {
    for (const key in actions) {
      actions[key].setEffectiveTimeScale(6);
      setTimeout(() => {
        actions[key].play();
      }, Math.random() * 1000);
    }
    group.current.rotation.y = offset;
  }, []);

  useFrame(({ clock }, dt) => {
    vec.set(clock.elapsedTime, clock.elapsedTime);
    group.current.position.set(0, fbm.get2(vec), 0);
    group.current.rotation.y -= dt;
  });

  return (
    <group ref={group} dispose={null}>
      <group {...props}>
        <group
          scale={0.15}
          rotation-y={Math.PI / 4}
          position-y={MathUtils.randFloat(-3, 1)}
        >
          <primitive object={cloneScene} />
        </group>
      </group>
    </group>
  );
}
