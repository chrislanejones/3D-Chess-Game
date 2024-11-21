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
        camera={{ position: [7, 5, 0], fov: 60 }}
      >
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} />
        <DraggableObject position={[2.6, 0.3, 2.5]} />

        <Instances>
          <Rook scale={25} position={[3.5, 0.04, 3.5]} />
        </Instances>
        <Chessboard />
      </Canvas>
    </>
  );
};

export default App;
