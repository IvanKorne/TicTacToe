import { useState, useEffect } from "react";

const TicTacToe = () => {
  const defaultBoard = new Array(9).fill(""); // Default Starting 3x3 Board
  const [message, setMessage] = useState("Play Now!");
  const [isWin, setIsWin] = useState(false);
  const [isO, setIsO] = useState(false);
  const [board, setBoard] = useState<string[]>(defaultBoard);

  const handleClick = (index: number) => {
    if (isWin) {
      return;
    }
    const newBoard = [...board];
    if (newBoard[index] === "") {
      // Can't place on a non-empty square.
      newBoard[index] = isO ? "O" : "X";
      setBoard(newBoard);
      setIsO((prev) => !prev);
      setMessage(`Player ${!isO ? "O" : "X"}'s Turn`); // Since it switches players after placing down a Circle/X.
    }
  };

  const checkDraw = () => {
    return board.every((element) => element !== "") && !isWin; // Only a draw if every square is filled and there is no win.
  };

  const checkRows = () => {
    for (let i = 0; i < 9; i += 3) {
      if (board[i] && board[i] == board[i + 1] && board[i] == board[i + 2]) {
        return true;
      }
    }
    return false;
  };

  const checkCols = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i] && board[i] == board[i + 3] && board[i] == board[i + 6]) {
        return true;
      }
    }
    return false;
  };

  const checkDiagonals = () => {
    if (board[4]) {
      if (board[0] == board[4] && board[0] == board[8]) {
        return true;
      }
      if (board[2] == board[4] && board[2] == board[6]) {
        return true;
      }
    }

    return false;
  };

  const checkWin = () => {
    return checkRows() || checkCols() || checkDiagonals();
  };

  const restartGame = () => {
    setBoard(defaultBoard);
    setIsO(false);
    setMessage("");
    setIsWin(false);
  };

  useEffect(() => {
    if (checkDraw()) {
      setMessage("Draw!");
    }
    if (checkWin()) {
      setIsWin(true);
      if (isO) {
        setMessage("Player X Wins!"); //Since it switches players after placing down a Circle/X
      } else {
        setMessage("Player O Wins!");
      }
    }
  }, [board]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-10 mx-auto text-white bg-gray-900">
      <h1 className="pt-10 text-5xl font-bold md-text-3xl">TicTacToe</h1>
      <div className="grid grid-cols-3 p-12">
        {board.map((element, index) => (
          <div
            key={`${element}_${index}`}
            className="flex items-center justify-center p-4 text-white border border-white cursor-pointer size-20"
            onClick={() => handleClick(index)}
          >
            <h1 className="text-xl mp">{element}</h1>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-5">
        <p className="text-3xl font-semibold md-text-xl">{message}</p>

        <button
          onClick={restartGame}
          className="px-3 py-1 text-lg bg-gradient-to-r from-orange-300 to-orange-500 rounded-xl"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
