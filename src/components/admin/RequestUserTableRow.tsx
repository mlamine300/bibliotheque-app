"use client";
import { userInfo } from "@/index";

import React, { useState } from "react";
import { Button } from "../ui/button";
import ProfileImage from "../ProfileImage";
import { updateUserRole } from "@/lib/actions/user";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { FaRegCircleXmark } from "react-icons/fa6";
import { rowAction } from "./UserTable";

const RequestUserTableRow = ({
  user,
  ViewCardAction,
  adminId,
  rowAction,
}: {
  user: userInfo;
  ViewCardAction: (s: string) => void;
  rowAction: (a: rowAction) => void;
  adminId?: string;
}) => {
  const [showRoleButtons, setShowRoleButtons] = useState(false);
  const [role, setRole] = useState(user.role);

  const { toast } = useToast();
  const jointAt = dayjs(user.createdAt).format("MMM DD YYYY");
  const handleUpdateUserRole = async (
    role: "USER" | "ADMIN" | "SUPERADMIN",
    id: string
  ) => {
    const resp = await updateUserRole(role, id);

    if (!resp.success) {
      toast({
        title: "Error",
        description: resp.error as string,
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "User updated successuflly!" });
      setRole(role);
    }
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setShowRoleButtons(false);
    }
  };

  return (
    <div
      className="grid grid-rows-1 items-center border-b-[0.5px] h-16 font-ibm-plex-sans border-light-400 mb-1"
      style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
    >
      <div className="col-span-3 flex  items-center ">
        <ProfileImage img={user.userAvatar as string} />
        <div className="flex flex-col max-md:hidden pl-1  overflow-hidden">
          <h3
            className={`line-clamp-1 text-ellipsis  font-semibold ${
              adminId && adminId === user.id
                ? "text-green-500 text-lg"
                : "text-dark-200 text-sm"
            }`}
          >
            {adminId && adminId === user.id ? "You" : user.fullName}
          </h3>
          <p className="line-clamp-1  text-sm font-normal text-light-500">
            {user.email}{" "}
          </p>
        </div>
      </div>
      <h3 className="col-span-2 text-sm font-medium text-dark-200 text-center">
        {jointAt}
      </h3>
      <div className="col-span-1 ">
        <button
          onClick={() => setShowRoleButtons((b) => !b)}
          className={`relative px-2 py-1 w-fit h-fit rounded-full text-sm font-medium ${
            role === "ADMIN" || role === "SUPERADMIN"
              ? "text-green-800 bg-green-100/50"
              : "text-pink-600 bg-pink-400/30"
          } text-center`}
        >
          {role}
        </button>
        {showRoleButtons && (
          <div className="absolute z-20 bg-white flex flex-col">
            <button
              onClick={() => {
                handleUpdateUserRole("USER", user.id as string);
              }}
              className={` border-b-[1px] border-light-400 px-6 py-2 w-fit h-fit l text-sm font-medium text-green-800 text-center`}
            >
              USER
            </button>
            <button
              onClick={() => {
                handleUpdateUserRole("ADMIN", user.id as string);
              }}
              className={` px-6 py-2 w-fit h-fit l text-sm font-medium text-pink-600 text-center`}
            >
              ADMIN
            </button>
          </div>
        )}
      </div>
      <h3 className="col-span-2 text-sm font-medium  text-dark-200 text-center">
        10
      </h3>
      <h3 className="col-span-2 text-sm font-medium  text-dark-200 text-center">
        {user.universityId}
      </h3>
      <Button
        onClick={() => ViewCardAction(user.universityCard)}
        variant={"admin_link"}
        className="col-span-2 text-sm font-medium  text-blue-100 text-center"
      >
        View ID Card
      </Button>
      <div className="col-span-3  flex justify-evenly items-center">
        <button
          //   onClick={handleApprove}
          onClick={() =>
            rowAction({ id: user.id as string, action: "approve" })
          }
          className="text-green-800 bg-green-300/50 px-2 py-1 rounded-sm"
        >
          Approve Account
        </button>
        <FaRegCircleXmark
          //onClick={handleReject}
          onClick={() => rowAction({ id: user.id as string, action: "reject" })}
          className="text-red w-6 h-6 hover:w-8 hover:h-8 hover:rotate-12"
        />
      </div>
    </div>
  );
};

export default RequestUserTableRow;
