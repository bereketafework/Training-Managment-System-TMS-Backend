const { Users } = require("./userSchema");
const { Participant } = require("./participantSchema");
const { Trainings } = require("./trainingSchema");
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

const Enrollments = pgTable("Enrollments", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Participant_id: uuid()
    .notNull()
    .references(() => Participant.id),
  Training_id: uuid()
    .notNull()
    .references(() => Trainings.id),
  Enrollment_date: date().notNull(),
  Complation_date: date().notNull(),
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

module.exports = { Enrollments };
