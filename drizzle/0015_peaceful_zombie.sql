CREATE TABLE "Guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Session_id" uuid NOT NULL,
	"First_name" varchar NOT NULL,
	"Middle_name" varchar NOT NULL,
	"Last_name" varchar NOT NULL,
	"Qualification" varchar NOT NULL,
	"Phone" integer NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Guests_Phone_unique" UNIQUE("Phone")
);
--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;