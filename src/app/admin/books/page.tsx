import BooksTable from "@/components/admin/BooksTable";
import PaginationComponent from "@/components/PaginationComponent";
import { Button } from "@/components/ui/button";
import { getLastBooks } from "@/lib/actions/book";
import Link from "next/link";
import React from "react";
const PER_PAGE = 7;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function page({ params }: { params: any }) {
  const searchParams = await params;
  const page = searchParams.page || 1;
  const res = await getLastBooks((page - 1) * PER_PAGE, PER_PAGE);
  const books = res.data?.books;
  const count = res.data?.count || 0;
  return (
    <div className="flex flex-col p-4 sm:p-8">
      <div className="flex mb-10">
        <h2 className="font-ibm-plex-sans text-xl text-dark-100 font-semibold">
          All books
        </h2>
        <div className="flex gap-2 sm:gap-4 ml-auto">
          <p className="text-dark-100 text-lg">A-Z</p>
          <Button
            asChild
            className="md:text-lg md:text-white md:bg-primary-admin font-[500] hover:bg-white hover:text-primary-admin"
          >
            <Link href={"/admin/books/new"}>{"+  Create a new Book"}</Link>
          </Button>
        </div>
      </div>
      {books && <BooksTable books={books} />}
      {count > PER_PAGE && (
        <PaginationComponent
          pagesCount={count}
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
