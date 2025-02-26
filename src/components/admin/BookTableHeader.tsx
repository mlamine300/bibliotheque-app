import React from "react";

export interface headerProps {
  title: string;
  span: number;
}
const BookTableHeader = ({ titles }: { titles: headerProps[] }) => {
  const cols = titles.reduce((p, c) => p + c.span, 0);
  //const classn = ` w-full bg-light-400 h-12 items-center grid grid-cols-${cols} grid-rows-1`;
  //console.log(classn);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: "repeat(1, minmax(0, 1fr))",
        alignItems: "center",
      }}
      className=" w-full bg-light-400 h-12"
    >
      {titles.map((t) => (
        <p
          key={t.title}
          style={{ gridColumn: `span ${t.span} / span ${t.span}` }}
          className={`pl-2 text-dark-100 font-light text-sm `}
        >
          {t.title}
        </p>
      ))}
      {/*
      
      <p className="pl-2 text-dark-100 font-light text-sm col-span-4">
        Book Title
      </p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">Author</p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">Genre</p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">
        Date Created
      </p>
      <p className="pl-2 text-dark-100 font-light text-sm col-span-1">Action</p> */}
    </div>
  );
};

export default BookTableHeader;
