import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useRef, useEffect } from "react";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const moveSpeed = 0.05;

    if (keys.current["w"]) groupRef.current.position.z -= moveSpeed;
    if (keys.current["s"]) groupRef.current.position.z += moveSpeed;
    if (keys.current["a"]) groupRef.current.position.x -= moveSpeed;
    if (keys.current["d"]) groupRef.current.position.x += moveSpeed;
  });

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
