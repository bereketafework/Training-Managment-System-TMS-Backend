CREATE TABLE "User_Assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"User_id" uuid NOT NULL,
	"Team_id" uuid NOT NULL,
	"Session_id" uuid NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Team_id_Teams_id_fk" FOREIGN KEY ("Team_id") REFERENCES "public"."Teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;