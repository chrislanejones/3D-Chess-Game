import * as THREE from "three";
import React, { useMemo, useContext, createContext } from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Torus_Patch: THREE.Mesh;
    Torus_Patch_1: THREE.Mesh;
    Torus_Patch_2: THREE.Mesh;
    Torus_Patch_3: THREE.Mesh;
    Torus_Patch_4: THREE.Mesh;
    Torus_Patch_5: THREE.Mesh;
  };
  materials: {
    ["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]: THREE.MeshStandardMaterial;
  };
};

const context = createContext<any>(null);
export function Instances({ children, ...props }: React.PropsWithChildren<{}>) {
  const { nodes } = useGLTF("/models/Rook.glb") as GLTFResult;
  const instances = useMemo(
    () => ({
      Body: nodes.body,
      Cylinder: nodes.Cylinder,
      TorusPatch: nodes.Torus_Patch,
      TorusPatch1: nodes.Torus_Patch_1,
      TorusPatch2: nodes.Torus_Patch_2,
      TorusPatch3: nodes.Torus_Patch_3,
      TorusPatch4: nodes.Torus_Patch_4,
      TorusPatch5: nodes.Torus_Patch_5,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {(meshes: typeof instances) => (
        <context.Provider value={meshes} children={children} />
      )}
    </Merged>
  );
}

export function Rook(props: JSX.IntrinsicElements["group"]) {
  const instances = useContext(context);
  return (
    <group {...props} dispose={null}>
      <instances.Body>
        <instances.Cylinder position={[0, 0.035, 0]}>
          <instances.TorusPatch position={[0, 0.003, 0]} />
          <instances.TorusPatch1
            position={[0, 0.003, 0]}
            rotation={[0, -Math.PI / 3, 0]}
          />
          <instances.TorusPatch2
            position={[0, 0.003, 0]}
            rotation={[Math.PI, -Math.PI / 3, Math.PI]}
          />
          <instances.TorusPatch3
            position={[0, 0.003, 0]}
            rotation={[-Math.PI, 0, -Math.PI]}
          />
          <instances.TorusPatch4
            position={[0, 0.003, 0]}
            rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
          />
          <instances.TorusPatch5
            position={[0, 0.003, 0]}
            rotation={[0, Math.PI / 3, 0]}
          />
        </instances.Cylinder>
      </instances.Body>
    </group>
  );
}

useGLTF.preload("/models/Rook.glb");