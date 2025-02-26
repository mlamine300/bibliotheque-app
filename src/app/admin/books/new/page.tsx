import { Button } from "@/components/ui/button";
import { HiArrowSmallLeft } from "react-icons/hi2";
import React from "react";
import NewBookForm from "@/components/admin/forms/NewBookForm";
import { getBookById } from "@/lib/actions/book";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function page({ searchParams }: { searchParams: any }) {
  const id = (await searchParams).id as string;

  const book = id ? (await getBookById(id)).data?.books[0] : null;

  return (
    <section className="flex flex-col  p-8 bg-transparent">
      <Button
        asChild
        size="lg"
        variant="admin_white"
        className="w-fit py-1 px-8 group"
      >
        <Link href="/admin/books">
          <HiArrowSmallLeft className="font-bold text-primary-admin w-16 h-16 sm:w-10 sm:h-10 group-hover:text-light-400" />
          <h3>Go back</h3>
        </Link>
      </Button>
      <NewBookForm values={book ? { ...book } : undefined} />
    </section>
  );
}

export default page;
