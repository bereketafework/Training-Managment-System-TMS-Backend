ALTER TABLE "Trainigs" RENAME TO "Trainings";--> statement-breakpoint
ALTER TABLE "Trainings" RENAME COLUMN "Trainig_name" TO "Training_name";--> statement-breakpoint
ALTER TABLE "Trainings" RENAME COLUMN "Trainig_mode" TO "Training_mode";--> statement-breakpoint
ALTER TABLE "Trainings" RENAME COLUMN "Trainig_start_date" TO "Training_start_date";--> statement-breakpoint
ALTER TABLE "Trainings" RENAME COLUMN "Trainig_end_date" TO "Training_end_date";--> statement-breakpoint
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainigs_Trainig_name_unique";--> statement-breakpoint
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainigs_Course_id_Courses_id_fk";
--> statement-breakpoint
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainigs_Updated_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainigs_Deleted_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainigs_Created_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Course_id_Courses_id_fk" FOREIGN KEY ("Course_id") REFERENCES "public"."Courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Training_name_unique" UNIQUE("Training_name");