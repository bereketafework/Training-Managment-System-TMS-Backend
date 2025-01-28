CREATE TABLE "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"First_name" varchar NOT NULL,
	"Middle_name" varchar NOT NULL,
	"Last_name" varchar NOT NULL,
	"Username" varchar NOT NULL,
	"Password" varchar NOT NULL,
	"Company" varchar NOT NULL,
	"Email" varchar NOT NULL,
	"Phone" integer NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Users_Username_unique" UNIQUE("Username"),
	CONSTRAINT "Users_Email_unique" UNIQUE("Email"),
	CONSTRAINT "Users_Phone_unique" UNIQUE("Phone")
);
--> statement-breakpoint
CREATE TABLE "Courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Course_title" varchar NOT NULL,
	"Prerequests" varchar,
	"Course_description" varchar NOT NULL,
	"Course_objective" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Courses_Course_title_unique" UNIQUE("Course_title"),
	CONSTRAINT "Courses_Course_objective_unique" UNIQUE("Course_objective")
);
--> statement-breakpoint
CREATE TABLE "Trainigs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Course_id" uuid,
	"Trainig_mode" varchar,
	"Training_location" varchar NOT NULL,
	"Trainig_name" varchar NOT NULL,
	"Trainig_start_date" date NOT NULL,
	"Trainig_end_date" date NOT NULL,
	"Enrolment_deadline" date NOT NULL,
	"Capacity" integer NOT NULL,
	"Cost" double precision NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Trainigs_Trainig_name_unique" UNIQUE("Trainig_name")
);
--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainigs" ADD CONSTRAINT "Trainigs_Course_id_Courses_id_fk" FOREIGN KEY ("Course_id") REFERENCES "public"."Courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainigs" ADD CONSTRAINT "Trainigs_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainigs" ADD CONSTRAINT "Trainigs_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainigs" ADD CONSTRAINT "Trainigs_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;