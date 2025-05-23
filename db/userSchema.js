const {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  uuid,
} = require("drizzle-orm/pg-core");

const Users = pgTable("Users", {
  id: uuid().defaultRandom().primaryKey(),
  First_name: varchar().notNull(),
  Middle_name: varchar().notNull(),
  Last_name: varchar().notNull(),
  Username: varchar().unique().notNull(),
  Password: varchar().notNull(),
  Company: varchar().notNull(),
  Email: varchar().unique().notNull(),
  Phone: integer().unique().notNull(),
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

module.exports = { Users };
