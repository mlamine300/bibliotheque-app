"use client";
import React, { useState } from "react";
import ProfileImage from "../../ProfileImage";
import BookCover from "../../BookCover";
import Link from "next/link";
import { borrowedBook } from "@/index";
import { updateBorrowBookStatus } from "@/lib/actions/book";
import { useToast } from "@/hooks/use-toast";
import { HiCheck } from "react-icons/hi2";

const DashBoardBorrowedBookRow = ({
  borrowedBook,
}: {
  borrowedBook: borrowedBook;
}) => {
  const { user, book } = borrowedBook;
  const { toast } = useToast();
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState(borrowedBook.status);
  const statusColor = {
    BORROWED: "purple-700",
    RETURNED: "red",
    LATE_RETOURN: "sky-400",
  };

  const handleUpdateBookStatus = async (
    status: "BORROWED" | "RETURNED" | "LATE_RETOURN"
  ) => {
    const resp = await updateBorrowBookStatus(borrowedBook.id, status);
    if (!resp.success) {
      toast({
        title: "Error",
        description: resp.error,
        variant: "destructive",
      });
      setShowStatus(false);
      return;
    }
    toast({ title: "Success", description: "Book status Updated" });
    setStatus(status);
    setShowStatus(false);
  };
  return (
    <div
      style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}
      className=" grid grid-rows-1 w-full  h-12 items-center gap-4 font-ibm-plex-sans border-b-[0.5px] border-light-400 mb-1"
    >
      <Link
        href={`/admin/books/${book.id}`}
        className="pl-2 flex gap-2 col-span-3 items-center"
      >
        <BookCover
          coverColor={book.color}
          coverUrl={book.cover}
          className="w-7 h-10"
        />
        <p className=" text-dark-100 font-semibold text-xs truncate">
          {book.title}
        </p>
      </Link>

      <div className=" col-span-3 flex  items-center ">
        <ProfileImage img={user.userAvatar as string} />
        <div className="flex flex-col max-md:hidden pl-1  overflow-hidden">
          <h3 className={`truncate font-semibold`}>{user.fullName}</h3>
          <p className="truncate text-xs font-normal text-light-500">
            {user.email}{" "}
          </p>
        </div>
      </div>
      <button
        onClick={() => setShowStatus((b) => !b)}
        className={` col-span-2   font-medium text-xs text-center px-2 rounded-full py-[6px] 
         
        bg-${statusColor[status]}/10 
        text-${statusColor[status]}`}
      >
        {status.replace("_", " ")}

        {showStatus && (
          <div className="absolute bg-white shadow-2xl z-10 flex flex-col gap-4 items-center px-4">
            <button
              onClick={() => {
                handleUpdateBookStatus("BORROWED");
              }}
              className={`flex gap-4  px-3 py-[6px] border-b-[1px] border-light-500/10`}
            >
              <p
                className={`text-${statusColor.BORROWED} font-medium text-xs text-center`}
              >
                BORROWED
              </p>
              {status === "BORROWED" && (
                <HiCheck className="text-light-500 w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => {
                handleUpdateBookStatus("RETURNED");
              }}
              className={`flex gap-4  px-3 py-[6px] border-b-[1px] border-light-500/10 `}
            >
              <p
                className={`text-${statusColor.RETURNED} font-medium text-xs text-center`}
              >
                RETURNED
              </p>
              {status === "RETURNED" && (
                <HiCheck className="text-light-500 w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => {
                handleUpdateBookStatus("LATE_RETOURN");
              }}
              className={`relative flex gap-4  px-3 py-[6px]`}
            >
              <p className={`text-sky-400 font-medium text-xs text-center`}>
                LATE RETOURN
              </p>
              {status === "LATE_RETOURN" && (
                <HiCheck className="text-light-500 w-6 h-6" />
              )}
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default DashBoardBorrowedBookRow;
