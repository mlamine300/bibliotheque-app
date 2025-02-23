import Image from "next/image";
import React from "react";
import SideBarItem from "./SideBarItem";
import SideBarProfileItem from "./SideBarProfileItem";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

function SideBar({ session }: { session: Session }) {
  if (!session?.user?.email || !session?.user?.name) {
    console.log("--------------------------------------------------------");
    console.log(session);
    redirect("/sign-in");
  }
  return (
    <aside className="sticky left-0 top-0  bg-white sm:w-1/5  h-dvh py-2 sm:py-4 px-4 sm:px-8 flex flex-col gap-4 sm:gap-8">
      <div className="flex gap-2 items-center border-dashed border-b-2  border-light-500 py-3 sm:py-6 mx-2 sm:mx-4 ">
        <Image
          src="/icons/admin/logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="bg-primary-admin rounded-full"
        />
        <h2 className="text-primary-admin font-semibold text-lg max-lg:hidden">
          BibleothequeApp
        </h2>
      </div>
      <div className="flex flex-col gap-4  mt-10 ">
        <SideBarItem
          key="home"
          icon="/icons/admin/home.svg"
          title="Home"
          to="/admin"
          selected={false}
        />
        <SideBarItem
          key="all-users"
          icon="/icons/admin/users.svg"
          title="All Users"
          to="/admin/users"
          selected={true}
        />
        <SideBarItem
          key="all-books"
          icon="/icons/admin/book.svg"
          title="All Books"
          to="/admin/books"
          selected={false}
        />
        <SideBarItem
          key="borrow-books"
          icon="/icons/admin/bookmark.svg"
          title="Borrow Requests"
          to="/admin/books/borrow"
          selected={false}
        />

        <SideBarItem
          key="account-request"
          icon="icons/admin/user.svg"
          title="Account Requests"
          to="/admin/users/requests"
          selected={false}
        />
      </div>
      <SideBarProfileItem
        email={session.user?.email}
        img="https://ik.imagekit.io/lamine300/users/cv%20image%202.jpeg?updatedAt=1740234261258"
        name={session.user?.name}
        className="mt-auto"
      />
    </aside>
  );
}

export default SideBar;
