CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"author" varchar(100) NOT NULL,
	"genre" varchar(100) NOT NULL,
	"total_copies" integer,
	"available_copies" integer,
	"cover" varchar(100) NOT NULL,
	"color" varchar(100) NOT NULL,
	"video" varchar(100) NOT NULL,
	"rating" integer,
	"description" text,
	"summary" text,
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
