import { Todo } from "../types";

interface TodoProps extends Todo {
  onRemoveTodo: (id: number) => void;
  onComplete: (id: number, completed: boolean) => void;
}

export const ToDo: React.FC<TodoProps> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onComplete,
}) => {
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onComplete(id, e.target.checked);
  };

  return (
    <div className="view">
      <input
        id="todo"
        type="checkbox"
        className="toggle"
        checked={completed}
        onChange={handleChangeCheckbox}
      />
      <label htmlFor="todo">{title}</label>
      <button className="destroy" onClick={() => onRemoveTodo(id)} />
    </div>
  );
};
