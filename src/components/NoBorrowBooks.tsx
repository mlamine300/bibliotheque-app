import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const NoBorrowBooks = () => {
  return (
    <div className="pt-20 pl-8 text-light-100 bg-dark-300/30 rounded-xl font-bebas-neue h-full">
      <h2 className=" uppercase  text-4xl ">Borrowed Books</h2>
      <div className="flex flex-col items-center ">
        <div className="flex flex-col items-center mt-10 gap-8 max-w-96">
          <Image
            src="/icons/book-notfound.svg"
            alt="not found"
            width={200}
            height={200}
          />
          <h3 className="text-4xl">No Borrowed Books</h3>
          <p className="text-2xl font-light text-center">
            You are not borrowing any book, we invite you to check our list of
            books and borrow the book you like.
          </p>
          <Button asChild className="hover:font-semibold" size={"xl"}>
            <Link href="/books/search">Search for books </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoBorrowBooks;
