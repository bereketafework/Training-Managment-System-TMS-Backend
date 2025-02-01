const express = require("express");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");
const { eq, ilike, and, first } = require("drizzle-orm");
const router = express.Router();
router.use(express.json());
const { config } = require("dotenv");
const validateCourse = require("../validation/courseValidation");
const { Courses } = require("../db/courseSchema");

const { validate } = require("uuid");

config();
//create course and validate the inputs
router.post("/create", validateCourse, verifyToken, async (req, res) => {
  const coursedata = req.body;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;
  try {
    coursedata;
    const result = await db
      .insert(Courses)
      .values({ ...coursedata, Created_by: userid })
      .returning();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});
//update user information and display updated fields
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
      .from(Courses)
      .where(eq(Courses.id, UsersId));

    if (!existingArray || existingArray.length === 0) {
      return res.status(404).json({ error: "Courses not found" });
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
      .update(Courses)
      .set({
        ...filteredUpdatedData,
        Updated_by: userid,
        Updated_at: new Date(),
      })
      .where(eq(Courses.id, UsersId));

    // Respond with success message and updated fields
    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + " successfully updated", // Include the updated fields in the response
    });
  } catch (err) {
    console.error("Error updating Guest data:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// soft delete Courses
router.post("/delete/:id", verifyToken, async (req, res) => {
  const CourseId = req.params.id;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;
  try {
    const result = await db
      .update(Courses)
      .set({
        Is_deleted: true,
        Deleted_by: userid,
        Deleted_at: new Date(),
      })
      .where(eq(Courses.id, CourseId));
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(200).send("Successfully deleted");
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

//list of deleted Courses
router.get("/deleted", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select({
        Course_title: Courses.Course_title,
      })
      .from(Courses)
      .where(eq(Courses.Is_deleted, true))
      .orderBy(Courses.Course_title);
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});

//list of active Courses
router.get("/all", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select({
        Course_title: Courses.Course_title,
      })
      .from(Courses)
      .where(eq(Courses.Is_deleted, false))
      .orderBy(Courses.Course_title);
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});
//Search Active Course by id
router.get("/search/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .select({
        Course_title: Courses.Course_title,
        Course_objective: Courses.Course_objective,
        Prerequests: Courses.Prerequests,
      })
      .from(Courses)
      .where(and(eq(Courses.Is_deleted, false), eq(Courses.id, id)));
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;
