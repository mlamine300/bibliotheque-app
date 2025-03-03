import { Button } from "@/components/ui/button";
import { book } from "@/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";
import DashBoardBorrowedBookRow from "./DashBoardBorrowedBookRow";
const RecentlyAddedBooksSection = ({
  books,
}: {
  books: book[] | undefined;
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg ">
      <div className="flex justify-between w-full">
        <h3 className="text-xl  font-semibold text-dark-100">
          Recently Added Books
        </h3>
        <Button asChild variant={"admin_white"}>
          <Link href="/admin/books"> View All </Link>
        </Button>
      </div>
      <Link
        href="/admin/books/new"
        className="w-full p-4 flex gap-4 items-center bg-light-300 rounded-lg text-dark-100 hover:bg-light-400 hover:text-dark-200 hover:shadow-lg group"
      >
        <FiPlus className="rounded-full w-12 h-12 text-xs mr-2" />
        <p className="font-medium text-lg group-hover:font-bold">
          Add New Book
        </p>
      </Link>

      {books ? (
        <div className="overflow-y-auto max-h-[800px] w-full ">
          <div className="flex flex-col gap-4">
            {books.map((book) => (
              <DashBoardBorrowedBookRow
                type="book"
                key={book.id}
                borrowedBook={book}
                className="bg-red"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Image
            src="/icons/admin/no-book.svg"
            alt="no book"
            width={193}
            height={144}
            className="w-[144px] h-[193px] "
          />
          <h3 className="font-semibold text-base text-dark-100">No Books</h3>
          <p className="font-normal text-sm text-gray-500">
            There are no book added this week.
          </p>
        </>
      )}
    </div>
  );
};

export default RecentlyAddedBooksSection;
