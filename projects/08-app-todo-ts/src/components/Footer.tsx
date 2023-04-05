import { TodoFilter } from "../types";
import { Filters } from "./Filters";

interface FooterProps {
  activeCount: number;
  completedCount: number;
  filterSelected: TodoFilter;
  onClearCompleted: () => void;
  onFilterChange: (filter: TodoFilter) => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount = 0,
  completedCount,
  filterSelected,
  onClearCompleted,
  onFilterChange,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> pending items
      </span>
      <Filters
        filterSelected={filterSelected}
        onFilterChange={onFilterChange}
      />
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
