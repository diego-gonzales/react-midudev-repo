import { CreateToDo } from "./CreateToDo";

interface HeaderProps {
  onAddTodo: (todo: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  return (
    <header className="header">
      <h1>
        ToDo
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
          alt="Typescript logo"
          style={{ width: "60px", height: "auto" }}
        />
      </h1>
      <CreateToDo onAddTodo={onAddTodo} />
    </header>
  );
};
