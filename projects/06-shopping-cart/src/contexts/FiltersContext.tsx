import { createContext, ReactNode, useState } from "react";

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersContext = createContext<any>({});

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
