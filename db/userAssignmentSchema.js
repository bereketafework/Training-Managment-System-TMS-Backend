// const { Users } = require("./userSchema");
// const { Sessions } = require("./sessionSchema");
// const { Teams } = require("./teamSchema");
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

// const UserAssignment = pgTable("User_Assignments", {
//   id: uuid().defaultRandom().primaryKey().notNull(),
//   User_id: uuid()
//     .notNull()
//     .references(() => Users.id),
//   Team_id: uuid()
//     .notNull()
//     .references(() => Teams.id),
//   Session_id: uuid()
//     .notNull()
//     .references(() => Sessions.id),

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

// module.exports = { UserAssignment };
