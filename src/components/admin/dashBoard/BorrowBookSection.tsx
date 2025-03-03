import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

import Image from "next/image";
import { borrowedBook } from "@/index";

import DashBoardBorrowedBookRow from "./DashBoardBorrowedBookRow";

const BorrowBookSection = ({
  barrowedBooks,
}: {
  barrowedBooks: borrowedBook[] | undefined;
}) => {
  return (
    <div className="flex flex-col p-4 items-center gap-4 bg-white rounded-xl shadow-lg ">
      <div className="flex justify-between w-full">
        <h3 className="text-xl  font-semibold text-dark-100">
          Barrow Requests
        </h3>
        <Button asChild variant={"admin_white"}>
          <Link href="/admin/books/borrow"> View All </Link>
        </Button>
      </div>
      {barrowedBooks ? (
        <div className="overflow-y-auto max-h-[380px] w-full ">
          <div className="flex flex-col gap-4">
            {barrowedBooks.map((book) => (
              <DashBoardBorrowedBookRow
                type="borrowedBook"
                key={book.id}
                borrowedBook={book}
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
          <h3 className="font-semibold text-base text-dark-100">
            No Pending Book Requests
          </h3>
          <p className="font-normal text-sm text-gray-500">
            There are no borrow book requests awaiting your review at this time.
          </p>
        </>
      )}
    </div>
  );
};

export default BorrowBookSection;
