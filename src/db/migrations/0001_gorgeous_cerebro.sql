CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "boards" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
