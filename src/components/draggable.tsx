import { useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { Pawn } from "./pawn";

interface DraggableProps {
  position: [number, number, number];
}

const DraggableObject = ({ position }: DraggableProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);

  return (
    <TransformControls mode="translate" showX showY={false} showZ>
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => setActive(!active)}
      >
        <Pawn scale={5} position={[0.41, 0.04, 0.08]} />
      </mesh>
    </TransformControls>
  );
};

export default DraggableObject;
