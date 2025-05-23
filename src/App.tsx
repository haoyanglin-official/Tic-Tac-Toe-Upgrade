import { useState } from 'react'

import './App.css'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Button } from "antd";
//import { Card } from "antd";

const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));

type Player = "X" | "O" | null;
type Board = Player[][];

interface CheckWinner {
  (board: Board): Player;
}
/*
//create a queue to store the last 3 moves from player X and O
const queue: Player[] = [];

const addToQueue = (player: Player) => {
  if (queue.length === 3) {
    queue.shift();
  }
  queue.push(player);
}
const getLastMove = () => {
  if (queue.length === 0) {
    return null;
  }
  return queue[queue.length - 1];
}
const getLastMovePlayer = () => {
  if (queue.length === 0) {
    return null;
  }
  return queue[queue.length - 1];
}
const getLastMoveIndex = () => {
  if (queue.length === 0) {
    return null;
  }
  return queue.length - 1;
}
const getLastMovePlayerIndex = () => {
  if (queue.length === 0) {
    return null;
  }
  return queue.length - 1;
}
const getLastMovePlayerName = () => {
  if (queue.length === 0) {
    return null;
  }
  return queue[queue.length - 1];
}
const getLastMovePlayerNameIndex = () => {
  if (queue.length === 0) {
    return null;
  }
  return queue.length - 1;
}

}
*/
const checkWinner: CheckWinner = (board) => {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return board[i][0];
    if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return board[0][i];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[0][2];
  return null;
};

const Cell: React.FC<{ value: "X" | "O" | null;faded?: boolean }> = ({ value, faded = false }) => {
  const baseClass = faded ? "opacity-20" : "";
  if (value === "X") {
    return <span className={`text-red-600 text-6xl ${baseClass}`}>	&#10060;</span>;
  }
  if (value === "O") {
    return <span className={`text-blue-600 text-7xl ${baseClass}`}>&#11604;</span>;
  }
  return null;
};
/**	&#9711; */
/** return (
      <div className="relative w-10 h-10">
        {["top-0 left-1/2", "top-1/2 left-0", "bottom-0 left-1/2", "top-1/2 right-0"].map((pos, idx) => (
          <div
            key={idx}
            className={`absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${pos}`}
          />
        ))}
      </div>
    ); */
const GridLines: React.FC = () => {
  return (
    <svg viewBox="0 0 300 300" className="absolute top-0 left-0 w-full h-full">
      {/* Vertical lines */}
      <line x1="100" y1="0" x2="100" y2="300" stroke="white" strokeWidth="6" />
      <line x1="200" y1="0" x2="200" y2="300" stroke="white" strokeWidth="6" />
      {/* Horizontal lines */}
      <line x1="0" y1="100" x2="300" y2="100" stroke="white" strokeWidth="6" />
      <line x1="0" y1="200" x2="300" y2="200" stroke="white" strokeWidth="6" />
    </svg>
  );
};

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState("X");
  const [history, setHistory] = useState<Player[]>([]);
  const [movesX, setMovesX] = useState<[number, number][]>([]);
  const [movesO, setMovesO] = useState<[number, number][]>([]);

  interface HandleClick {
    (row: number, col: number): void;
  }

  const handleClick: HandleClick = (row, col) => {
    if (board[row][col] || checkWinner(board)) return;
    const newBoard: Board = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? player : cell))
    );
    const winner: Player = checkWinner(newBoard);
    if (winner) setHistory([...history, winner]);
    if (player === "X") {
      const updatedMoves = [...movesX.slice(-2), [row, col] as [number, number]];
      if (movesX.length >= 3) {
        const [oldRow, oldCol] = movesX[0];
        newBoard[oldRow][oldCol] = null;
      }
      setMovesX(updatedMoves as [number, number][]);
    } else {
      const updatedMoves = [...movesO.slice(-2), [row, col] as [number, number]];
      if (movesO.length >= 3) {
        const [oldRow, oldCol] = movesO[0];
        newBoard[oldRow][oldCol] = null;
      }
      setMovesO(updatedMoves as [number, number][]);
    }
    setBoard(newBoard);

    setPlayer(player === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setPlayer("X");
    //Reset moves
    setMovesX([]);
    setMovesO([]);
  };

  const getFaded = (row: number, col: number): boolean => {
    const posX = movesX.length === 3 ? movesX[0] : null;
    const posO = movesO.length === 3 ? movesO[0] : null;
    return ((posX && row === posX[0] && col === posX[1]) || (posO && row === posO[0] && col === posO[1])) ?? false;
  };

  return (
    
    
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4"style={{color: "white"}}>Tic Tac Toe Upgrade</h1>
      

      
      
      

            <Card className="grid grid-cols-3 gap-2 p-4"
            
            >
            
            {board.map((row, i) =>
            row.map((cell, j) => (
            <Button
              key={`${i}-${j}`}
              className="w-20 h-20 text-2xl"
              onClick={() => handleClick(i, j)}
              style={{ backgroundColor: "black", color: "white" }}
            >
              <Cell value={cell} faded={getFaded(i, j)} />
            </Button>
            ))
          )}
          </Card>

      <Button onClick={resetGame} className="mt-4"
      style={{ backgroundColor: "black", color: "white" }}>Reset</Button>
      <Card className="mt-6 w-full max-w-md">
        
          <h2 className="text-xl font-semibold mb-2">Scoreboard</h2>
          <ul>
            {history.map((winner, index) => (
              <li key={index}>Game {index + 1}: Winner - {winner}</li>
            ))}
          </ul>
        
      </Card>
    </div>
  );
}


export default App
