const Joi = require("joi");

const sessionValidation = Joi.object({
  Training_id: Joi.string().uuid().required(),
  Topic: Joi.string().min(3).max(30).required().messages({
    "string.base": `"training_mode" should be a type of 'text'`,
    "string.empty": `"training_mode" cannot be an empty field`,
    "string.min": `"training_mode" should have a minimum length of {#limit}`,
    "string.max": `"training_mode" should have a maximum length of {#limit}`,
    "any.required": `"training_mode" is a required field`,
  }),
  Session_start_date: Joi.date().iso().required().messages({
    "date.base": `"training_start_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"training_start_date" is a required field`,
  }),
  Session_end_date: Joi.date().iso().required().messages({
    "date.base": `"training_end_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "date.greater": `"training_end_date" must be after "training_start_date"`,
    "any.required": `"training_end_date" is a required field`,
  }),
});

module.exports = sessionValidation;

const validatesession = (req, res, next) => {
  const { error, value } = sessionValidation.validate(req.body);
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
module.exports = validatesession;
