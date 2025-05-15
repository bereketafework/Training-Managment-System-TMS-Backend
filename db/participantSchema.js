const { Users } = require("./userSchema");
const {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  uuid,
} = require("drizzle-orm/pg-core");

const Participant = pgTable("Participants", {
  id: uuid().defaultRandom().primaryKey(),
  First_name: varchar().notNull(),
  Middle_name: varchar().notNull(),
  Last_name: varchar().notNull(),
  Email: varchar().unique().notNull(),
  Phone: integer().unique().notNull(),
  Gender: varchar(10).notNull(),
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

module.exports = { Participant };
