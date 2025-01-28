ALTER TABLE "Users" DROP CONSTRAINT "Users_Updated_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "Users_Deleted_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "Users_Created_by_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Is_deleted";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Updated_by";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Deleted_by";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Created_by";