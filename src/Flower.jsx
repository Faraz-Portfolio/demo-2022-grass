import { useGLTF, useTexture } from "@react-three/drei";
import { forwardRef } from "react";

export const Flower = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/demo-2022-grass/models/flower.glb");
  const map = useTexture("/demo-2022-grass/textures/color.jpg");
  const ao = useTexture("/demo-2022-grass/textures/ao.jpg");

  return (
    <group>
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, 1000]}
        castShadow
        receiveShadow
        geometry={nodes._ndyj_Var10_LOD0.geometry}
        {...props}
      >
        <meshBasicMaterial map={map} aoMap={ao} />
      </instancedMesh>
    </group>
  );
});
