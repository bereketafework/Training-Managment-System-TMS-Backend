CREATE TABLE "Sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Sponsors_Name_unique" UNIQUE("Name")
);
--> statement-breakpoint
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;