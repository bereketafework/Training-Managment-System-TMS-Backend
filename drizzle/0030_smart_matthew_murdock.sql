ALTER TABLE "User_roles" RENAME TO "User_role_Assignment";--> statement-breakpoint
ALTER TABLE "User_role_Assignment" DROP CONSTRAINT "User_roles_Role_unique";--> statement-breakpoint
ALTER TABLE "User_role_Assignment" DROP CONSTRAINT "User_roles_User_id_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "User_role_Assignment" DROP CONSTRAINT "User_roles_Updated_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "User_role_Assignment" DROP CONSTRAINT "User_roles_Deleted_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "User_role_Assignment" DROP CONSTRAINT "User_roles_Created_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_role_Assignment" ADD CONSTRAINT "User_role_Assignment_Role_unique" UNIQUE("Role");