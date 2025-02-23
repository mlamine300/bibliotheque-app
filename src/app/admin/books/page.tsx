import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col p-4 sm:p-8">
      <div className="flex">
        <h2 className="font-ibm-plex-sans text-xl text-dark-100 font-semibold">
          All books
        </h2>
        <div className="flex gap-2 sm:gap-4 ml-auto">
          <p className="text-dark-100 text-lg">A-Z</p>
          <Button
            asChild
            className="text-lg text-white bg-primary-admin font-[500] hover:bg-white hover:text-primary-admin"
          >
            <Link href={"/admin/books/new"}>{"+  Create a new Book"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
