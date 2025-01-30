CREATE TABLE "Resource_Allocation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Resource_id" uuid NOT NULL,
	"Session_id" uuid NOT NULL,
	"Quantity" integer NOT NULL,
	"Single_amount" double precision NOT NULL,
	"Provider" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Resource_id_Resources_id_fk" FOREIGN KEY ("Resource_id") REFERENCES "public"."Resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;