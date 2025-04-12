ALTER TABLE "Certificates" RENAME COLUMN "Participant_id" TO "Training_id";--> statement-breakpoint
ALTER TABLE "Certificates" RENAME COLUMN "Name" TO "Title";--> statement-breakpoint
ALTER TABLE "Certificates" RENAME COLUMN "Text" TO "Description";--> statement-breakpoint
ALTER TABLE "Certificates" DROP CONSTRAINT "Certificates_Participant_id_Participants_id_fk";
--> statement-breakpoint
ALTER TABLE "Certificates" DROP CONSTRAINT "Certificates_Enrollment_id_Enrollments_id_fk";
--> statement-breakpoint
ALTER TABLE "Certificates" ALTER COLUMN "Expire_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Certificates" DROP COLUMN "Enrollment_id";