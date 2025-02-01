const { Users } = require("./userSchema");
const { Sponsors } = require("./sponsorSchema");
const { Trainings } = require("./trainingSchema");
const { Payments } = require("./paymentSchema");
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

const Sponsorships = pgTable("Sponsorships", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Sponsor_id: uuid()
    .notNull()
    .references(() => Sponsors.id),
  Training_id: uuid()
    .notNull()
    .references(() => Trainings.id),
  Payment_id: uuid()
    .notNull()
    .references(() => Payments.id),
  Participant_id: uuid()
    .notNull()
    .references(() => Participant.id),
  Amount: doublePrecision().notNull(),

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

module.exports = { Sponsorships };
