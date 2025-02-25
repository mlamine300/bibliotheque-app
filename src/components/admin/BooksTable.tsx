import { book } from "@/index";
import React from "react";
import BookTableHeader from "./BookTableHeader";
import BookTableRow from "./BookTableRow";

const BooksTable = ({ books }: { books: book[] }) => {
  return (
    <div className="flex flex-col bg-white">
      <BookTableHeader />
      {books.map((book) => (
        <BookTableRow book={book} key={book.id} />
      ))}
    </div>
  );
};

export default BooksTable;
