import { useState, useContext } from "react";
import { Product } from "../interfaces/products-response";
import { FiltersContext } from "../contexts/FiltersContext";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products: Product[]) => {
    return products.filter(
      (product) =>
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
    );
  };

  return { filterProducts, filters, setFilters };
}
