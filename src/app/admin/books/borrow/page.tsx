import AdminTable from "@/components/admin/AdminTable";
import { headerProps } from "@/components/admin/BookTableHeader";
import BorrowedBookTableRow from "@/components/admin/BorrowedBookTableRow";

import PaginationComponent from "@/components/PaginationComponent";
import { borrowedBook } from "@/index";
import { getAllBorrowedBooks } from "@/lib/actions/book";
import React from "react";
import { BiSort } from "react-icons/bi";

const PER_PAGE = 6;
/**{
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
} */
async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;
  // // console.log(await searchParams);
  // // const page = (await searchParams?.page) ? Number(searchParams.page) : 1;
  // const page = 1;
  const resp = await getAllBorrowedBooks({
    offset: (page - 1) * PER_PAGE,
    limit: PER_PAGE,
  });

  const books = resp.data?.books as borrowedBook[];
  const count = resp.data?.count || 0;

  console.log(JSON.stringify(resp));
  if (!resp?.success || !books || books.length < 1) return "";

  const headerTitles: headerProps[] = [
    { title: "Book", span: 4 },
    { title: "User Requested", span: 4 },
    { title: "Status", span: 2 },
    { title: "Borrowed date", span: 2 },
    { title: "Return date", span: 2 },
    { title: "Due date", span: 2 },
    { title: "Receipt", span: 2 },
  ];
  return (
    <div className="flex flex-col p-4 sm:p-8">
      <div className="flex mb-10">
        <h2 className="font-ibm-plex-sans text-xl text-dark-100 font-semibold">
          Borrow Book Requests
        </h2>
        <button className="flex ml-auto">
          <p className="text-dark-100 text-base">A-Z</p>
          <BiSort className="text-light-500 w-6 h-6" />
        </button>
      </div>
      {books && (
        <AdminTable
          data={books}
          rander={(book: borrowedBook) => (
            <BorrowedBookTableRow borrowedBook={book} key={book.id} />
          )}
          headerTitles={headerTitles}
        />
      )}
      {count > PER_PAGE && (
        <PaginationComponent
          pagesCount={Math.ceil(count / PER_PAGE)}
          size={3}
          itemStyle=" bg-primary-admin text-light-400 rounded-sm mx-0"
          selectedItemStyle="bg-secondary text-primary-admin border-[0.5px] border-primary-admin cursor-not-allowed"
          className="self-end my-10 "
        />
      )}
    </div>
  );
}

export default page;
