import { GroupProps } from "@react-three/fiber";

interface ChessboardProps extends GroupProps {
  tileSize?: number;
}

export function Chessboard({ tileSize = 1, ...props }: ChessboardProps) {
  const boardSize = 8; // 8x8 chess board

  return (
    <group {...props}>
      {Array.from({ length: boardSize }, (_, row) =>
        Array.from({ length: boardSize }, (_, col) => {
          const isWhite = (row + col) % 2 === 0;

          return (
            <mesh
              key={`${row}-${col}`}
              position={[
                col * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
                0,
                row * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
              ]}
            >
              <boxGeometry args={[tileSize, 0.1, tileSize]} />
              <meshStandardMaterial color={isWhite ? "#ffffff" : "#000000"} />
            </mesh>
          );
        })
      )}
    </group>
  );
}
