import { useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import { Pawn } from "./pawn";

interface DraggableProps {
  position: [number, number, number];
}

const DraggableObject = ({ position }: DraggableProps) => {
  const pawnRef = useRef<THREE.Group>(null);
  const transformControlsRef = useRef<any>(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);

    if (transformControlsRef.current && pawnRef.current) {
      if (isSelected) {
        transformControlsRef.current.detach();
      } else {
        transformControlsRef.current.attach(pawnRef.current);
      }
    }
  };

  return (
    <group position={position}>
      <Pawn ref={pawnRef} scale={5} onClick={handleClick} />
      <TransformControls
        ref={transformControlsRef}
        mode="translate"
        position={[-2.6, -0.5, -2.5]} // Positioned slightly above the pawn
        showX
        showY={false}
        showZ
      />
    </group>
  );
};

export default DraggableObject;
