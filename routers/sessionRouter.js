const express = require("express");
const { hashPassword } = require("../validation/passHashing");
const validateGuest = require("../validation/guestValidation");
const { Sessions } = require("../db/sessionSchema");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const verifyToken = require("../middleware/verifyTokens");

const router = express.Router();
router.use(express.json());
const { config } = require("dotenv");

config();

router.post("/create", validatesession, verifyToken, async (req, res) => {
  const tdata = req.body;
  const { user: idFromToken } = req;
  if (!idFromToken || !idFromToken.id) {
    return res.status(400).json({ error: "Invalid token data." });
  }
  const userid = idFromToken.id;

  try {
    const result = await db
      .insert(Sessions)
      .values({ ...tdata, Created_by: userid })
      .returning();
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
