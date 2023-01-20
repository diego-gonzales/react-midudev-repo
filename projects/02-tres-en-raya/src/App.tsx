import "./App.css";
import { useState } from "react";
import Square from "./components/Square";
import WinnerModal from "./components/WinnerModal";
import { TURNS } from "./utils/constants";
import confetti from 'canvas-confetti';
import { checkEndGame, checkWinner } from "./utils/checkBoard";
import { clearGameStorage, saveGameInStorage } from "./utils/storage";

function App() {
  // Si colocamos aquí la lectura del localStorage se ejecutará cada vez que haya un render, lo cual no es óptimo, por eso se lo hace dentro del state
  // const boardFromStorage = window.localStorage.getItem('board');

  const [board, setBoard] = useState<string[]>(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState<string>(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState<any>(null); // null = there is not winner, false = tie, 'valor' = winner

  const updateBoard = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameInStorage({
      board: newBoard,
      turn: newTurn
    });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    clearGameStorage();
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {board.map((square, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
