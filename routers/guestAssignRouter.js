const express = require("express");

const { GuestAssign } = require("../db/guestAssignSchema");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");
const validateGuestAssign = require("../validation/guestAssignValidation");
const router = express.Router();

router.use(express.json());
const { config } = require("dotenv");
const { Trainings } = require("../db/trainingSchema");
const { Sessions } = require("../db/sessionSchema");
const { Guests } = require("../db/guestSchema");
const { Users } = require("../db/userSchema");

config();

// create a new users also validate a users data and Check Token
router.post(
  "/assignguest",
  validateGuestAssign,
  verifyToken,
  async (req, res) => {
    const data = req.body;
    const { user: idFromToken } = req;
    if (!idFromToken || !idFromToken.id) {
      return res.status(400).json({ error: "Invalid token data." });
    }
    const userid = idFromToken.id;
    try {
      const result = await db
        .insert(GuestAssign)
        .values({
          ...data,
          Created_by: userid,
        })
        .returning();
      // if (result.length === 0) {
      // //   return res.status(404).json({ message: "No data available" });
      // // }
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      if (error.code) {
        switch (error.code) {
          case "23505": // Unique violation
            res.status(400).json({ error: "Duplicate entry detected." });
            break;
          case "23503": // Foreign key violation
            res.status(400).json({ error: "Invalid foreign key reference." });
            break;
          case "23502": // Not null violation
            res.status(400).json({ error: "Missing required field." });
            break;
          default:
            res
              .status(500)
              .json({ error: "An unexpected database error occurred." });
        }
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  }
);

// soft delete of users
router.post("/delete/:id", verifyToken, async (req, res) => {
  const Id = req.params.id;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;

  try {
    const result = await db
      .update(GuestAssign)
      .set({
        Is_deleted: true,
        Deleted_by: userid,
        Deleted_at: new Date(),
      })
      .where(eq(GuestAssign.id, Id));
    // if (result.length === 0) {
    //   return res.status(404).json({ message: "No data available" });
    // }
    res.status(200).send("Successfully deleted");
  } catch (error) {
    if (error.code) {
      switch (error.code) {
        case "23505": // Unique violation
          res.status(400).json({ error: "Duplicate entry detected." });
          break;
        case "23503": // Foreign key violation
          res.status(400).json({ error: "Invalid foreign key reference." });
          break;
        case "23502": // Not null violation
          res.status(400).json({ error: "Missing required field." });
          break;
        default:
          res
            .status(500)
            .json({ error: "An unexpected database error occurred." });
      }
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

//list of deleted users
router.get("/deleted", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select()
      .from(GuestAssign)
      .where(eq(GuestAssign.Is_deleted, true));
    // if (result.length === 0) {
    //   return res.status(404).json({ message: "No data available" });
    // }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});

//list of active users
router.get("/allassignedguests", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select({
        ...GuestAssign,
        Training: Trainings,
        Guest: Guests,
      })
      .from(GuestAssign)
      .where(eq(GuestAssign.Is_deleted, false))
      .innerJoin(Trainings, eq(GuestAssign.Training_id, Trainings.id))
      .innerJoin(Guests, eq(GuestAssign.Guest_id, Guests.id));

    // if (result.length === 0) {
    //   return res.status(404).json({ message: "No data available" });
    // }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});
router.post("/selectedassignedguests", verifyToken, async (req, res) => {
  try {
    const { tid } = req.body;
    const result = await db
      .select({
        ...GuestAssign,
        Training: Trainings,
        Guest: Guests,
        Session: Sessions,
      })
      .from(GuestAssign)
      .where(
        and(eq(GuestAssign.Is_deleted, false), eq(GuestAssign.Training_id, tid))
      )
      .innerJoin(Trainings, eq(GuestAssign.Training_id, Trainings.id))
      .innerJoin(Guests, eq(GuestAssign.Guest_id, Guests.id))
      .innerJoin(Sessions, eq(GuestAssign.Sessions_id, Sessions.id));

    // if (result.length === 0) {
    //   return res.status(404).json({ message: "No data available" });
    // }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});
module.exports = router;
