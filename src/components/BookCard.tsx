import React from "react";
import { book } from "../index";
import BookCover from "./BookCover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

function BookCard({ id, title, genre, color, cover, unavaliable }: book) {
  return (
    <li
      className={cn(
        "flex flex-col md:max-w-40 items-center",
        unavaliable && "w-full"
      )}
    >
      <Link href={`/books/${id}`} className="flex flex-col items-center">
        <BookCover coverColor={color} coverUrl={cover} className="mx-auto" />
        <p className="text-lg text-light-100 font-semibold">{title}</p>
        <p className="text-sm text-light-100 opacity-60 font-semibold">
          {genre}{" "}
        </p>
      </Link>
      {unavaliable ? (
        <div className="flex flex-col items-center w-full ">
          <div className="flex my-4">
            <Image
              src="/icons/calendar.svg"
              width={20}
              height={20}
              alt="calendar"
            />
            <p className="text-sm text-light-100">{"20 days left to return"}</p>
          </div>
          <Button
            className={cn(
              "bg-gray-700 text-light-100 text-lg md:text-sm md:py-6 py-8 font-bold md:font-semibold",
              unavaliable && "w-full"
            )}
          >
            Download Receipt
          </Button>
        </div>
      ) : (
        ""
      )}
    </li>
  );
}

export default BookCard;
