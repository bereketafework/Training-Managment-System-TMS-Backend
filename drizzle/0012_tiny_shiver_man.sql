CREATE TABLE "GuestAssign" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Training_is" uuid,
	"Sessions_id" uuid,
	"Guest_id" uuid,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Training_is_Trainings_id_fk" FOREIGN KEY ("Training_is") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Sessions_id_Sessions_id_fk" FOREIGN KEY ("Sessions_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Guest_id_Users_id_fk" FOREIGN KEY ("Guest_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GuestAssign" ADD CONSTRAINT "GuestAssign_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;