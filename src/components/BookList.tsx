import React, { ReactNode } from "react";
import { book } from "../index";

function BookList({
  rander,
  title,
  className,
  bookList,
}: {
  bookList: book[];
  rander: (books: book) => ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className=" uppercase font-bebas-neue text-4xl text-light-100">
        {title}
      </h2>
      <ul className=" mt-10 flex justify-evenly flex-wrap gap-5 max-xs:justify-between xs:gap-20">
        {bookList.map(rander)}
      </ul>
    </section>
  );
}

export default BookList;
