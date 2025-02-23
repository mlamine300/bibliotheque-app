import BookOverview from "@/components/BookOverview";

import BookList from "@/components/BookList";

export default async function Home() {
  const book = sampleBooks[0];
  return (
    <div className="max-w-7xl  mx-auto">
      <BookOverview {...book} />
      <BookList title="PopularBooks" bookList={sampleBooks} className="my-8" />
    </div>
  );
}
