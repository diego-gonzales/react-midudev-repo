import { Todo, TodoId } from "../types";

interface TodoProps extends Todo {
  onRemoveTodo: ({ id }: TodoId) => void;
  onComplete: ({ id }: TodoId, completed: boolean) => void;
}

export const ToDo: React.FC<TodoProps> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onComplete,
}) => {
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onComplete({id}, e.target.checked);
  };

  return (
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={completed}
        onChange={handleChangeCheckbox}
      />
      <label>{title}</label>
      <button className="destroy" onClick={() => onRemoveTodo({id})} />
    </div>
  );
};

