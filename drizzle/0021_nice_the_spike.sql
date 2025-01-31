CREATE TABLE "Attendances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Session_id" uuid NOT NULL,
	"Participant_id" uuid NOT NULL,
	"Status" boolean,
	"Date" date NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;