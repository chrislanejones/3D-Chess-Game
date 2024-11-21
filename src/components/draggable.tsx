import React, { useRef, useState } from "react";
import { Canvas, useThree, useFrame, ThreeEvent } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { a, animated } from "@react-spring/three";
import * as THREE from "three";

type AnimatedMeshProps = AnimatedProps<MeshProps> & {
  onClick: (event: ThreeEvent<MouseEvent>) => void;
};

declare module "@react-spring/three" {
  export interface AnimatedMeshProps extends MeshProps {
    // You can add here any additional props you want to use
  }
}

// Draggable Three Fiber Component
const DraggableCube: React.FC<{
  position: [number, number, number];
  color: string;
}> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  const aspect = size.width / viewport.width;

  const bind = useDrag(({ offset: [x, y], first, last }) => {
    if (first) {
      setIsDragging(true);
    }

    if (last) {
      setIsDragging(false);
    }

    // Calculate drag offset considering aspect ratio and viewport
    // Divide by aspect to normalize movement across different screen sizes
    setDragOffset([
      x / (aspect * 50), // X-axis movement
      -y / (aspect * 50), // Y-axis movement (inverted)
      0, // Z-axis remains fixed
    ]);
  });

  useFrame(() => {
    if (meshRef.current) {
      // Update position based on initial position and drag offset
      meshRef.current.position.x = position[0] + dragOffset[0];
      meshRef.current.position.y = position[1] + dragOffset[1];
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      {...bind()}
      position={position}
      scale={isDragging ? 1.1 : 1}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        // Optional: Add any click handling logic here
        event.stopPropagation();
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={isDragging ? "white" : color}
        opacity={isDragging ? 0.8 : 1}
        transparent
      />
    </animated.mesh>
  );
};

// Main Scene Component with Grid and Multiple Draggable Objects
const DraggableScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Background Grid Helper */}
      <gridHelper args={[10, 10, "blue", "gray"]} position={[0, -2, 0]} />

      {/* Multiple draggable cubes with different positions */}
      <DraggableCube position={[-3, 2, 0]} color="hotpink" />
      <DraggableCube position={[0, 0, 0]} color="orange" />
      <DraggableCube position={[3, -2, 0]} color="lightblue" />
    </Canvas>
  );
};

export default DraggableScene;
