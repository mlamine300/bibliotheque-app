import { getUsers } from "@/lib/actions/user";
import { BiSort } from "react-icons/bi";
import React from "react";
import config from "../../../../config";

import UserTable from "@/components/admin/UserTable";
import { auth } from "@/auth";
const PER_PAGE = 6;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const urlEndpoint = config.env.imagekit.urlEndpoint;
  const session = await auth();
  const adminId = session?.user?.id || "";
  const userResponse = await getUsers({
    offset: (page - 1) * PER_PAGE,
    limit: PER_PAGE,
  });
  const users = userResponse.data?.users;
  const count = userResponse.data?.count || 0;

  return (
    <div className="flex flex-col p-4 sm:p-8">
      <div className="flex mb-10">
        <h2 className="font-ibm-plex-sans text-xl text-dark-100 font-semibold">
          All Users
        </h2>
        <button className="flex ml-auto">
          <p className="text-dark-100 text-base">A-Z</p>
          <BiSort className="text-light-500 w-6 h-6" />
        </button>
      </div>
      {users && (
        <UserTable
          adminId={adminId}
          users={users}
          count={count}
          perPage={PER_PAGE}
          urlEndpoint={urlEndpoint}
        />
      )}
    </div>
  );
}

export default page;
