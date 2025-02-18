import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "../../../constants";

import BookList from "@/components/BookList";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
export default async function Home() {
  const users = await db.insert(usersTable).values({
    email: "aaa@gmail.com",
    fullName: "kda",
    password: "7845654",
    universityCard: "124fdsf54",
    UniversityId: 1545454,
    status: "APPROVED",
  });
  console.log(JSON.stringify(users));
  const book = sampleBooks[0];
  return (
    <div className="max-w-7xl  mx-auto">
      <BookOverview {...book} />
      <BookList title="PopularBooks" bookList={sampleBooks} className="my-8" />
    </div>
  );
}
