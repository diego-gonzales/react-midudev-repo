import Square from "./Square";

interface WinnerModalProps {
  winner: any;
  resetGame: () => void;
}

const WinnerModal = ({ winner, resetGame }: WinnerModalProps) => {
  if (winner === null) return null;

  const winnerText = winner ? "Winner" : "Tie";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
  
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>
  
        <footer>
          <button onClick={resetGame}>Play again</button>
        </footer>
      </div>
    </section>
  );
};

export default WinnerModal;
