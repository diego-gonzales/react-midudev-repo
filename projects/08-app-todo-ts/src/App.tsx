import { useState } from "react";
import { ToDos } from "./components/ToDos";
import { TodoFilter, TodoId } from "./types";
import { Footer } from "./components/Footer";
import { TODO_FILTERS } from "./consts";
import { Header } from "./components/Header";

const mockData = [
  {
    id: "1",
    title: "Todo 1",
    completed: true,
  },
  {
    id: "2",
    title: "Todo 2",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    completed: false,
  },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockData);
  const [filterSelected, setFilterSelected] = useState<TodoFilter>(
    TODO_FILTERS.ALL
  );

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleComplete = ({ id }: TodoId, completed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: TodoFilter) => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = (todo: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: todo,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <ToDos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onComplete={handleComplete}
      />
      <Footer
        filterSelected={filterSelected}
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleClearCompleted}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
