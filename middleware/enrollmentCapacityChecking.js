const { Trainings } = require("../db/trainingSchema");
const { Enrollments } = require("../db/enrollmentSchema");
const { eq, and, sql } = require("drizzle-orm");
const db = require("../db/index"); // Adjust the path as necessary

const checkEnrollmentCapacity = async (req, res, next) => {
  const { Training_id } = req.body; // Extract training ID from the request body

  if (!Training_id) {
    return res.status(400).json({ error: "Training ID is required." });
  }

  try {
    // Fetch the training's capacity
    const training = await db
      .select({
        id: Trainings.id,
        Capacity: Trainings.Capacity,
      })
      .from(Trainings)
      .where(eq(Trainings.id, Training_id))
      .limit(1);

    if (training.length === 0) {
      return res.status(404).json({ error: "Training not found." });
    }

    const { Capacity } = training[0];

    // Count the number of enrolled students
    const enrollmentCountResult = await db
      .select({
        count: sql`COUNT(*)`.as("count"), // Use SQL aggregation for counting
      })
      .from(Enrollments)
      .where(
        and(
          eq(Enrollments.Training_id, Training_id),
          eq(Enrollments.Is_deleted, false)
        )
      );

    const enrollmentCount = enrollmentCountResult[0].count;

    if (enrollmentCount >= Capacity) {
      return res.status(400).json({
        error: "Training is at full capacity.",
        message: `This training has reached its maximum capacity ${enrollmentCount}/${Capacity} participants.`,
      });
    }

    // If there is space, proceed to the next middleware
    // res.status(200).json({
    //   message: `The training with ID ${Training_id} is not full. Current enrollment: ${enrollmentCount}/${Capacity}.`,
    // });
    next();
  } catch (error) {
    console.error("Error checking enrollment capacity:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

module.exports = checkEnrollmentCapacity;
