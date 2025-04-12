ALTER TABLE "User_Assignments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "User_Assignments" CASCADE;--> statement-breakpoint
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_Name_unique";--> statement-breakpoint
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_Training_id_Trainings_id_fk";
--> statement-breakpoint
ALTER TABLE "Team_roles" DROP CONSTRAINT "Team_roles_User_id_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Team_roles" DROP CONSTRAINT "Team_roles_Team_id_Teams_id_fk";
--> statement-breakpoint
ALTER TABLE "Teams" ADD COLUMN "User_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Teams" ADD COLUMN "Session_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Teams" ADD COLUMN "Team_role_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_Team_role_id_Team_roles_id_fk" FOREIGN KEY ("Team_role_id") REFERENCES "public"."Team_roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" DROP COLUMN "Training_id";--> statement-breakpoint
ALTER TABLE "Teams" DROP COLUMN "Name";--> statement-breakpoint
ALTER TABLE "Team_roles" DROP COLUMN "User_id";--> statement-breakpoint
ALTER TABLE "Team_roles" DROP COLUMN "Team_id";