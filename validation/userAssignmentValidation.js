const Joi = require("joi");

const userAssignmentValidation = Joi.object({
  User_id: Joi.string().uuid().required().messages({
    "string.base": `"User_id" should be a type of 'text'`,
    "string.empty": `"User_id" cannot be an empty field`,
    "string.guid": `"User_id" should be a valid UUID`,
    "any.required": `"User_id" is a required field`,
  }),
  Team_id: Joi.string().uuid().required().messages({
    "string.base": `"Team_id" should be a type of 'text'`,
    "string.empty": `"Team_id" cannot be an empty field`,
    "string.guid": `"Team_id" should be a valid UUID`,
    "any.required": `"Team_id" is a required field`,
  }),
  Session_id: Joi.string().uuid().required().messages({
    "string.base": `"Session_id" should be a type of 'text'`,
    "string.empty": `"Session_id" cannot be an empty field`,
    "string.guid": `"Session_id" should be a valid UUID`,
    "any.required": `"Session_id" is a required field`,
  }),
});

module.exports = userAssignmentValidation;

const validateUserAssignment = (req, res, next) => {
  const { error, value } = userAssignmentValidation.validate(req.body);
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
module.exports = validateUserAssignment;
