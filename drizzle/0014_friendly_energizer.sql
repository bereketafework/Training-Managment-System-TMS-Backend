ALTER TABLE "GuestAssign" DROP CONSTRAINT "GuestAssign_Guest_id_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Guest_id_Guests_id_fk" FOREIGN KEY ("Guest_id") REFERENCES "public"."Guests"("id") ON DELETE no action ON UPDATE no action;