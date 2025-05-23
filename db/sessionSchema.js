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
  time,
} = require("drizzle-orm/pg-core");

const Sessions = pgTable("Sessions", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Training_id: uuid()
    .notNull()
    .references(() => Trainings.id),

  Topic: varchar().notNull(),
  Session_start_date: timestamp().notNull(),
  Session_end_date: timestamp().notNull(),
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

module.exports = { Sessions };
