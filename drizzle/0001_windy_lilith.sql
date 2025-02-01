ALTER TABLE "Users" DROP CONSTRAINT "Users_Created_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Created_by";