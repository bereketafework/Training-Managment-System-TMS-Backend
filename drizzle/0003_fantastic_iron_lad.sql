ALTER TABLE "Users" DROP CONSTRAINT "Users_Created_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "Created_by" DROP NOT NULL;