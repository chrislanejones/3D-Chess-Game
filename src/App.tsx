import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Pawn } from "./components/pawn";

function App() {
  return (
    <>
      <Canvas
        style={{ background: "#6a6a6a" }}
        camera={{ position: [5, 5, 5], fov: 1 }}
      >
        <OrbitControls />
        <ambientLight intensity={10} />
        <pointLight position={[-60, 10, 10]} intensity={0.2} />
        <pointLight position={[-15, 10, 10]} intensity={0.3} />
        <pointLight position={[50, 10, 10]} intensity={0.3} />
        <Pawn />
      </Canvas>
    </>
  );
}

export default App;
