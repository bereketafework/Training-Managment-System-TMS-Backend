const { Users } = require("./userSchema");

const {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  uuid,
  date,
  doublePrecision,
} = require("drizzle-orm/pg-core");

const { Enrollments } = require("./enrollmentSchema");
const { Trainings } = require("./trainingSchema");

const Certificate = pgTable("Certificates", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Training_id: uuid()
    .notNull()
    .references(() => Trainings.id),
  // Enrollment_id: uuid()
  //   .notNull()
  //   .references(() => Enrollments.id),
  Title: varchar().notNull(),
  Description: varchar().notNull(),
  Issue_date: date().notNull(),
  Expire_date: date(),
  Created_at: timestamp().defaultNow(),
  Updated_at: timestamp(),
  Deleted_at: timestamp(),
  Is_deleted: boolean().default(false),
  Updated_by: uuid().references(() => Users.id),
  Deleted_by: uuid().references(() => Users.id),
  Created_by: uuid()
    .notNull()
    .references(() => Users.id),
});

module.exports = { Certificate };
