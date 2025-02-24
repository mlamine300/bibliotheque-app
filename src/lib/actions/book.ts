/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { db } from "@/db";
import { bookTable } from "@/db/schema";
import { book } from "@/index";
import { and, count, eq, like, not, or } from "drizzle-orm";

type uploadedBook = Omit<book, "id">;
interface BookActionResponse {
  success: boolean;
  data?: { books: book[]; count: number };
  error?: string;
}

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
    .values({ ...book, available_copies: book.total_copies })
    .returning();
  return {
    success: true,
    message: `book "${book.title}" added successufely!`,
    data: returnedBook[0],
  };
};

export const getLastBooks: (
  offset?: number,
  limit?: number
) => Promise<BookActionResponse> = async (offset, limit) => {
  try {
    const booksQuery = db
      .select()
      .from(bookTable)
      .orderBy(bookTable.createdAt)
      .offset(offset || 0)
      .limit(limit || 15);

    const countBooksQuery = db.select({ count: count() }).from(bookTable);
    const [books, booksCount]: any = await Promise.all([
      booksQuery,
      countBooksQuery,
    ]);

    if (books && books.length > 0)
      return {
        success: true,
        data: { books, count: booksCount[0].count },
      };
    else {
      return {
        success: false,

        error: "there is no books on database",
      };
    }
  } catch (error) {
    console.error("Error getting Books ", error);
    return {
      success: false,

      error: error as string,
    };
  }
};

export const getBookById: (id: string) => Promise<BookActionResponse> = async (
  id
) => {
  try {
    const books = (await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.id, id))
      .limit(1)) as book[];
    if (!books || books.length < 1)
      return {
        success: false,
        error: "there is no such book in database",
      };
    return { success: true, data: { books, count: 1 } };
  } catch (error) {
    console.error(`"Error getting the book {id:${id}} : `, error);
    return { success: false, error: error as string };
  }
};

export const getSemilarBooks: (
  genre: string,
  id: string,
  limit?: number
) => Promise<BookActionResponse> = async (genre, id, limit) => {
  const genres = genre.split(" / ");
  const query = genres.map((g) => like(bookTable.genre, `%${g}%`));

  try {
    const booksQuery = db
      .select()
      .from(bookTable)
      .where(and(or(...query), not(eq(bookTable.id, id))))
      .limit(limit || 6);
    const countBooksQuery = db
      .select({ count: count() })
      .from(bookTable)
      .where(and(or(...query), not(eq(bookTable.id, id))));

    const [books, booksCount]: any = await Promise.all([
      booksQuery,
      countBooksQuery,
    ]);

    if (!books || books.length < 1) {
      return {
        success: false,
        error: "there is no  books with such genre",
      };
    }
    return { success: true, data: { books, count: booksCount[0].count } };
  } catch (error) {
    console.error(`"Error getting books  : `, error);
    return { success: false, error: error as string };
  }
};

export const getSearchedBooks: (
  search: string,
  offset?: number,
  limit?: number
) => Promise<BookActionResponse> = async (search, offset, limit) => {
  try {
    const query: any = db
      .select()
      .from(bookTable)
      .where(
        or(
          like(bookTable.title, `%${search}%`),
          like(bookTable.genre, `%${search}%`),
          like(bookTable.author, `%${search}%`)
        )
      )
      .orderBy(bookTable.createdAt)
      .offset(offset || 0)
      .limit(limit || 15);

    const countQuery = db
      .select({ count: count() })
      .from(bookTable)
      .where(
        or(
          like(bookTable.title, `%${search}%`),
          like(bookTable.genre, `%${search}%`),
          like(bookTable.author, `%${search}%`)
        )
      );
    const [books, booksCount] = await Promise.all([query, countQuery]);

    if (!books || books.length < 1) {
      return {
        success: false,
        error: "there is no  books with such genre",
      };
    }
    return {
      success: true,
      data: { books, count: booksCount[0].count },
    };
  } catch (error) {
    console.error(`"Error getting books  : `, error);
    return { success: false, error: error as string };
  }
};
