import { book, userInfo } from "@/index";
import React from "react";
import DashBoardBorrowedBookRow from "./dashBoard/DashBoardBorrowedBookRow";
import UserSearchRow from "./dashBoard/UserSearchRow";

const SearchUserOrBookRow = ({ data }: { data: book | userInfo }) => {
  return (
    <div className="flex w-full h-28 min-h-28 rounded-lg shadow-lg bg-white text-black">
      {"author" in data ? (
        <DashBoardBorrowedBookRow borrowedBook={data as book} type="book" />
      ) : (
        <UserSearchRow user={data as userInfo} />
      )}
    </div>
  );
};

export default SearchUserOrBookRow;
