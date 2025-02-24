"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useBookContext } from "@/context/BookContext";
import { useRouter } from "next/navigation";

const NoResultFound = () => {
  const router = useRouter();
  const { search, updateSearch } = useBookContext();
  return (
    <div className="flex flex-col items-center my-8 w-full text-light-100 font-semibold font-ibm-plex-sans">
      <div className="flex w-full">
        <h3 className="text-3xl ">
          Search Results for{" "}
          <span className="text-primary ml-2"> {search}</span>
        </h3>
      </div>
      <div className="flex flex-col items-center mt-20 gap-8 max-w-96">
        <Image
          src="/icons/book-notfound.svg"
          alt="not found"
          width={200}
          height={200}
        />
        <h3 className="text-2xl">No Results Found</h3>
        <p className="text-lg font-light text-center">
          We couldn’t find any books matching your search. Try using different
          keywords or check for typos.
        </p>
        <Button
          className="hover:font-semibold"
          size={"lg"}
          onClick={() => {
            updateSearch("");
            router.push("/books/search");
          }}
        >
          Clear search
        </Button>
      </div>
    </div>
  );
};

export default NoResultFound;
