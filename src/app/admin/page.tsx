import BorrowBookSection from "@/components/admin/dashBoard/BorrowBookSection";

import { Button } from "@/components/ui/button";
import { getAllBorrowedBooks } from "@/lib/actions/book";

import Link from "next/link";
import React from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
async function page() {
  const barrowedBookResponse = await getAllBorrowedBooks({
    offset: 0,
    limit: 10,
  });
  const barrowedBooks = barrowedBookResponse.data?.books;

  return (
    <section className="flex flex-col gap-8 p-4 font-ibm-plex-sans w-full h-full">
      <div className="flex justify-stretch gap-6">
        <div className="flex flex-col w-full rounded-xl p-5 gap-3 bg-white">
          <div className="flex">
            <h3 className=" mr-3 items-center text-gray-600 text-base font-medium">
              Barrowed Books
            </h3>
            <TbTriangleInvertedFilled className="text-orange-600 w-4 h-4 mr-1" />
            <h3 className="text-orange-500 text-base font-medium">2</h3>
          </div>
          <h3 className="text-3xl font-semibold text-dark-100">145</h3>
        </div>

        <div className="flex flex-col w-full rounded-xl p-5 gap-3 bg-white">
          <div className="flex">
            <h3 className=" mr-3 items-center text-gray-600 text-base font-medium">
              Total Users
            </h3>
            <TbTriangleInvertedFilled className="text-green-600 w-4 h-4 mr-1" />
            <h3 className="text-green-500 text-base font-medium">4</h3>
          </div>
          <h3 className="text-3xl font-semibold text-dark-100">145</h3>
        </div>

        <div className="flex w-full flex-col rounded-xl p-5 gap-3 bg-white">
          <div className="flex">
            <h3 className=" mr-3 items-center text-gray-600 text-base font-medium">
              Total Books
            </h3>
            <TbTriangleInvertedFilled className="text-green-600 w-4  h-4 mr-1" />
            <h3 className="text-green-500 text-base font-medium">2</h3>
          </div>
          <h3 className="text-3xl font-semibold text-dark-100">145</h3>
        </div>
      </div>
      <div className="grow flex w-full h-full ">
        <div className="w-full flex flex-col gap-8 h-full grow ">
          <BorrowBookSection barrowedBooks={barrowedBooks} />
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg"></div>
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold text-dark-100">
              Account Requests
            </h3>
            <Button asChild variant={"admin_white"}>
              <Link href="/admin/users/requests"> View All </Link>
            </Button>
          </div>
        </div>
        <div className="w-full h-[900px] grow bg-blue-300">b</div>
        <div></div>
      </div>
    </section>
  );
}

export default page;
