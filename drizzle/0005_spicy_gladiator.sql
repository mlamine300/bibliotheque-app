CREATE TABLE "boorowed-books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book-id" uuid NOT NULL,
	"user-id" uuid NOT NULL,
	"borrowed-date" date DEFAULT now() NOT NULL,
	"return-date" date,
	"DUE-date" date NOT NULL,
	"status" "borrow_status" DEFAULT 'BORROWED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "boorowed-books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "boorowed-books" ADD CONSTRAINT "boorowed-books_book-id_books_id_fk" FOREIGN KEY ("book-id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "boorowed-books" ADD CONSTRAINT "boorowed-books_user-id_users_id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;