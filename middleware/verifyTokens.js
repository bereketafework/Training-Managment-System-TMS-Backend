const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const verifyToken = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    // Verify the token
    const decoded = jwt.verify(token, "tms"); // Use your secret key
    req.user = decoded; // Attach decoded user data to the request object

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
};

module.exports = verifyToken;
