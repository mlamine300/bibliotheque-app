import React from "react";
import { book } from "../index";
import BookCover from "./BookCover";
import Link from "next/link";

function BookCard({ id, title, genre, color, cover }: book) {
  return (
    <li className="flex flex-col max-w-40">
      <Link href={`/books/${id}`}>
        <BookCover coverColor={color} coverUrl={cover} />
        <p className="text-lg text-light-100 font-semibold">{title}</p>
        <p className="text-sm text-light-100 opacity-60 font-semibold">
          {genre}{" "}
        </p>
      </Link>
    </li>
  );
}

export default BookCard;
