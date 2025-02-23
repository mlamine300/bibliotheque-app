import { Session } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

function Header({ session }: { session: Session }) {
  if (!session?.user?.name) {
    redirect("/");
  }
  return (
    <header className="min-w-36 flex flex-col justify-start sm:justify-between py-4 sm:py-8 px-4 sm:px-16 items-center sm:flex-row sm:items-center w-full h-fit rounded-t-xl">
      <div className="flex flex-col font-ibm-plex-sans gap-1">
        <h2 className="text-2xl font-semibold text-dark-100">{`Welcome,${session.user.name}`}</h2>
        <p className="text-xl font-light text-light-500">
          Monitor all of your projects and tasks here
        </p>
      </div>
      <p>Search...</p>
    </header>
  );
}

export default Header;
