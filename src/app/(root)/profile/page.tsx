/* eslint-disable @typescript-eslint/no-explicit-any */

import ProfileInfo from "@/components/ProfileInfo";
import { book } from "@/index";
import { getBorrowedBooks } from "@/lib/actions/book";
import { getUser } from "@/lib/actions/user";
import React from "react";
import config from "../../../../config";
import BookList from "@/components/BookList";

import BorrowedBookCard from "@/components/BorrowedBookCard";
import PaginationComponent from "@/components/PaginationComponent";
import NoBorrowBooks from "@/components/NoBorrowBooks";
const PER_PAGE = 4;
async function page({ params }: any) {
  const urlEndPoint = config.env.imagekit.urlEndpoint;
  const pageParams = await params;
  const user = await getUser();

  const page = +pageParams.page || 1;
  console.log("-----------------------------");
  console.log(pageParams);
  console.log("-----------------------------");
  const { data, error } = await getBorrowedBooks({
    offset: (page - 1) * PER_PAGE,
    limit: PER_PAGE,
  });
  console.log(user);
  const books = data?.books as book[];

  const count = data?.count || 0;
  if (!user) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-8 w-fit p-8 rounded-2xl bg-dark-300 shadow-xl">
          <p className="text-5xl text-light-100 font-semibold ">Error</p>
          <p className="text-3xl text-light-100 font-semibold">
            {error as string}{" "}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex justify-between gap-4 h-full w-full py-10">
      <div className="grow w-full mx-2">
        <div>
          <ProfileInfo user={user} urlEndpoint={urlEndPoint} />{" "}
        </div>
      </div>
      <div className=" grow w-full mx-2">
        {books?.length > 0 ? (
          <div className="flex flex-col">
            <BookList
              className=""
              bookList={books}
              rander={(book) => <BorrowedBookCard key={book.id} book={book} />}
              title="Borrowed books"
            />
            <PaginationComponent
              pagesCount={count / PER_PAGE}
              size={3}
              className="self-center mt-10 w-fit mx-8  rounded-lg "
              itemStyle="bg-yellow-500 m-1 bg-dark-800 rounded-sm text-lg text-light-100"
              selectedItemStyle="bg-primary text-dark-800 hover:cursor-not-allowed"
            />
          </div>
        ) : (
          <NoBorrowBooks />
        )}
      </div>
    </section>
  );
}

export default page;
