"use client";
import { Input } from "@/components/ui/input";

import { FormEvent } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBookContext } from "@/context/BookContext";

const SearchBar = () => {
  const { search, updateSearch } = useBookContext();
  const router = useRouter();
  // const [query, setQuery] = useState(search || "");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex items-center gap-2 w-full  mx-auto bg-dark-800 rounded-xl">
      <form className="relative w-full" onSubmit={handleSearch}>
        <Search
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary"
          size={30}
        />
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          className="md:text-xl pl-16 pr-8 py-10 text-light-100 font-semibold w-full rounded-xl border-none "
        />
      </form>
    </div>
  );
};

export default SearchBar;
