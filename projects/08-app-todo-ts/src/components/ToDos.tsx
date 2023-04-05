import { Todo, TodoId } from "../types";
import { ToDo } from "./ToDo";

interface TodosProps {
  todos: Todo[];
  onRemoveTodo: ({ id }: TodoId) => void;
  onComplete: ({ id }: TodoId, completed: boolean) => void;
}

export const ToDos: React.FC<TodosProps> = ({
  todos,
  onRemoveTodo,
  onComplete,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
          <ToDo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onComplete={onComplete}
          />
        </li>
      ))}
    </ul>
  );
};
