ALTER TABLE "Users" ADD COLUMN "Is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "Updated_by" uuid;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "Deleted_by" uuid;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "Created_by" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;