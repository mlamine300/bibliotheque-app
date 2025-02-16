import React from "react";
import { book } from "../index";
import BookCard from "./BookCard";

function BookList({
  bookList,
  title,
  className,
}: {
  bookList: book[];
  title: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className=" uppercase font-bebas-neue text-4xl text-light-100">
        {title}
      </h2>
      <ul className="mt-10 flex flex-wrap gap-5 max-xs:justify-between xs:gap-10">
        {bookList.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
