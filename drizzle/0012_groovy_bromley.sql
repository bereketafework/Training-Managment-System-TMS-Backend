CREATE TABLE "Sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Training_id" uuid NOT NULL,
	"Duration" varchar NOT NULL,
	"Topic" varchar NOT NULL,
	"Session_start_date" date NOT NULL,
	"Session_end_date" date NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Sessions_Duration_unique" UNIQUE("Duration")
);
--> statement-breakpoint
ALTER TABLE "Trainings" ALTER COLUMN "Course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;