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
    if (error.code) {
      switch (error.code) {
        case "23505": // Unique violation
          res.status(400).json({ error: "Duplicate entry detected." });
          break;
        case "23503": // Foreign key violation
          res.status(400).json({ error: "Invalid foreign key reference." });
          break;
        case "22003": // out of range for type integer
          res.status(400).json({ error: "Invalid Phone Number." });
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
// login a user and checking users information and also Sign a Token
router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const userExists = await db
      .select()
      .from(Users)
      .where(and(ilike(Users.Username, Username), eq(Users.Is_deleted, false)));

    if (userExists.length === 0) {
      return res.status(401).json({
        error:
          "Invalid Username or Password,Plese Check Your Credentials and Try Again",
      });
    }

    const user = userExists[0];
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error:
          "Invalid Username or Password,Plese Check Your Credentials and Try Again",
      });
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

    const filteredUpdatedData = {};
    Object.keys(updatedUserData).forEach((key) => {
      if (key === "password") return; // Ignore password updates
      if (updatedUserData[key] !== existingUser[key]) {
        filteredUpdatedData[key] = updatedUserData[key];
      }
    });

    if (Object.keys(filteredUpdatedData).length === 0) {
      return res.status(200).json({ message: "No changes detected" });
    }

    await db
      .update(Users)
      .set({
        ...filteredUpdatedData,
        Updated_by: userid,
        Updated_at: new Date(),
      })
      .where(eq(Users.id, UsersId));

    res.status(200).json({
      message: Object.keys(filteredUpdatedData) + " successfully updated",
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
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
      .select({
        First_name: Users.First_name,
        Middle_name: Users.Middle_name,
        Last_name: Users.Last_name,
      })
      .from(Users)
      .where(eq(Users.Is_deleted, true))
      .orderBy(Users.First_name, Users.Middle_name, Users.Last_name);

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
      .from(Users)
      .where(eq(Users.Is_deleted, false))
      .orderBy(Users.First_name, Users.Middle_name, Users.Last_name);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching");
  }
});
//search a users full information in db
router.post("/search/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .select({
        id: Users.id,
        First_name: Users.First_name,
        Middle_name: Users.Middle_name,
        Last_name: Users.Last_name,
        Email: Users.Email,
        Phone: Users.Phone,
        Company: Users.Company,
        Username: Users.Username,
        Created_at: Users.Created_at,
        Updated_at: Users.Updated_at,
        Created_by: Users.Created_by,
        Updated_by: Users.Updated_by,
        Deleted_at: Users.Deleted_at,
        Deleted_by: Users.Deleted_by,
        Is_deleted: Users.Is_deleted,
      })
      .from(Users)
      .where(and(eq(Users.Is_deleted, false), eq(Users.id, id)));
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
