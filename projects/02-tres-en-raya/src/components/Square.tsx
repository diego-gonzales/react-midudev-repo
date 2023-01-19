import { ReactNode } from "react";

interface SquareProps {
  children: ReactNode;
  index?: number;
  isSelected?: boolean;
  updateBoard?: (index: number) => void;
}

const Square = ({ children, index, isSelected, updateBoard }: SquareProps) => {
  const classes = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard!(index!);
  };

  return (
    <div className={classes} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Square;
