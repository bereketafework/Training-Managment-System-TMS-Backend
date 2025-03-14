ALTER TABLE "Sessions" RENAME COLUMN "Duration" TO "Session_start_time";--> statement-breakpoint
ALTER TABLE "Sessions" ADD COLUMN "Session_end_time" time NOT NULL;