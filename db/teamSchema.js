const { Users } = require("./userSchema");
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

const Teams = pgTable("Teams", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Training_id: uuid()
    .notNull()
    .references(() => Trainings.id),
  Name: varchar().unique().notNull(),
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

module.exports = { Teams };
