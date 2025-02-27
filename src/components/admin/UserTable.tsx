"use client";
import React, { useState } from "react";
import AdminTable from "./AdminTable";
import { userInfo } from "../..";
import UserTableRow from "./UserTableRow";
import { headerProps } from "./BookTableHeader";
import PaginationComponent from "../PaginationComponent";
import Modal from "../Modal";
import UniversityCard from "../UniversityCard";

const UserTable = ({
  users,
  count,
  perPage,
  urlEndpoint,
  adminId,
}: {
  users: userInfo[];
  count: number;
  perPage: number;
  urlEndpoint: string;
  adminId: string;
}) => {
  const [cardId, setCardId] = useState("");
  const headerTitles: headerProps[] = [
    {
      title: "Name",
      span: 5,
    },
    {
      title: "Date Joined",
      span: 2,
    },
    {
      title: "Role",
      span: 1,
    },
    {
      title: "Books Borrowed",
      span: 2,
    },
    {
      title: "university ID N° ",
      span: 2,
    },
    {
      title: "university ID Card ",
      span: 2,
    },
    {
      title: "Action ",
      span: 1,
    },
  ];
  return (
    <div className="relative">
      <AdminTable
        data={users}
        rander={(user) => (
          <UserTableRow
            adminId={adminId}
            ViewCardAction={setCardId}
            user={user}
            key={user.id}
          />
        )}
        headerTitles={headerTitles}
      />

      {count > perPage && (
        <PaginationComponent
          pagesCount={Math.ceil(count / perPage)}
          size={3}
          itemStyle=" bg-primary-admin text-light-400 rounded-sm mx-0"
          selectedItemStyle="bg-secondary text-primary-admin border-[0.5px] border-primary-admin cursor-not-allowed"
          className="ml-auto mr-8 my-10 "
        />
      )}

      {cardId && (
        <>
          <Modal hide={() => setCardId("")}>
            <UniversityCard urlEndpoint={urlEndpoint} path={cardId} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default UserTable;
