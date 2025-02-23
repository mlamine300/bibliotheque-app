"use server";
import { db } from "@/db";
import { bookTable } from "@/db/schema";
import { book } from "@/index";
import { eq } from "drizzle-orm";

type uploadedBook = Omit<book, "id">;

export const addBook = async (book: uploadedBook) => {
  const b = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.title, book.title));
  if (b && b.length > 0)
    return {
      success: false,
      message: "Book already exist please check the title again",
    };
  const returnedBook = await db
    .insert(bookTable)
    .values({ ...book, id: "005", available_copies: book.total_copies })
    .returning();
  return {
    success: true,
    message: `book "${book.title}" added successufely!`,
    data: returnedBook[0],
  };
};

export const getLastBooks = async () => {
  const books = await db.select().from(bookTable).orderBy();
};
