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
    res.status(500).send(error);
  }
});
//update user information and display updated fields
router.post("/update/:id", verifyToken, async (req, res) => {
  const updatedCourseData = req.body;
  const courseId = req.params.id;
  const { user: idFromToken } = req;

  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }

  const userId = idFromToken.id;

  try {
    // Fetch the existing course data
    const existingCourseArray = await db
      .select()
      .from(Courses)
      .where(eq(Courses.id, courseId));

    // Ensure the course exists
    if (!existingCourseArray || existingCourseArray.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const existingCourse = existingCourseArray[0]; // Extract the first (and only) result

    // Filter out only the data that has changed
    const filteredUpdatedData = {};
    Object.keys(updatedCourseData).forEach((key) => {
      if (updatedCourseData[key] !== existingCourse[key]) {
        filteredUpdatedData[key] = updatedCourseData[key];
      }
    });

    // Check if there are any changes
    if (Object.keys(filteredUpdatedData).length === 0) {
      return res.status(200).json({ message: "No changes detected" });
    }

    // Perform the update with only the changed data
    const result = await db
      .update(Courses)
      .set({
        ...filteredUpdatedData, // Only the changed fields
        Updated_by: userId,
        Updated_at: new Date(), // Track the update time
      })
      .where(eq(Courses.id, courseId));

    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + "Successfully updated", // Only the changed fields
    });
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).send(err.message);
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
      .select()
      .from(Courses)
      .where(and(eq(Courses.Is_deleted, false), eq(Courses.id, id)));
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error + "");
  }
});

module.exports = router;
