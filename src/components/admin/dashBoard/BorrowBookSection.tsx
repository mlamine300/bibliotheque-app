import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import AdminTable from "../../admin/AdminTable";
import Image from "next/image";
import { borrowedBook } from "@/index";
import { headerProps } from "../../admin/BookTableHeader";
import DashBoardBorrowedBookRow from "./DashBoardBorrowedBookRow";

const BorrowBookSection = ({
  barrowedBooks,
}: {
  barrowedBooks: borrowedBook[] | undefined;
}) => {
  const barrowBooksHeaderTitles: headerProps[] = [
    { title: "Book", span: 3 },
    { title: "User Requested", span: 3 },
    { title: "Borrowed date", span: 2 },
  ];
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg ">
      <div className="flex justify-between w-full">
        <h3 className="text-xl  font-semibold text-dark-100">
          Barrow Requests
        </h3>
        <Button asChild variant={"admin_white"}>
          <Link href="/admin/books/borrow"> View All </Link>
        </Button>
      </div>
      {barrowedBooks ? (
        <div className="overflow-y-auto max-h-[380px]">
          <AdminTable
            data={barrowedBooks}
            headerTitles={barrowBooksHeaderTitles}
            rander={(book: borrowedBook) => (
              <DashBoardBorrowedBookRow borrowedBook={book} key={book.id} />
            )}
          />
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
