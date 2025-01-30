const { Users } = require("./userSchema");
const { Sessions } = require("./sessionSchema");
const { Resources } = require("./resourceSchema");
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

const ResourceAllocation = pgTable("Resource_Allocation", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Resource_id: uuid()
    .notNull()
    .references(() => Resources.id),
  Session_id: uuid()
    .notNull()
    .references(() => Sessions.id),
  Quantity: integer().notNull(),
  Single_amount: doublePrecision().notNull(),
  Provider: varchar().notNull(),
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

module.exports = { ResourceAllocation };
