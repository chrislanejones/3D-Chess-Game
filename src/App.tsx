import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { Instances, Rook } from "./components/rook";
import { Chessboard } from "./components/chessboard";

import DraggableObject from "./components/draggable";

const App: FC = () => {
  return (
    <>
      <Canvas
        style={{ background: "#6a6a6a" }}
        camera={{ position: [5, 5, 5], fov: 30 }}
      >
        <OrbitControls />
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} />
        <DraggableObject position={[0, 0, 0]} />

        <Instances>
          <Rook scale={25} position={[3.5, 0.04, 3.5]} />
        </Instances>
        <Chessboard />
      </Canvas>
    </>
  );
};

export default App;
