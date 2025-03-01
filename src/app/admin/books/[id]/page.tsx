import Video from "@/components/admin/Video";
import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/actions/book";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { HiArrowSmallLeft, HiCalendar, HiPencil } from "react-icons/hi2";
import config from "../../../../../config";

const page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const response = await getBookById(id);
  const urlEndpoint = config.env.imagekit.urlEndpoint;
  if (
    !response.success ||
    !response.data?.books ||
    response.data.books.length < 1
  )
    return "";
  const book = response.data.books[0];
  return (
    <section className="flex flex-col gap-10  p-8 ">
      <Button
        asChild
        size="lg"
        variant="admin_white"
        className="w-fit py-1 px-8 group mb-10"
      >
        <Link href="/admin/books">
          <HiArrowSmallLeft className="font-bold text-primary-admin w-16 h-16 sm:w-10 sm:h-10 group-hover:text-light-400" />
          <h3>Go back</h3>
        </Link>
      </Button>
      <div className="flex gap-8 w-full ">
        <div
          style={{ backgroundColor: `${book.color}30` }}
          className={`h-[222px] w-[266px]  flex items-center justify-center rounded-lg  `}
        >
          <BookCover
            className="w-[125px] h-[174px] "
            coverColor={book.color}
            coverUrl={book.cover}
          />
        </div>
        <div className="flex flex-col justify-between w-full max-w-[422px] ">
          <div className="flex text-light-500 text-lg font-normal">
            <p>Created at :</p>
            <HiCalendar className="mx-3 w-6 h-6" />
            <p>{dayjs(book.createdAt).format("DD/MM/YY")} </p>
          </div>
          <h3 className="text-2xl font-semibold text-dark-100">
            {book.title}{" "}
          </h3>
          <h4 className="text-lg font-semibold text-dark-100">
            {`By ${book.author}`}{" "}
          </h4>
          <p className=" text-light-500 text-lg font-normal">{book.genre} </p>
          <Button asChild variant={"admin"} className="max-w-[422px]">
            <Link href={`/admin/books/new?id=${id}`}>
              <HiPencil className="w-6 h-6" />
              Edit Book
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-8 w-full">
        <div className="grow w-full flex flex-col">
          <h3 className="text-lg font-semibold text-dark-100">Summary</h3>
          {book.summary.split("|n|").map((line, i) => (
            <p className="text-light-500 font-normal text-base mb-2" key={i}>
              {line}
            </p>
          ))}
        </div>
        <div className="w-fit flex flex-col px-8 py-8">
          <h3 className="text-lg font-semibold text-dark-100">Video</h3>
          <Video
            urlEndpoint={urlEndpoint}
            videoUrl={book.video}
            className="w-[738px] h-[254px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
