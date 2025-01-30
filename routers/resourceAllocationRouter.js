const express = require("express");
const { hashPassword } = require("../validation/passHashing");

const { ResourceAllocation } = require("../db/resourceAllocationSchema");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");

const router = express.Router();
router.use(express.json());
const { config } = require("dotenv");
const validateResourceAllocation = require("../validation/resourceAllocationValidation");

config();

// create a new users also validate a users data and Check Token
router.post("/test", verifyToken, async (req, res) => {
  try {
    res.status(200).send("result");
  } catch (error) {
    console.error(error);
    res.status(500).send(err.message);
  }
});

// create a new users also validate a users data and Check Token
router.post(
  "/create",
  validateResourceAllocation,
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
        .insert(ResourceAllocation)
        .values({
          ...data,
          Created_by: userid,
        })
        .returning();
      if (result.length === 0) {
        return res.status(404).json({ message: "No data available" });
      }
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(err.message);
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
      .from(ResourceAllocation)
      .where(eq(ResourceAllocation.id, UsersId));

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
      .update(ResourceAllocation)
      .set({
        ...filteredUpdatedData,
        Updated_by: userid,
        Updated_at: new Date(),
      })
      .where(eq(ResourceAllocation.id, UsersId));

    // Respond with success message and updated fields
    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + " successfully updated", // Include the updated fields in the response
    });
  } catch (err) {
    console.error("Error updating Guest data:", err);
    res.status(500).send(err.message);
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
      .update(ResourceAllocation)
      .set({
        Is_deleted: true,
        Deleted_by: userid,
        Deleted_at: new Date(),
      })
      .where(eq(ResourceAllocation.id, Id));
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
    res.status(200).send("Successfully deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//list of deleted users
router.get("/deleted", verifyToken, async (req, res) => {
  try {
    const result = await db
      .select()
      .from(ResourceAllocation)
      .where(eq(ResourceAllocation.Is_deleted, true));
    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
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
      .select()
      .from(ResourceAllocation)
      .where(eq(ResourceAllocation.Is_deleted, false));

    if (result.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }
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
      .from(ResourceAllocation)
      .where(
        and(
          eq(ResourceAllocation.Is_deleted, false),
          eq(ResourceAllocation.id, id)
        )
      );
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
