import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import React from "react";
import { sampleBooks } from "../../../../constants";

function page() {
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
      <BookList title="Borrow Books" bookList={sampleBooks} />
    </>
  );
}

export default page;
