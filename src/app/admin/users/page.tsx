import { Button } from "@/components/ui/button";

import { getUsers } from "@/lib/actions/user";
import { Link } from "lucide-react";
import React from "react";
import config from "../../../../config";

import UserTable from "@/components/UserTable";
import { auth } from "@/auth";
const PER_PAGE = 6;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function page() {
  const urlEndpoint = config.env.imagekit.urlEndpoint;
  const session = await auth();
  const adminId = session?.user?.id || "";
  const userResponse = await getUsers();
  const users = userResponse.data?.users;
  const count = userResponse.data?.count || 0;
  console.log(userResponse);
  return (
    <div className="flex flex-col p-4 sm:p-8">
      <div className="flex mb-10">
        <h2 className="font-ibm-plex-sans text-xl text-dark-100 font-semibold">
          All Users
        </h2>
        <div className="flex gap-2 sm:gap-4 ml-auto">
          <p className="text-dark-100 text-lg">A-Z</p>
          <Button
            asChild
            className="md:text-lg md:text-white md:bg-primary-admin font-[500] hover:bg-white hover:text-primary-admin"
          >
            <Link href={"/admin/books/new"}>{"+  Create a new Book"}</Link>
          </Button>
        </div>
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
