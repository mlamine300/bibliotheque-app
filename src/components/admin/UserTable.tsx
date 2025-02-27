"use client";
import React, { useState } from "react";
import AdminTable from "./AdminTable";
import { userInfo } from "../..";
import UserTableRow from "./UserTableRow";
import { headerProps } from "./BookTableHeader";
import PaginationComponent from "../PaginationComponent";
import Modal from "../Modal";
import UniversityCard from "../UniversityCard";
import RequestUserTableRow from "./RequestUserTableRow";
import CheckBeforeAction from "./CheckBeforeAction";
import { useToast } from "@/hooks/use-toast";
import { approveUserStatus, rejectUserStatus } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

export type rowType = "default" | "request";
export type rowAction = {
  id: string;
  action: "reject" | "approve";
};
const UserTable = ({
  users,
  count,
  perPage,
  urlEndpoint,
  adminId,
  type,
}: {
  users: userInfo[];
  count: number;
  perPage: number;
  urlEndpoint: string;
  adminId: string;
  type?: rowType | "default";
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const rowType = type || "default";
  const [cardId, setCardId] = useState("");
  const [action, setAction] = useState<rowAction | null>(null);
  const defaultHeaderTitles: headerProps[] = [
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
  const requestHeaderTitles: headerProps[] = [
    {
      title: "Name",
      span: 3,
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
      span: 3,
    },
  ];

  const handleRequestAction = async () => {
    if (!action?.id) {
      toast({
        title: "Error",
        description: "There is no ID for user to update",
        variant: "destructive",
      });
      setAction(null);
      return;
    }

    const { success, error } =
      action.action === "approve"
        ? await approveUserStatus(action.id)
        : await rejectUserStatus(action.id);
    if (!success) {
      toast({ title: "Error", description: error, variant: "destructive" });
      setAction(null);
      return;
    }
    toast({ title: "Success", description: "User updated succesuflly" });
    setAction(null);
    router.refresh();
  };

  return (
    <div className="relative">
      <AdminTable
        data={users}
        rander={(user) =>
          rowType === "request" ? (
            <RequestUserTableRow
              adminId={adminId}
              ViewCardAction={setCardId}
              rowAction={setAction}
              user={user}
              key={user.id}
            />
          ) : (
            <UserTableRow
              adminId={adminId}
              ViewCardAction={setCardId}
              user={user}
              key={user.id}
            />
          )
        }
        headerTitles={
          rowType === "default" ? defaultHeaderTitles : requestHeaderTitles
        }
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

      {action?.action ? (
        <>
          <Modal hide={() => setAction(null)}>
            <CheckBeforeAction
              action={handleRequestAction}
              type={action.action}
            />
          </Modal>
        </>
      ) : (
        cardId && (
          <>
            <Modal hide={() => setCardId("")}>
              <UniversityCard urlEndpoint={urlEndpoint} path={cardId} />
            </Modal>
          </>
        )
      )}
    </div>
  );
};

export default UserTable;
