import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import VideoCover from "@/components/VideoCover";
import { book } from "@/index";
import { getBookById, getSemilarBooks } from "@/lib/actions/book";
import { redirect } from "next/navigation";

import React from "react";

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getBookById(id);

  if (!data) redirect("/404");
  const book = data.books[0];
  const { data: SemilarBooksData } = await getSemilarBooks(book.genre, book.id);
  const books = SemilarBooksData?.books as book[];
  console.log(book);
  return (
    <div className="flex flex-col gap-20 mx-auto text-3xl font-ibm-plex-sans text-light-100">
      <BookOverview {...book} />
      <div className="flex gap-8 ">
        <div className="flex flex-col w-full px-8">
          <VideoCover path={book.video} />
          <h3 className=" mt-10 mb-8  font-semibold">Summary</h3>
          {book.summary.split("|").map((line, i) => (
            <p className="text-lg mb-8" key={i}>
              {line}
            </p>
          ))}
        </div>
        <div className="w-full flex flex-col">
          {/* <h3 className="font-semibold">More similer books</h3> */}
          {books && <BookList bookList={books} title="More similer books" />}
        </div>
      </div>
    </div>
  );
}

export default page;
