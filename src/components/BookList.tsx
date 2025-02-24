import React from "react";
import { book } from "../index";
import BookCard from "./BookCard";

function BookList({
  bookList,
  title,
  className,
  bookClassName,
}: {
  bookList: book[];
  title: string;
  className?: string;
  bookClassName?: string;
}) {
  return (
    <section className={className}>
      <h2 className=" uppercase font-bebas-neue text-4xl text-light-100">
        {title}
      </h2>
      <ul className=" mt-10 flex justify-evenly flex-wrap gap-5 max-xs:justify-between xs:gap-20">
        {bookList.map((book) => (
          <BookCard
            className={bookClassName as string}
            key={book.id}
            {...book}
          />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
