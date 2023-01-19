import { WINNER_COMBOS } from "./constants";

export const checkWinner = (boardToCheck: string[]) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck: string[]): boolean => {
  return boardToCheck.every((square) => square !== null);
};