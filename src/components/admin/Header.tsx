"use client";
import { Session } from "next-auth";

import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
// import { book, userInfo } from "@/index";
import { getLastBooks } from "@/lib/actions/book";
import { getUsers } from "@/lib/actions/user";
import SearchUserOrBookRow from "./SearchUserOrBookRow";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function Header({ session }: { session: Session }) {
  const router = useRouter();
  if (!session?.user?.name) {
    router.replace("/");
  }

  const [search, setSearch] = useState<string>();
  // const [searchedUsers, setSearchedUsers] = useState<userInfo[]>([]);
  // const [searchedBooks, setSearchedBooks] = useState<book[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const SearchAction = async (e: FormEvent) => {
    e.preventDefault();
    if (!search || search?.length < 3) return;

    const bookResponse = await getLastBooks(0, 5, search);
    const usersResponse = await getUsers({
      offset: 0,
      limit: 5,
      search: search,
    });
    setSearchedData([]);
    if (bookResponse.data?.books && bookResponse.data.books.length > 0)
      setSearchedData(bookResponse.data.books);
    if (usersResponse.data?.users && usersResponse.data.users.length > 0) {
      setSearchedData((sd) => [...sd, ...(usersResponse.data?.users || "")]);
    }

    //console.log(searchedData);
    // console.log("--------------------------------");
    // console.log(bookResponse);
    // console.log("--------------------------------");
    // console.log(usersResponse);
  };
  return (
    <header className="min-w-36 flex flex-col justify-start sm:justify-between py-4 sm:py-8 px-4 sm:px-16 items-center sm:flex-row sm:items-center w-full h-fit rounded-t-xl">
      <div className="flex flex-col font-ibm-plex-sans gap-1">
        <h2 className="text-2xl font-semibold text-dark-100">{`Welcome,${
          session.user?.name || "Admin"
        }`}</h2>
        <p className="text-xl font-light text-light-500">
          Monitor all of your projects and tasks here
        </p>
      </div>

      <form
        onSubmit={SearchAction}
        className="relative flex items-center w-[450px] h-14 rounded-md  gap-2 group"
      >
        <IoIosSearch className="w-5 h-5 text-gray-500 group-hover:rotate-6 translate-x-10" />
        <Input
          className="pl-10 w-full text-gray-500 font-normal text-base"
          type="text"
          placeholder="Search users, books by title, author, or genre."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchedData && searchedData.length > 0 && (
          <div className="absolute w-[450px] top-16 h-[350px] bg-white rounded-xl shadow-2xl z-40 p-4 overflow-auto">
            <FaXmark
              className="text-red w-8 h-8 ml-auto mr-2 my-2 hover:w-9 hover:h-9"
              onClick={() => {
                setSearch("");
                setSearchedData([]);
              }}
            />
            <div className="flex flex-col gap-2 p-2 w-full">
              {searchedData.map((sd) => (
                <SearchUserOrBookRow data={sd} key={sd.id} />
              ))}
            </div>
            <p className="h-8"></p>
          </div>
        )}
      </form>
    </header>
  );
}

export default Header;
