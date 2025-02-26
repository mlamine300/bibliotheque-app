"use client";
import { userInfo } from "@/index";
import React from "react";
import ProfileImage from "../ProfileImage";
import dayjs from "dayjs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteUser } from "@/lib/actions/user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function UserTableRow({
  user,
  ViewCardAction,
  adminId,
}: {
  user: userInfo;
  ViewCardAction: (s: string) => void;
  adminId?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const jointAt = dayjs(user.createdAt).format("MMM DD YYYY");
  const handleDelete = async () => {
    if (!user.id) {
      toast({
        title: "Error",
        description: "There is no ID for user to delete",
        variant: "destructive",
      });
      return;
    }

    const { success, error } = await deleteUser(user.id);
    if (!success) {
      toast({ title: "Error", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "User deleted succesuflly" });
    router.refresh();
  };
  return (
    <div
      className="grid grid-rows-1 items-center border-b-[0.5px] font-ibm-plex-sans border-light-400 mb-1"
      style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
    >
      <div className="col-span-5 flex  items-center ">
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
        <h3
          className={`px-2 py-1 w-fit h-fit rounded-full text-sm font-medium ${
            user.role === "ADMIN" || user.role === "SUPERADMIN"
              ? "text-green-800 bg-green-100/50"
              : "text-pink-600 bg-pink-400/30"
          } text-center`}
        >
          {user.role}
        </h3>
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
      <div className="col-span-1 flex justify-center items-center">
        <MdOutlineDeleteForever
          onClick={handleDelete}
          className="text-red w-6 h-6 hover:w-8 hover:h-8 hover:rotate-12"
        />
      </div>
    </div>
  );
}

export default UserTableRow;
