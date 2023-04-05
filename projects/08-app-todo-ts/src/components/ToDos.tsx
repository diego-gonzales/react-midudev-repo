import { Todo } from "../types";
import { ToDo } from "./ToDo";

interface TodosProps {
  todos: Todo[];
  onRemoveTodo: (id: number) => void;
  onComplete: (id: number, completed: boolean) => void;
}

export const ToDos: React.FC<TodosProps> = ({ todos, onRemoveTodo, onComplete }) => {
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
