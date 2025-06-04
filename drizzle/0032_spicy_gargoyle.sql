CREATE TABLE "User_role_Assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"User_id" uuid NOT NULL,
	"Role" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "User_role_Assignment_Role_unique" UNIQUE("Role")
);
--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;