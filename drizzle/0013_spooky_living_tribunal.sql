ALTER TABLE "GuestAssign" RENAME COLUMN "Training_is" TO "Training_id";--> statement-breakpoint
ALTER TABLE "GuestAssign" DROP CONSTRAINT "GuestAssign_Training_is_Trainings_id_fk";
--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;