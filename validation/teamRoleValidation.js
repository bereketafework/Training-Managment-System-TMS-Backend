const Joi = require("joi");
const { Users } = require("../db/userSchema");

const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const { Teams } = require("../db/teamSchema");

const teamRoleValidation = Joi.object({
  User_id: Joi.string().uuid().required(),
  Team_id: Joi.string().uuid().required(),
  Role: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Role" should be a type of 'text'`,
    "string.empty": `" Role" cannot be an empty field`,
    "string.min": `" Role" should have a minimum length of {#limit}`,
    "string.max": `" Role" should have a maximum length of {#limit}`,
    "any.required": `" Role" is a required field`,
  }),
});

module.exports = teamRoleValidation;

const validateTeamRole = async (req, res, next) => {
  const { error, value } = teamRoleValidation.validate(req.body);
  if (error) {
    const formattedErrors = error.details.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors: formattedErrors });
  }
  // Check if Training_id exists
  const userArray = await db
    .select()
    .from(Users)
    .where(and(eq(Users.id, value.User_id), eq(Users.Is_deleted, false)));
  if (!userArray || userArray.length === 0) {
    return res.status(400).json({
      errors: [{ path: "User_id", message: "User_id does not exist" }],
    });
  }
  const teamArray = await db
    .select()
    .from(Teams)
    .where(and(eq(Teams.id, value.Team_id), eq(Teams.Is_deleted, false)));
  if (!teamArray || teamArray.length === 0) {
    return res.status(400).json({
      errors: [{ path: "Team_id", message: "Team_id does not exist" }],
    });
  }
  req.body = value;
  next();
};
module.exports = validateTeamRole;
