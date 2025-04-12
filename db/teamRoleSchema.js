const { Teams } = require("./teamSchema");
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

const TeamRoles = pgTable("Team_roles", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  // Team_id: uuid()
  //   .notNull()
  //   .references(() => Teams.id),
  Team_role: varchar().unique().notNull(),
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

module.exports = { TeamRoles };
