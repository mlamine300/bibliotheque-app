import React from "react";
import { book } from "..";
import { IoBookOutline, IoCalendarOutline, IoReceipt } from "react-icons/io5";
import BookCover from "./BookCover";
import dayjs from "dayjs";
const BorrowedBookCard = ({ book }: { book: book }) => {
  const getDateToDue = () => {
    const now = dayjs();
    const due = dayjs(book.dueDate);
    const value = due.diff(now, "days");
    if (value < 10 && value > 0) return "0" + value + " days left to due";
    if (value > 9) return value + " days left to due";
    return `Late return (${-value} days)`;
  };
  return (
    <div className="flex gap-2 flex-col py-4 px-8 justify-around  font-ibm-plex-sans bg-dark-100 rounded-xl w-[300px] h-[500px]">
      <div
        style={{ backgroundColor: `${book.color.trim()}30` }}
        className="flex items-center justify-center px-8 py-4 rounded-md"
      >
        <BookCover coverColor={book.color} coverUrl={book.cover} />
      </div>
      <h3 className="text-center text-light-400 text-xl font-semibold">
        {book.title}{" "}
      </h3>
      <p className="text-center text-light-100 italic font-light mb-4 text-base">
        {book.genre}{" "}
      </p>
      <div className="flex gap-2">
        <IoBookOutline className="text-light-100 w-4 h-4" />
        {book.borrowedDate && (
          <p className="text-base font-normal text-light-100">
            {`Borrowed on ${dayjs(book.borrowedDate).format("dd MMM")}`}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <IoCalendarOutline className="text-light-100 w-4 h-4" />
        <p className="text-base font-normal text-light-100">{getDateToDue()}</p>
        <button className="ml-auto flex justify-center items-center w-7 h-7 rounded-sm bg-yellow-950 hover:bg-yellow-900">
          <IoReceipt className="text-light-100 w-4 h-4 " />
        </button>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
