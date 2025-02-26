import React, { ReactNode } from "react";
import BookTableHeader, { headerProps } from "./BookTableHeader";

const AdminTable = ({
  data,
  rander,
  headerTitles,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rander: (d: any) => ReactNode;
  headerTitles: headerProps[];
}) => {
  return (
    <div className="flex flex-col bg-white">
      <BookTableHeader titles={headerTitles} />
      {data.map(rander)}
    </div>
  );
};

export default AdminTable;
