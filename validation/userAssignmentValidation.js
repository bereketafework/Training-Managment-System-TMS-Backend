const Joi = require("joi");

const userAssignmentValidation = Joi.object({
  User_id: Joi.string().uuid().required(),
  Team_id: Joi.string().uuid().required(),
  Session_id: Joi.string().uuid().required(),
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
