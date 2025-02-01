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
CREATE TABLE "Trainings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Course_id" uuid NOT NULL,
	"Training_name" varchar NOT NULL,
	"Training_mode" varchar,
	"Training_location" varchar NOT NULL,
	"Training_start_date" date NOT NULL,
	"Training_end_date" date NOT NULL,
	"Enrolment_deadline" date NOT NULL,
	"Capacity" integer NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Created_by" uuid,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	CONSTRAINT "Trainings_Training_name_unique" UNIQUE("Training_name")
);
--> statement-breakpoint
CREATE TABLE "Participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"First_name" varchar NOT NULL,
	"Middle_name" varchar NOT NULL,
	"Last_name" varchar NOT NULL,
	"Email" varchar NOT NULL,
	"Phone" integer NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Participants_Email_unique" UNIQUE("Email"),
	CONSTRAINT "Participants_Phone_unique" UNIQUE("Phone")
);
--> statement-breakpoint
CREATE TABLE "Sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Training_id" uuid NOT NULL,
	"Duration" varchar NOT NULL,
	"Topic" varchar NOT NULL,
	"Session_start_date" date NOT NULL,
	"Session_end_date" date NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Session_id" uuid NOT NULL,
	"First_name" varchar NOT NULL,
	"Middle_name" varchar NOT NULL,
	"Last_name" varchar NOT NULL,
	"Qualification" varchar NOT NULL,
	"Phone" integer NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Guests_Phone_unique" UNIQUE("Phone")
);
--> statement-breakpoint
CREATE TABLE "Categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Categories_Name_unique" UNIQUE("Name")
);
--> statement-breakpoint
CREATE TABLE "Resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Category_id" uuid NOT NULL,
	"Name" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Resources_Name_unique" UNIQUE("Name")
);
--> statement-breakpoint
CREATE TABLE "Teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Training_id" uuid NOT NULL,
	"Name" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Teams_Name_unique" UNIQUE("Name")
);
--> statement-breakpoint
CREATE TABLE "User_Assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"User_id" uuid NOT NULL,
	"Team_id" uuid NOT NULL,
	"Session_id" uuid NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "Enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Participant_id" uuid NOT NULL,
	"Training_id" uuid NOT NULL,
	"Enrollment_date" date NOT NULL,
	"Complation_date" date NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Sponsors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Sponsors_Name_unique" UNIQUE("Name")
);
--> statement-breakpoint
CREATE TABLE "Payment_Methods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Methods" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Payment_Methods_Methods_unique" UNIQUE("Methods")
);
--> statement-breakpoint
CREATE TABLE "Payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Enrollment_id" uuid NOT NULL,
	"Training_id" uuid NOT NULL,
	"Method_id" uuid NOT NULL,
	"Participant_id" uuid NOT NULL,
	"Amount" double precision NOT NULL,
	"Status" varchar NOT NULL,
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
CREATE TABLE "Sponsorships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Sponsor_id" uuid NOT NULL,
	"Training_id" uuid NOT NULL,
	"Payment_id" uuid NOT NULL,
	"Participant_id" uuid NOT NULL,
	"Amount" double precision NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"User_id" uuid NOT NULL,
	"Role" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "User_roles_Role_unique" UNIQUE("Role")
);
--> statement-breakpoint
CREATE TABLE "Certificates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Participant_id" uuid NOT NULL,
	"Enrollment_id" uuid NOT NULL,
	"Name" varchar NOT NULL,
	"Text" varchar NOT NULL,
	"Issue_date" date NOT NULL,
	"Expire_date" date NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Allwoances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"User_id" uuid NOT NULL,
	"Training_id" uuid NOT NULL,
	"Amount" double precision NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Team_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"User_id" uuid NOT NULL,
	"Team_id" uuid NOT NULL,
	"Role" varchar NOT NULL,
	"Created_at" timestamp DEFAULT now(),
	"Updated_at" timestamp,
	"Deleted_at" timestamp,
	"Is_deleted" boolean DEFAULT false,
	"Updated_by" uuid,
	"Deleted_by" uuid,
	"Created_by" uuid NOT NULL,
	CONSTRAINT "Team_roles_Role_unique" UNIQUE("Role")
);
--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Course_id_Courses_id_fk" FOREIGN KEY ("Course_id") REFERENCES "public"."Courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_Category_id_Categories_id_fk" FOREIGN KEY ("Category_id") REFERENCES "public"."Categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Team_id_Teams_id_fk" FOREIGN KEY ("Team_id") REFERENCES "public"."Teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Assignments" ADD CONSTRAINT "User_Assignments_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Resource_id_Resources_id_fk" FOREIGN KEY ("Resource_id") REFERENCES "public"."Resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Resource_Allocation" ADD CONSTRAINT "Resource_Allocation_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Session_id_Sessions_id_fk" FOREIGN KEY ("Session_id") REFERENCES "public"."Sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payment_Methods" ADD CONSTRAINT "Payment_Methods_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payment_Methods" ADD CONSTRAINT "Payment_Methods_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payment_Methods" ADD CONSTRAINT "Payment_Methods_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Enrollment_id_Enrollments_id_fk" FOREIGN KEY ("Enrollment_id") REFERENCES "public"."Enrollments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Method_id_Payment_Methods_id_fk" FOREIGN KEY ("Method_id") REFERENCES "public"."Payment_Methods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Sponsor_id_Sponsors_id_fk" FOREIGN KEY ("Sponsor_id") REFERENCES "public"."Sponsors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Payment_id_Payments_id_fk" FOREIGN KEY ("Payment_id") REFERENCES "public"."Payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_roles" ADD CONSTRAINT "User_roles_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_roles" ADD CONSTRAINT "User_roles_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_roles" ADD CONSTRAINT "User_roles_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_roles" ADD CONSTRAINT "User_roles_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_Participant_id_Participants_id_fk" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_Enrollment_id_Enrollments_id_fk" FOREIGN KEY ("Enrollment_id") REFERENCES "public"."Enrollments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Allwoances" ADD CONSTRAINT "Allwoances_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Allwoances" ADD CONSTRAINT "Allwoances_Training_id_Trainings_id_fk" FOREIGN KEY ("Training_id") REFERENCES "public"."Trainings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Allwoances" ADD CONSTRAINT "Allwoances_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Allwoances" ADD CONSTRAINT "Allwoances_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Allwoances" ADD CONSTRAINT "Allwoances_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Team_roles" ADD CONSTRAINT "Team_roles_User_id_Users_id_fk" FOREIGN KEY ("User_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Team_roles" ADD CONSTRAINT "Team_roles_Team_id_Teams_id_fk" FOREIGN KEY ("Team_id") REFERENCES "public"."Teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Team_roles" ADD CONSTRAINT "Team_roles_Updated_by_Users_id_fk" FOREIGN KEY ("Updated_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Team_roles" ADD CONSTRAINT "Team_roles_Deleted_by_Users_id_fk" FOREIGN KEY ("Deleted_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Team_roles" ADD CONSTRAINT "Team_roles_Created_by_Users_id_fk" FOREIGN KEY ("Created_by") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;