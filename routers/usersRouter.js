const express = require("express");
const { hashPassword } = require("../validation/passHashing");
const validateUser = require("../validation/userValidation");
const { Users } = require("../db/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");

const router = express.Router();
router.use(express.json());
const { config } = require("dotenv");
const { timestamp } = require("drizzle-orm/mysql-core");

config();

// create a new users also validate a users data and Check Token
router.post("/create", validateUser, verifyToken, async (req, res) => {
  const userdata = req.body;
  const { Password } = userdata;
  const hashedPassword = await hashPassword(Password);
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;
  try {
    const result = await db
      .insert(Users)
      .values({ ...userdata, Password: hashedPassword, Created_by: userid })
      .returning();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// login a user and checking users information and also Sign a Token
router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const userExists = await db
      .select()
      .from(Users)
      .where(and(ilike(Users.Username, Username), eq(Users.Is_deleted, false)));

    if (userExists.length === 0) {
      return res
        .status(401)
        .json({ error: "User not found or has been deleted" });
    }

    const user = userExists[0];
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, Username }, "tms", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});
// update user Information by user id
router.post("/update/:id", verifyToken, async (req, res) => {
  const updatedUserData = req.body; // Incoming user data
  const UsersId = req.params.id; // User ID from the route
  const { user: idFromToken } = req; // User info from token

  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }

  const userid = idFromToken.id;

  try {
    // Fetch the existing user data
    const existingUserArray = await db
      .select()
      .from(Users)
      .where(eq(Users.id, UsersId));

    if (!existingUserArray || existingUserArray.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUser = existingUserArray[0];

    // Filter updated data to only include fields that are actually changed (excluding password)
    const filteredUpdatedData = {};
    Object.keys(updatedUserData).forEach((key) => {
      if (key === "password") return; // Ignore password updates
      if (updatedUserData[key] !== existingUser[key]) {
        filteredUpdatedData[key] = updatedUserData[key];
      }
    });

    // If no fields have changed, return early
    if (Object.keys(filteredUpdatedData).length === 0) {
      return res.status(200).json({ message: "No changes detected" });
    }

    // Perform the update
    await db
      .update(Users)
      .set({
        ...filteredUpdatedData,
        Updated_by: userid,
        Updated_at: new Date(),
      })
      .where(eq(Users.id, UsersId));

    // Respond with success message and updated fields
    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + " successfully updated", // Include the updated fields in the response
    });
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).send(err.message);
  }
});

// soft delete of users
router.post("/delete/:id", verifyToken, async (req, res) => {
  const UsersId = req.params.id;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;

  if (userid === UsersId) {
    return res.status(400).json({ error: "You cannot delete yourself." });
  }

  try {
    const result = await db
      .update(Users)
      .set({
        Is_deleted: true,
        Deleted_by: userid,
        Deleted_at: new Date(),
      })
      .where(eq(Users.id, UsersId));
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
      .select({
        First_name: Users.First_name,
        Middle_name: Users.Middle_name,
        Last_name: Users.Last_name,
      })
      .from(Users)
      .where(eq(Users.Is_deleted, true))
      .orderBy(Users.First_name, Users.Middle_name, Users.Last_name);
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
      .select({
        First_name: Users.First_name,
        Middle_name: Users.Middle_name,
        Last_name: Users.Last_name,
        Usersname: Users.Username,
      })
      .from(Users)
      .where(eq(Users.Is_deleted, false))
      .orderBy(Users.First_name, Users.Middle_name, Users.Last_name);
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
      .from(Users)
      .where(and(eq(Users.Is_deleted, false), eq(Users.id, id)));
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
