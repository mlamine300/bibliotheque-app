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
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);
export const usersTable = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
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
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
