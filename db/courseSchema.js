const { Users } = require("./userSchema");
const {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  uuid,
} = require("drizzle-orm/pg-core");

const Courses = pgTable("Courses", {
  id: uuid().defaultRandom().primaryKey(),
  Course_title: varchar().notNull().unique(),
  Prerequests: varchar(),
  Course_description: varchar().notNull(),
  Course_objective: varchar().unique().notNull(),
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

module.exports = { Courses };
