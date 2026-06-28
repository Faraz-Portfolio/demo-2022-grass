import { useGLTF, useTexture } from "@react-three/drei";
import { forwardRef } from "react";

const baseUrl = import.meta.env.BASE_URL;

export const Flower = forwardRef((props, ref) => {
  const { nodes } = useGLTF(baseUrl + "models/flower.glb");
  const map = useTexture(baseUrl + "textures/color.jpg");
  const ao = useTexture(baseUrl + "textures/ao.jpg");

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
