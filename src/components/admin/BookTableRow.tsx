import { book } from "@/index";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import BookCover from "../BookCover";
import dayjs from "dayjs";
const BookTableRow = ({ book }: { book: book }) => {
  return (
    <div className="relative grid grid-cols-8 grid-rows-1 w-full  h-20 items-center font-ibm-plex-sans border-b-[0.5px] border-light-400 mb-1">
      <div className="pl-2 flex gap-2 col-span-4 items-center">
        <BookCover
          coverColor={book.color}
          coverUrl={book.cover}
          className="w-7 h-10"
        />
        <p className=" text-dark-100 font-semibold text-sm ">{book.title}</p>
      </div>
      <p className="pl-2 text-dark-100 font-medium text-sm col-span-1">
        {book.author}
      </p>
      <p className="pl-2 text-dark-100 font-medium text-sm col-span-1">
        {book.genre}
      </p>
      <p className="pl-2 text-dark-100 font-medium text-sm col-span-1">
        {dayjs(book.createdAt).format("MMM DD YYYY")}
      </p>
      <div className="flex justify-center gap-6 col-span-1">
        <CiEdit className="text-blue-300 w-6 h-6 hover:w-8 hover:h-8 hover:rotate-12" />
        <MdOutlineDeleteForever className="text-red w-6 h-6 hover:w-8 hover:h-8 hover:rotate-12" />
      </div>
    </div>
  );
};

export default BookTableRow;
