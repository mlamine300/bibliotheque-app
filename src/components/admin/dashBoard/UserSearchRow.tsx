import ProfileImage from "@/components/ProfileImage";
import { userInfo } from "@/index";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { FaCalendar } from "react-icons/fa6";

const UserSearchRow = ({
  user,
  className,
}: {
  user: userInfo;
  className?: string;
}) => {
  return (
    <Link
      href={`/admin/users/${user.id}`}
      className={cn(
        className,
        "flex gap-4 items-center p-4 rounded-xl bg-light-300"
      )}
    >
      <ProfileImage
        img={user.userAvatar as string}
        width={48}
        height={48}
        className="w-20 h-20 border-light-500 border-4 mr-4 "
      />
      <div className="flex flex-col justify-evenly py-2">
        <h3 className="font-semibold text-lg text-dark-100">
          {user.fullName}{" "}
        </h3>
        <p className="font-medium italic text-base text-gray-500">
          {user.email}{" "}
        </p>
        <div className="flex gap-4">
          <FaCalendar className="w-4 h-4 text-gray-500" />
          <p className="font-normal text-base text-gray-500">
            {dayjs(user.createdAt).format("DD/MM/YYYY")}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserSearchRow;
