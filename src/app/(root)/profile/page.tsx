import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { book } from "@/index";
import { getLastBooks } from "@/lib/actions/book";
import React from "react";

async function page() {
  const { success, data, error } = await getLastBooks();
  const books = data?.books as book[];
  if (!success || !books) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-8 w-fit p-8 rounded-2xl bg-dark-300 shadow-xl">
          <p className="text-5xl text-light-100 font-semibold ">Error</p>
          <p className="text-3xl text-light-100 font-semibold">
            {error as string}{" "}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Log Out</Button>
      </form>
      <BookList title="Borrow Books" bookList={books} />
    </>
  );
}

export default page;
