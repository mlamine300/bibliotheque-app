"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

import { useSearchParams } from "next/navigation";
const perPage = 15;
function updateSearch() {}
const initialValues = {
  perPage: 15,
  search: "",
  updateSearch,
};
interface contextType {
  perPage: number;
  search: string;
  updateSearch: (s: string) => void;
}
const bookContext = createContext<contextType>(initialValues);

const BookContext = ({ children }: { children: ReactNode }) => {
  const params = useSearchParams();

  const [search, setSearch] = useState<string>(params.get("search") as string);
  const updateSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <bookContext.Provider
      value={{
        updateSearch,
        perPage,
        search,
      }}
    >
      {children}
    </bookContext.Provider>
  );
};
export const useBookContext = () => {
  const context = useContext(bookContext);
  if (!context) throw new Error("Context used out the provider");
  return context;
};

export default BookContext;
