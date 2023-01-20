interface Game {
  board: string[];
  turn: string;
}

export const saveGameInStorage = ({ board, turn }: Game) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const clearGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
