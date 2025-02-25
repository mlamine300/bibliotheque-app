"use client";
import React from "react";
import { book } from "..";
import BookList from "./BookList";
import { HiChevronDown } from "react-icons/hi2";
import PaginationComponent from "./PaginationComponent";
import { useBookContext } from "@/context/BookContext";
import BookCard from "./BookCard";
const SearchResult = ({ books, count }: { books: book[]; count: number }) => {
  const { perPage } = useBookContext();
  console.log(
    `count = ${count} vs ${books.length} ==> pages = count / 15 : ${Math.ceil(
      count / perPage
    )}`
  );
  return (
    <div className="flex flex-col items-center my-8 w-full">
      <div className="flex w-full text-light-100 font-semibold font-ibm-plex-sans">
        <h3 className="text-3xl ">{`Search Results`}</h3>
        <div className="ml-auto flex items-center bg-dark-800 py-4 px-6 text-light-300 rounded-md">
          <h4 className="ml-auto ">
            Filter by<span className="mx-2 text-primary">Departement</span>{" "}
          </h4>
          <HiChevronDown className="" />
        </div>
      </div>
      <BookList
        rander={(book) => <BookCard className="" key={book.id} {...book} />}
        className="mb-8"
        title=""
        bookList={books}
      />
      <div className="mt-auto  border-t-[1px] border-t-dark-700 w-full h-40 flex flex-row items-center justify-end">
        <PaginationComponent
          size={3}
          pagesCount={Math.ceil(count / perPage)}
          className=" w-fit mx-8  rounded-lg "
          itemStyle="bg-yellow-500 m-1 bg-dark-800 rounded-sm text-lg text-light-100"
          selectedItemStyle="bg-primary text-dark-800 hover:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default SearchResult;
