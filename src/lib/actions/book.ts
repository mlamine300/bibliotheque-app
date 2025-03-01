/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import { bookTable, borrowedBooksTable, usersTable } from "@/db/schema";
import { book, borrowedBook, userInfo } from "@/index";
import { and, count, eq, inArray, like, not, or } from "drizzle-orm";
import { checkAdminPermission } from "./user";

type uploadedBook = Omit<book, "id">;
interface BookActionResponse<T> {
  success: boolean;
  data?: { books: T; count: number };
  error?: string;
}

export const updateBook: (
  book: book
) => Promise<BookActionResponse<book[]>> = async (book) => {
  try {
    const isItAdmin = await checkAdminPermission();
    if (!isItAdmin.success)
      return {
        success: false,
        error: isItAdmin.error,
      };
    const b = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.title, book.title));
    if (!b || b.length < 1)
      return {
        success: false,
        error: "there is no book with such id to update",
      };
    const createdAt = book.createdAt ? new Date() : new Date();
    const returnedBook = (await db
      .update(bookTable)
      .set({
        ...book,
        createdAt: createdAt,
        summary: book.summary.replaceAll("\n", "|n|"),
        description: book.description.replaceAll("\n", "|n|"),
      })
      .where(eq(bookTable.id, book.id))

      .returning()) as book[];
    return {
      success: true,
      error: `book "${book.title}" added successufely!`,
      data: { count: 1, books: returnedBook },
    };
  } catch (error) {
    console.log("Error updating book ", error);
    return {
      success: false,
      error: "Error updating book " + error,
    };
  }
};

export const addBook: (
  book: uploadedBook
) => Promise<BookActionResponse<book[]>> = async (book) => {
  try {
    const isItAdmin = await checkAdminPermission();
    if (!isItAdmin.success)
      return {
        success: false,
        error: isItAdmin.error,
      };
    const b = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.title, book.title));
    if (b && b.length > 0)
      return {
        success: false,
        error: "Book already exist please check the title again",
      };
    const returnedBook = (await db
      .insert(bookTable)
      .values({
        ...book,
        createdAt: book.createdAt as Date,
        available_copies: book.total_copies,
        summary: book.summary.replaceAll("\n", "|n|"),
        description: book.description.replaceAll("\n", "|n|"),
      })
      .returning()) as book[];
    return {
      success: true,
      error: `book "${book.title}" added successufely!`,
      data: { count: 1, books: returnedBook },
    };
  } catch (error) {
    console.log("Error adding book ", error);
    return {
      success: false,
      error: "Error adding book " + error,
    };
  }
};

export const getLastBooks: (
  offset?: number,
  limit?: number
) => Promise<BookActionResponse<book[]>> = async (offset, limit) => {
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

export const getBookById: (
  id: string
) => Promise<BookActionResponse<book[]>> = async (id) => {
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
) => Promise<BookActionResponse<book[]>> = async (genre, id, limit) => {
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
) => Promise<BookActionResponse<book[]>> = async (search, offset, limit) => {
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

export const deleteBook: (
  id: string
) => Promise<BookActionResponse<book>> = async (id) => {
  try {
    const checkAdmin = await checkAdminPermission();
    if (!checkAdmin.success)
      return {
        success: false,
        error: checkAdmin.error,
      };
    //check if the book is borrowed
    const resp = await db
      .select()
      .from(borrowedBooksTable)
      .where(eq(borrowedBooksTable.bookId, id));
    if (resp?.length > 0)
      return {
        success: false,
        error: "This book is borrowed you can't delete it",
      };

    await db.delete(bookTable).where(eq(bookTable.id, id));
    return {
      success: true,
    };
  } catch (error) {
    console.log("Error deleting book", error);
    return {
      success: false,
      error: "Error deleting book, " + error,
    };
  }
};

export const borrowBook: (
  b: string
) => Promise<BookActionResponse<book[]>> = async (bookId) => {
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

export const getAllBorrowedBooks: (params?: {
  offset: number;
  limit: number;
}) => Promise<BookActionResponse<borrowedBook[]>> = async (params) => {
  const offset = params?.offset || 0;
  const limit = params?.limit || 8;
  try {
    const checkIfAdmin = await checkAdminPermission();
    if (!checkIfAdmin.success)
      return {
        success: false,
        error: checkIfAdmin.error,
      };
    const res = await db
      .select({ bookId: borrowedBooksTable.bookId })
      .from(borrowedBooksTable)
      .orderBy(borrowedBooksTable.createdAt);
    if (!res || res.length < 1)
      return {
        success: true,
        data: { books: [] as borrowedBook[], count: 0 },
      };
    const bookIDs = res.map((r) => r.bookId);

    const booksResp = await db
      .select()
      .from(bookTable)
      .where(inArray(bookTable.id, bookIDs))
      .innerJoin(
        borrowedBooksTable,

        eq(borrowedBooksTable.bookId, bookTable.id)
      )
      .innerJoin(usersTable, eq(borrowedBooksTable.userId, usersTable.id))
      .offset(offset)
      .limit(limit);
    // console.log(booksResp);
    const books = booksResp.map((br) => {
      return {
        book: br.books as book,
        user: br.users as userInfo,
        id: br["boorowed-books"].id as string,
        borrowedDate: br["boorowed-books"].borrowedDate as string,
        returnDate: br["boorowed-books"].returnDate as string,
        dueDate: br["boorowed-books"].dueDate as string,
        status: br["boorowed-books"].status as string,
        createdAt: br["boorowed-books"].createdAt,
      };
    });
    // console.log(books);
    return {
      success: true,
      data: { books: books as borrowedBook[], count: bookIDs.length },
    };
  } catch (error) {
    console.log("error getting berrowed books : ", error);
    return {
      success: false,
      error: error as string,
    };
  }
};

export const getBorrowedBooks: (params?: {
  offset: number;
  limit: number;
}) => Promise<BookActionResponse<borrowedBook[]>> = async (data) => {
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
        data: { books: [] as borrowedBook[], count: 0 },
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
      .innerJoin(usersTable, eq(borrowedBooksTable.userId, usersTable.id))
      .offset(offset)
      .limit(limit);
    //console.log(booksResp);
    const books = booksResp.map((br) => {
      return {
        book: br.books as book,
        user: br.users as userInfo,
        id: br["boorowed-books"].id as string,
        borrowedDate: br["boorowed-books"].id as string,
        returnDate: br["boorowed-books"].returnDate as string,
        dueDate: br["boorowed-books"].dueDate as string,
        status: br["boorowed-books"].status as string,
        createdAt: br["boorowed-books"].createdAt,
      };
    });
    // console.log(books);
    return {
      success: true,
      data: { books: books as borrowedBook[], count: bookIDs.length },
    };
  } catch (error) {
    console.log("error getting berrowed books : ", error);
    return {
      success: false,
      error: error as string,
    };
  }
};

export const updateBorrowBookStatus: (
  id: string,
  status: "BORROWED" | "RETURNED" | "LATE_RETOURN"
) => Promise<BookActionResponse<borrowedBook>> = async (id, s) => {
  try {
    const isAdmi = await checkAdminPermission();
    if (!isAdmi.success)
      return {
        success: false,
        error: isAdmi.error,
      };
    await db
      .update(borrowedBooksTable)
      .set({ status: s })
      .where(eq(borrowedBooksTable.id, id));

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Error Updating Book status " + error,
    };
  }
};
