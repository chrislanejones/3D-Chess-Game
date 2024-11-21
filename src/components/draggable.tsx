import { useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { Pawn } from "./pawn";
import { useFrame } from "@react-three/fiber";

interface DraggableProps {
  position: [number, number, number];
}

const DraggableObject = ({ position }: DraggableProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const transformControlsRef = useRef<any>(null);

  // Optional: Add frame-based logic if needed
  useFrame(() => {
    // You can add any per-frame logic here
  });

  const handleClick = () => {
    setActive(!active);
    // Optionally activate transform controls when clicked
    if (transformControlsRef.current) {
      transformControlsRef.current.attach(meshRef.current);
    }
  };

  return (
    <>
      <TransformControls
        ref={transformControlsRef}
        mode="translate"
        showX
        showY={false}
        showZ
      >
        <mesh ref={meshRef} position={position} onClick={handleClick}>
          <Pawn scale={5} />
        </mesh>
      </TransformControls>
    </>
  );
};

export default DraggableObject;
