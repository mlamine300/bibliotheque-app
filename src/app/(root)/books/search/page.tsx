/* eslint-disable @typescript-eslint/no-explicit-any */

import NoResultFound from "@/components/NoResultFound";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import BookContext from "@/context/BookContext";
import { book } from "@/index";
import { getLastBooks, getSearchedBooks } from "@/lib/actions/book";
import { SearchParams } from "next/dist/server/request/search-params";

import React from "react";

async function page({ searchParams }: { searchParams: SearchParams }) {
  //   const search = useSearchParams();

  const PER_PAGE = 15;
  const { search, page } = await searchParams;

  const { data } = search
    ? await getSearchedBooks(
        search as string,
        ((Number(page) || 1) - 1) * PER_PAGE,
        PER_PAGE
      )
    : await getLastBooks();

  const books = data?.books as book[];
  const count = data?.count || 0;

  console.log(count);
  return (
    <section className="flex flex-col gap-10 items-center w-full">
      <BookContext>
        <div className="flex flex-col items-center max-w-[700px]">
          <h4 className="text-light-100 mb-4 text-xl font-semibold font-ibm-plex-sans ">
            Discover Your Next Great Read:
          </h4>
          <h3 className=" text-center text-light-700 text-6xl font-semibold font-ibm-plex-sans mb-8 leading-tight">
            Explore and Search for{" "}
            <span className="text-primary">Any Book</span> In Our Library
          </h3>
          <SearchBar />
        </div>
        {count ? (
          <SearchResult books={books} count={count} />
        ) : (
          <NoResultFound />
        )}
      </BookContext>
    </section>
  );
}

export default page;
