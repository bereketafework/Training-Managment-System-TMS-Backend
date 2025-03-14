// Desc: Schema for Guests table
const { Sessions } = require("./sessionSchema");
const { Users } = require("./userSchema");
const { Trainings } = require("./trainingSchema");
const { Guests } = require("./guestSchema");
const {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  uuid,
} = require("drizzle-orm/pg-core");
const GuestAssign = pgTable("GuestAssign", {
  id: uuid().defaultRandom().primaryKey(),
  Training_id: uuid().references(() => Trainings.id),
  Sessions_id: uuid().references(() => Sessions.id),
  Guest_id: uuid().references(() => Guests.id),
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

module.exports = { GuestAssign };
