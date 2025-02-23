import { auth } from "@/auth";
import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import { redirect } from "next/navigation";

import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.name) redirect("/sign-in");
  return (
    <section className="flex bg-light-800 ">
      <SideBar session={session} />
      <div className="relative flex flex-col justify-start w-full ">
        <Header session={session} />
        <div>{children}</div>
      </div>
    </section>
  );
}

export default layout;
