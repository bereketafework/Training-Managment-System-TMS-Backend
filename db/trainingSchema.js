// const { Users } = require("./userSchema");
// const { Courses } = require("./courseSchema");
// const {
//   integer,
//   pgTable,
//   varchar,
//   timestamp,
//   boolean,
//   uuid,
//   date,
//   doublePrecision,
// } = require("drizzle-orm/pg-core");

// const Trainings = pgTable("Trainings", {
//   id: uuid().defaultRandom().primaryKey().notNull(),
//   Course_id: uuid()
//     .notNull()
//     .references(() => Courses.id),
//   Training_name: varchar().unique().notNull(),
//   Training_mode: varchar(),
//   Training_location: varchar().notNull(),

//   Training_start_date: date().notNull(),
//   Training_end_date: date().notNull(),
//   Enrolment_deadline: date().notNull(),
//   Capacity: integer().notNull(),
//   Cost: doublePrecision().notNull(),
//   Created_at: timestamp().defaultNow(),
//   Updated_at: timestamp(),
//   Deleted_at: timestamp(),
//   Is_deleted: boolean().default(false),
//   Updated_by: uuid().references(() => Users.id),
//   Deleted_by: uuid().references(() => Users.id),
//   Created_by: uuid()
//     .notNull()
//     .references(() => Users.id),
// });

// module.exports = { Trainings };

// filepath: /c:/Users/Beki/Documents/Projects/Tms-Backend/db/trainingSchema.js
const { Users } = require("./userSchema");
const { Courses } = require("./courseSchema");
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

const Trainings = pgTable("Trainings", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  Course_id: uuid()
    .notNull()
    .references(() => Courses.id),
  Training_name: varchar().unique().notNull(),
  Training_mode: varchar(),
  Training_location: varchar().notNull(),
  Training_start_date: date().notNull(),
  Training_end_date: date().notNull(),
  Enrolment_deadline: date().notNull(),
  Capacity: integer().notNull(),
  Price: doublePrecision().notNull(),
  Created_at: timestamp().defaultNow(),
  Updated_at: timestamp(),
  Deleted_at: timestamp(),
  Is_deleted: boolean().default(false),
  Created_by: uuid().references(() => Users.id),
  Updated_by: uuid().references(() => Users.id),
  Deleted_by: uuid().references(() => Users.id),
});

module.exports = { Trainings };
