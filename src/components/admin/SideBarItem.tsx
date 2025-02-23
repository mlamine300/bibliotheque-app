"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  to: string;
  icon: string;
  selected: boolean;
}
function SideBarItem({ title, to, icon }: Props) {
  const pathName = usePathname();
  const selected =
    (to === "/admin" && to === pathName) ||
    (to !== "/admin" && pathName.includes(to));
  const linkclassName = selected
    ? "bg-primary-admin text-white"
    : "text-dark-100";
  const iconclassName = selected ? "text-white" : "";
  return (
    <Link
      href={to}
      className={cn(
        "flex sm:gap-2 items-center py-2 px-2 sm:px-4 rounded-lg text-lg",
        linkclassName
      )}
    >
      <Image
        src={icon}
        alt={to}
        height={20}
        width={20}
        className={cn("w-10 h-10 sm:w-fit sm:h-fit", iconclassName)}
      />
      <h2 className="max-md:hidden ">{title}</h2>
    </Link>
  );
}

export default SideBarItem;
