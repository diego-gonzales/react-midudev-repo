import { createContext, ReactNode, useState } from "react";

interface FiltersProviderProps {
  children: ReactNode;
}

interface ProviderProps {
  filters: {
    category: string;
    minPrice: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      minPrice: number;
    }>
  >;
}

export const FiltersContext = createContext<ProviderProps | undefined>(
  undefined
);

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
