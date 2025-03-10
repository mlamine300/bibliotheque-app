import {
  integer,
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  date,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "DELETED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN", "SUPERADMIN"]);
export const BORROW_STATUS = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
  "LATE_RETOURN",
]);
export const usersTable = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: varchar("university_id", { length: 30 }).notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  userAvatar: text("userAvatar").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const bookTable = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  genre: varchar("genre", { length: 100 }).notNull(),
  total_copies: integer(),
  available_copies: integer(),
  cover: varchar("cover", { length: 300 }).notNull(),
  color: varchar("color", { length: 100 }).notNull(),
  video: varchar("video", { length: 300 }).notNull(),
  rating: real(),
  description: text("description"),
  summary: text("summary"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
  "LATE_RETOURN",
]);
export const borrowedBooksTable = pgTable("boorowed-books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  bookId: uuid("book-id")
    .references(() => bookTable.id)
    .notNull(),
  userId: uuid("user-id")
    .references(() => usersTable.id)
    .notNull(),
  borrowedDate: date("borrowed-date").notNull().defaultNow(),
  returnDate: date("return-date"),
  dueDate: date("DUE-date").notNull(),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
