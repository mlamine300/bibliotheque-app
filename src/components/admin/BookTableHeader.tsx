import React from "react";

const BookTableHeader = () => {
  return (
    <div className="grid grid-cols-8 grid-rows-1 w-full bg-light-400 h-12 items-center">
      <p className="pl-2 text-dark-100 font-light text-sm col-span-4">
        Book Title
      </p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">Author</p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">Genre</p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">
        Date Created
      </p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">Action</p>
    </div>
  );
};

export default BookTableHeader;
