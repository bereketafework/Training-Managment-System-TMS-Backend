CREATE TABLE "Enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Participant_id" uuid NOT NULL,
	"Training_id" uuid NOT NULL,
	"Enrollment_date" date NOT NULL,
	"Compation_Date" date NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;