import BookOverview from "@/components/BookOverview";

import BookList from "@/components/BookList";
import { getLastBooks } from "@/lib/actions/book";
import { book } from "@/index";

export default async function Home() {
  const { data, error, success } = await getLastBooks();
  const books = data?.books as book[];
  //const count = data?.count || 0;
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

  const book = books[0];
  return (
    <div className="max-w-7xl  mx-auto">
      <BookOverview {...book} />
      <BookList title="PopularBooks" bookList={books} className="my-8" />
    </div>
  );
}
