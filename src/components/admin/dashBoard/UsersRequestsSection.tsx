import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

import Image from "next/image";

import { userInfo } from "@/index";
import DashBoardUsersRequestsRow from "./DashBoardUsersRequestsRow";
const UsersRequestsSection = ({
  usersRequest,
}: {
  usersRequest: userInfo[] | undefined;
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-lg ">
      <div className="flex justify-between w-full">
        <h3 className="text-xl  font-semibold text-dark-100">
          Barrow Requests
        </h3>
        <Button asChild variant={"admin_white"}>
          <Link href="/admin/books/borrow"> View All </Link>
        </Button>
      </div>
      {usersRequest ? (
        <div className="overflow-y-auto max-h-[380px]">
          <div className="w-full flex justify-evenly gap-y-4 flex-wrap">
            {usersRequest.map((user) => (
              <DashBoardUsersRequestsRow user={user} key={user.id} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Image
            src="/icons/admin/no-user.svg"
            alt="no book"
            width={193}
            height={144}
            className="w-[144px] h-[193px] "
          />
          <h3 className="font-semibold text-base text-dark-100">
            No Pending Book Requests
          </h3>
          <p className="font-normal text-sm text-gray-500">
            There are no borrow book requests awaiting your review at this time.
          </p>
        </>
      )}
    </div>
  );
};

export default UsersRequestsSection;
