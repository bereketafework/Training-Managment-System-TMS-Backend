ALTER TABLE "Guests" DROP CONSTRAINT "Guests_Session_id_Sessions_id_fk";
--> statement-breakpoint
ALTER TABLE "Guests" DROP COLUMN "Session_id";