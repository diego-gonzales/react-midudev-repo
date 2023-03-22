import "./Filters.css";
import { useId } from "react";
import { useFilters } from "../../hooks/useFilters";

const Filters = () => {
  const minPriceFilterID = useId();
  const categoryFilterID = useId();
  const { filters, setFilters } = useFilters();

  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState: any) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevState: any) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterID}>Min. Price</label>
        <input
          type="range"
          id={minPriceFilterID}
          min="0"
          max="1000"
          onChange={handleChangeRange}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterID}>Category</label>
        <select id={categoryFilterID} onChange={handleChangeSelect}>
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Smartphones</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
