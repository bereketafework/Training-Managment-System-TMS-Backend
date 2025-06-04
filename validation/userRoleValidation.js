const Joi = require("joi");
const { Users } = require("../db/userSchema");

const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");

const userRoleValidation = Joi.object({
  // User_id: Joi.string().uuid().required(),
  Role: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Role" should be a type of 'text'`,
    "string.empty": `" Role" cannot be an empty field`,
    "string.min": `" Role" should have a minimum length of {#limit}`,
    "string.max": `" Role" should have a maximum length of {#limit}`,
    "any.required": `" Role" is a required field`,
  }),
});

module.exports = userRoleValidation;

const validateUserRole = async (req, res, next) => {
  const { error, value } = userRoleValidation.validate(req.body);
  if (error) {
    const formattedErrors = error.details.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors: formattedErrors });
  }

  req.body = value;
  next();
};
module.exports = validateUserRole;
