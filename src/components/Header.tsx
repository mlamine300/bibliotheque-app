"use client";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = ({ session }: { session: Session }) => {
  const path = usePathname();

  return (
    <header className="my-20 flex justify-between max-w-7xl  mx-auto w-full">
      <Link className="mr-auto flex" href="/Liberary">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-2xl text-white font-bold ml-2">BookWise</p>
      </Link>

      <ul className="flex flex-row">
        <li>
          <Link
            className={cn(
              "text-lg hover:text-primary   mx-8",
              path === "/"
                ? "text-primary cursor-not-allowed"
                : "text-light-100"
            )}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "text-lg hover:text-primary  mx-8",
              path === "/search"
                ? "text-primary cursor-not-allowed"
                : "text-light-100"
            )}
            href="/search"
          >
            Search
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <Avatar className="bg-amber-100 text-lg font-bold">
              <AvatarFallback>
                {getInitials(session.user?.name || "UK")}{" "}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
