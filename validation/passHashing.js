const bcrypt = require("bcrypt");

const saltRounds = 10;
async function hashPassword(Password) {
  try {
    const hash = await bcrypt.hash(Password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

async function verifyPassword(Password, hashedPassword) {
  try {
    const result = await bcrypt.compare(Password, hashedPassword);
    return result;
  } catch (error) {
    console.error("Error verifying password:", error);
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
};
