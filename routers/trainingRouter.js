const express = require("express");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");
const { Trainings } = require("../db/trainingSchema");
const { eq, ilike, and, first } = require("drizzle-orm");
const router = express.Router();
router.use(express.json());
const { config } = require("dotenv");
const validateTraining = require("../validation/trainingValidation");
const { validate } = require("uuid");
const { Courses } = require("../db/courseSchema");
const { Users } = require("../db/userSchema");
const { Sessions } = require("../db/sessionSchema");

config();

//create Training and validate the inputs
router.post("/create", validateTraining, verifyToken, async (req, res) => {
  const tdata = req.body;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;
  try {
    const result = await db
      .insert(Trainings)
      .values({ ...tdata, Created_by: userid })
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
});

//update Trainings information and display updated fields
router.post("/update/:id", verifyToken, async (req, res) => {
  const updatedTrainingData = req.body;
  const trainingId = req.params.id;
  const { user: idFromToken } = req;

  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }

  const userId = idFromToken.id;

  try {
    // Fetch the existing course data
    const existingTrainingArray = await db
      .select()
      .from(Trainings)
      .where(eq(Trainings.id, trainingId));

    // Ensure the course exists
    if (!existingTrainingArray || existingTrainingArray.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const existingTraining = existingTrainingArray[0]; // Extract the first (and only) result

    // Filter out only the data that has changed
    const filteredUpdatedData = {};
    Object.keys(updatedTrainingData).forEach((key) => {
      if (updatedTrainingData[key] !== existingTraining[key]) {
        filteredUpdatedData[key] = updatedTrainingData[key];
      }
    });

    // Check if there are any changes
    if (Object.keys(filteredUpdatedData).length === 0) {
      return res.status(200).json({ message: "No changes detected" });
    }

    // Perform the update with only the changed data
    const result = await db
      .update(Trainings)
      .set({
        ...filteredUpdatedData, // Only the changed fields
        Updated_by: userId,
        Updated_at: new Date(), // Track the update time
      })
      .where(eq(Trainings.id, trainingId));

    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + " Successfully updated",
    });
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

// soft delete Trainings
router.post("/delete/:id", verifyToken, async (req, res) => {
  const trainingid = req.params.id;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;
  try {
    const result = await db
      .update(Trainings)
      .set({
        Is_deleted: true,
        Deleted_by: userid,
        Deleted_at: new Date(),
      })
      .where(eq(Trainings.id, trainingid));

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

//list of deleted Trainings
router.get("/deleted", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select({ Training_name: Trainings.Training_name })
      .from(Trainings)
      .where(eq(Trainings.Is_deleted, true))
      .orderBy(Trainings.Training_name);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});

//list of active Trainings
router.get("/all", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select({
        ...Trainings,
        Courses: Courses,
      })
      .from(Trainings)
      .where(eq(Trainings.Is_deleted, false))
      .innerJoin(Courses, eq(Courses.id, Trainings.Course_id))
      .orderBy(Trainings.Training_name);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});
// Search Trainings in ID
router.get("/search/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .select({
        ...Trainings,
        Courses: Courses,
        CreatedBy: Users,
      })
      .from(Trainings)
      .where(and(eq(Trainings.Is_deleted, false), eq(Trainings.id, id)))
      .innerJoin(Users, eq(Users.id, Trainings.Created_by))

      .innerJoin(Courses, eq(Courses.id, Trainings.Course_id));

    res.status(201).json(result);
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

router.post("/select", verifyToken, async (req, res) => {
  const { tid } = req.body;
  try {
    const result = await db
      .select({
        ...Trainings,
        Courses: Courses,
        CreatedBy: Users,
      })
      .from(Trainings)
      .where(and(eq(Trainings.Is_deleted, false), eq(Trainings.id, tid)))
      .innerJoin(Users, eq(Users.id, Trainings.Created_by))
      .innerJoin(Courses, eq(Courses.id, Trainings.Course_id));

    res.status(201).json(result);
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

module.exports = router;
