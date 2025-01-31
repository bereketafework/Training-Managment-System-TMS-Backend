const { Users } = require("./userSchema");
const { Sessions } = require("./sessionSchema");
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

const Attendances = pgTable("Attendances", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Session_id: uuid()
    .notNull()
    .references(() => Sessions.id),
  Participant_id: uuid()
    .notNull()
    .references(() => Participant.id),
  Status: boolean(),
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

module.exports = { Attendances };
