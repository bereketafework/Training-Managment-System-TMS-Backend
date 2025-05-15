const express = require("express");
const { Enrollments } = require("../db/enrollmentSchema");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");

const router = express.Router();
router.use(express.json());
const { config } = require("dotenv");
const validateEnrollment = require("../validation/enrollmentValidation");
const { Participant } = require("../db/participantSchema");
const { Trainings } = require("../db/trainingSchema");
const { Users } = require("../db/userSchema");
const checkEnrollmentCapacity = require("../middleware/enrollmentCapacityChecking");

config();
router.post("/test", checkEnrollmentCapacity, verifyToken, async (req, res) => {
  const { tid } = req.body;
});

router.post("/select", verifyToken, async (req, res) => {
  const { tid } = req.body;

  try {
    const result = await db
      .select({
        id: Enrollments.id,
        Participant_id: Enrollments.Participant_id,
        Participant: { ...Participant },
        Training_id: Enrollments.Training_id,
        Training: { ...Trainings },
        Created_at: Enrollments.Created_at,
        Created_by: Enrollments.Created_by,
        CreatedBy: { ...Users },
        Updated_at: Enrollments.Updated_at,
        Updated_by: Enrollments.Updated_by,
        Is_deleted: Enrollments.Is_deleted,
        Deleted_at: Enrollments.Deleted_at,
        Deleted_by: Enrollments.Deleted_by,
      })
      .from(Enrollments)
      .innerJoin(Participant, eq(Participant.id, Enrollments.Participant_id))
      .innerJoin(Trainings, eq(Trainings.id, Enrollments.Training_id))
      .innerJoin(Users, eq(Users.id, Enrollments.Created_by))
      .where(
        and(eq(Enrollments.Is_deleted, false), eq(Enrollments.Training_id, tid))
      );
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
});

// create a new users also validate a users data and Check Token
router.post(
  "/create",
  checkEnrollmentCapacity,
  validateEnrollment,
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
        .insert(Enrollments)
        .values({
          ...data,
          Created_by: userid,
        })
        .returning();

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

// update user Information by user id
router.post("/update/:id", verifyToken, async (req, res) => {
  const updatedData = req.body; // Incoming user data
  const UsersId = req.params.id; // User ID from the route
  const { user: idFromToken } = req; // User info from token

  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }

  const userid = idFromToken.id;

  try {
    // Fetch the existing user data
    const existingArray = await db
      .select()
      .from(Enrollments)
      .where(eq(Enrollments.id, UsersId));

    if (!existingArray || existingArray.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    const Is_existing = existingArray[0];

    // Filter updated data to only include fields that are actually changed (excluding password)
    const filteredUpdatedData = {};
    Object.keys(updatedData).forEach((key) => {
      if (key === "password") return; // Ignore password updates
      if (updatedData[key] !== Is_existing[key]) {
        filteredUpdatedData[key] = updatedData[key];
      }
    });

    // If no fields have changed, return early
    if (Object.keys(filteredUpdatedData).length === 0) {
      return res.status(200).json({ message: "No changes detected" });
    }

    // Perform the update
    await db
      .update(Enrollments)
      .set({
        ...filteredUpdatedData,
        Updated_by: userid,
        Updated_at: new Date(),
      })
      .where(eq(Enrollments.id, UsersId));

    // Respond with success message and updated fields
    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + " successfully updated", // Include the updated fields in the response
    });
  } catch (error) {
    console.error("Error updating Guest data:", err);
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

// soft delete of users
router.post("/delete/:id", verifyToken, async (req, res) => {
  const Id = req.params.id;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;

  if (userid === Id) {
    return res.status(400).json({ error: "You cannot delete yourself." });
  }

  try {
    const result = await db
      .update(Enrollments)
      .set({
        Is_deleted: true,
        Deleted_by: userid,
        Deleted_at: new Date(),
      })
      .where(eq(Enrollments.id, Id));

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
      .from(Enrollments)
      .where(eq(Enrollments.Is_deleted, true));

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});

//list of active users
router.get("/all", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select({
        id: Enrollments.id,
        Participant_id: Enrollments.Participant_id,
        Participant: { ...Participant },
        Training_id: Enrollments.Training_id,
        Training: { ...Trainings },
        Created_at: Enrollments.Created_at,
        Created_by: Enrollments.Created_by,
        CreatedBy: { ...Users },
        Updated_at: Enrollments.Updated_at,
        Updated_by: Enrollments.Updated_by,
        Is_deleted: Enrollments.Is_deleted,
        Deleted_at: Enrollments.Deleted_at,
        Deleted_by: Enrollments.Deleted_by,
      })
      .from(Enrollments)
      .innerJoin(Participant, eq(Participant.id, Enrollments.Participant_id))
      .innerJoin(Trainings, eq(Trainings.id, Enrollments.Training_id))
      .innerJoin(Users, eq(Users.id, Enrollments.Created_by))
      .where(eq(Enrollments.Is_deleted, false));

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});

//search a users full information in db
router.get("/search/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .select()
      .from(Enrollments)
      .where(and(eq(Enrollments.Is_deleted, false), eq(Enrollments.id, id)));

    res.status(201).json(result);
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
});

module.exports = router;
