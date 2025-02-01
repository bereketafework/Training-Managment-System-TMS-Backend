const { Users } = require("./userSchema");
const { Enrollments } = require("./enrollmentSchema");
const { Trainings } = require("./trainingSchema");
const { PaymentMethod } = require("./paymentMethodSchema");
const { Participant } = require("./participantSchema");

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

const Payments = pgTable("Payments", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Enrollment_id: uuid()
    .notNull()
    .references(() => Enrollments.id),
  Training_id: uuid()
    .notNull()
    .references(() => Trainings.id),
  Method_id: uuid()
    .notNull()
    .references(() => PaymentMethod.id),
  Participant_id: uuid()
    .notNull()
    .references(() => Participant.id),
  Amount: doublePrecision().notNull(),
  Status: varchar().notNull(),
  Date: date().notNull(),
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

module.exports = { Payments };
