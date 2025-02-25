/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import { bookTable, borrowedBooksTable } from "@/db/schema";
import { book } from "@/index";
import { and, count, eq, inArray, like, not, or } from "drizzle-orm";

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

export const borrowBook: (b: string) => Promise<BookActionResponse> = async (
  bookId
) => {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return {
        success: false,
        error: "there is no session please connect and try again",
      };
    const res = await db
      .select({ available: bookTable.available_copies })
      .from(bookTable)
      .where(eq(bookTable.id, bookId))
      .limit(1);

    if (!res || res.length < 1) {
      return { success: false, error: "there is no such book to borrow" };
    }
    const availableCopies = (res[0].available as number) || 0;
    if (!availableCopies) {
      return { success: false, error: "there is no avaliable copie to borrow" };
    }
    const isItBorrowed = await db
      .select()
      .from(borrowedBooksTable)
      .where(
        and(
          eq(borrowedBooksTable.bookId, bookId),
          eq(borrowedBooksTable.userId, session.user.id),
          eq(borrowedBooksTable.status, "BORROWED")
        )
      )

      .limit(1);
    if (isItBorrowed && isItBorrowed.length > 0) {
      return { success: false, error: "You already borrowing this book" };
    }
    // !availableCopies[0].available
    const now = new Date();
    now.setDate(now.getDate() + 10);
    db.insert(borrowedBooksTable)
      .values({
        bookId: bookId,
        userId: session.user.id,
        dueDate: now.toISOString().slice(0, 10),
      })
      .then(
        async () =>
          await db
            .update(bookTable)
            .set({ available_copies: availableCopies - 1 })
            .where(eq(bookTable.id, bookId))
      );
    return { success: true };
  } catch (error) {
    console.log("Error on borrow action" + error);
    return { success: false, error: "Error on borrow action " + error };
  }
};

export const getBorrowedBooks: (params?: {
  offset: number;
  limit: number;
}) => Promise<BookActionResponse> = async (data) => {
  const offset = data?.offset || 0;
  const limit = data?.limit || 10;
  try {
    const session = await auth();
    if (!session?.user?.id)
      return {
        success: false,
        error: "No session :please connect to your account and try again",
      };
    const res = await db
      .select({ bookId: borrowedBooksTable.bookId })
      .from(borrowedBooksTable)
      .where(eq(borrowedBooksTable.userId, session.user.id))
      .orderBy(borrowedBooksTable.createdAt);
    if (!res || res.length < 1)
      return {
        success: true,
        data: { books: [] as book[], count: 0 },
      };
    const bookIDs = res.map((r) => r.bookId);

    const booksResp = await db
      .select()
      .from(bookTable)
      .where(inArray(bookTable.id, bookIDs))
      .innerJoin(
        borrowedBooksTable,
        and(
          eq(borrowedBooksTable.bookId, bookTable.id),
          eq(borrowedBooksTable.userId, session.user.id)
        )
      )
      .offset(offset)
      .limit(limit);
    const books = booksResp.map((br) => {
      const childbooks = br.books;
      const borrowedBooks = br["boorowed-books"];
      return {
        ...childbooks,
        borrowedDate: borrowedBooks.borrowedDate,
        returnDate: borrowedBooks.returnDate,
        dueDate: borrowedBooks.dueDate,
        //status: borrowedBooks.status,
      };
    });
    // console.log(books);
    return {
      success: true,
      data: { books: books as book[], count: bookIDs.length },
    };
  } catch (error) {
    console.log("error getting berrowed books : ", error);
    return {
      success: false,
      error: error as string,
    };
  }
};
