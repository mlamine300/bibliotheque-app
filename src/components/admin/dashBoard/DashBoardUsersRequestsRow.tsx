import ProfileImage from "@/components/ProfileImage";
import { userInfo } from "@/index";

import React from "react";

const DashBoardUsersRequestsRow = ({ user }: { user: userInfo }) => {
  return (
    <div className="flex flex-col   items-center justify-center gap-2 py-5 w-[30%]  font-ibm-plex-sans rounded-xl bg-light-300">
      <ProfileImage
        width={48}
        height={48}
        className="w-12 h-12"
        img={user.userAvatar as string}
      />
      <h3 className="text-dark-300 line-clamp-1  font-medium text-sm md:text-base px-4">
        {user.fullName}
      </h3>

      <p className="text-light-500 font-normal max-w-[90%] overflow-hidden overflow-ellipsis text-xs md:text-sm px-4">
        {user.email}
      </p>
    </div>
  );
};

export default DashBoardUsersRequestsRow;
