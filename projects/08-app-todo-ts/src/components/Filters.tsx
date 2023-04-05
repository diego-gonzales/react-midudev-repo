import { FILTER_BUTTONS, TODO_FILTERS } from "../consts";
import { TodoFilter } from "../types";

interface FiltersProps {
  filterSelected: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  filterSelected,
  onFilterChange,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, filter: TodoFilter) => {
    e.preventDefault();
    onFilterChange(filter);
  };

  return (
    <ul className="filters">
      {Object.entries(FILTER_BUTTONS).map(([key, { label, href }]) => (
        <li key={key}>
          <a
            className={filterSelected === key ? "selected" : ""}
            href={href}
            onClick={(e) => handleClick(e, key as TodoFilter)}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
};
