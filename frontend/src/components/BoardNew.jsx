
import { useState, useEffect } from 'react';

export default function BoardNew({ onWin, onLose }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // true = player turn, false = AI turn

  const calculateWinner = () => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a,b,c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (squares[i] || calculateWinner() || !isXNext) return;

    const newSquares = [...squares];
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsXNext(false); // Now it's AI's turn
  };

  // AI MOVE - RUNS IMMEDIATELY WHEN isXNext BECOMES FALSE
  useEffect(() => {
    if (!isXNext && !calculateWinner()) {
      const timer = setTimeout(() => {
        const emptyIndices = squares
          .map((val, idx) => val === null ? idx : null)
          .filter(idx => idx !== null);

        if (emptyIndices.length > 0) {
          const aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newSquares = [...squares];
          newSquares[aiChoice] = 'O';
          setSquares(newSquares);
          setIsXNext(true); // Back to player
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isXNext, squares]); // This triggers correctly every time

  // Check winner after every move
  useEffect(() => {
    const winner = calculateWinner();
    if (winner === 'X') {
      setTimeout(() => {
        onWin();
        setSquares(Array(9).fill(null));
        setIsXNext(true);
      }, 1000);
    } else if (winner === 'O') {
      setTimeout(() => {
        onLose();
        setSquares(Array(9).fill(null));
        setIsXNext(true);
      }, 1000);
    }
  }, [squares, onWin, onLose]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-3 gap-10">
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-52 h-52 bg-gradient-to-br from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-9xl font-bold text-white rounded-3xl shadow-2xl border-12 border-purple-500 transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
            disabled={!isXNext || calculateWinner()}
          >
            {value}
          </button>
        ))}
      </div>

      {calculateWinner() && (
        <div className={`mt-16 text-9xl font-bold animate-pulse ${calculateWinner() === 'X' ? 'text-green-400' : 'text-red-500'}`}>
          {calculateWinner() === 'X' ? 'YOU WIN!' : 'AI WINS!'}
        </div>
      )}
    </div>
  );
}