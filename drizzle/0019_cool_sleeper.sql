ALTER TABLE "Team_roles" RENAME COLUMN "Role" TO "Team_role";--> statement-breakpoint
ALTER TABLE "Team_roles" DROP CONSTRAINT "Team_roles_Role_unique";--> statement-breakpoint
ALTER TABLE "Team_roles" ADD CONSTRAINT "Team_roles_Team_role_unique" UNIQUE("Team_role");