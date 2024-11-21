import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Carved: THREE.Mesh;
    Carved_1: THREE.Mesh;
    Carved_2: THREE.Mesh;
    body: THREE.Mesh;
    neck: THREE.Mesh;
    head: THREE.Mesh;
  };
  materials: {
    "AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000": THREE.Material;
  };
};

export function Pawn(props: GroupProps) {
  const { nodes, materials } = useGLTF("/models/Pawn.glb") as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const keys = useRef<{ [key: string]: boolean }>({});

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Carved.geometry}
          material={
            materials["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]
          }
          position={[0, -0.003, 0]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Carved_1.geometry}
            material={
              materials["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]
            }
            position={[0, -0.003, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Carved_2.geometry}
              material={
                materials["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]
              }
              position={[0, -0.003, 0]}
            />
          </mesh>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body.geometry}
          material={
            materials["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]
          }
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.neck.geometry}
            material={
              materials["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]
            }
            position={[0, 0.015, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.head.geometry}
              material={
                materials["AI Gen Texture - Sci-Fi White Orange_mat_0_0_2.000"]
              }
              position={[0, 0.002, 0]}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Pawn.glb");
