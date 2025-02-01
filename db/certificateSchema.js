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
const { Participant } = require("./participantSchema");
const { Enrollments } = require("./enrollmentSchema");

const Certificate = pgTable("Certificates", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Participant_id: uuid()
    .notNull()
    .references(() => Participant.id),
  Enrollment_id: uuid()
    .notNull()
    .references(() => Enrollments.id),
  Name: varchar().notNull(),
  Text: varchar().notNull(),
  Issue_date: date().notNull(),
  Expire_date: date().notNull(),
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
