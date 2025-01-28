ALTER TABLE "Users" ALTER COLUMN "Updated_by" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "Deleted_by" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "Created_by" SET DATA TYPE uuid;