"use client";
import { book } from "@/index";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import BookCover from "../BookCover";
import dayjs from "dayjs";
import Link from "next/link";
import { deleteBook } from "@/lib/actions/book";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
const BookTableRow = ({ book }: { book: book }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const handleDeleteBook = async () => {
    if (pending) return;

    const { success, error } = await deleteBook(book.id);

    if (!success) {
      toast({ title: "Error", description: error, variant: "destructive" });

      return;
    }
    toast({ title: "success", description: "Book deleted successuflly!" });
    router.refresh();
  };
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
        <Link href={`/admin/books/new?id=${book.id}`}>
          <CiEdit className="text-blue-300 w-6 h-6 hover:w-8 hover:h-8 hover:rotate-12" />
        </Link>
        <MdOutlineDeleteForever
          onClick={async () => {
            setPending(true);
            await handleDeleteBook();
            setPending(false);
          }}
          className={`${
            pending
              ? "text-gray-500 cursor-not-allowed"
              : "text-red hover:w-8 hover:h-8 hover:rotate-12"
          } w-6 h-6 `}
        />
      </div>
    </div>
  );
};

export default BookTableRow;
