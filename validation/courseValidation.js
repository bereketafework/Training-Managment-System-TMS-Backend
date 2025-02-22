const Joi = require("joi");

const courseValidation = Joi.object({
  Course_title: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Course_title" should be a type of 'text'`,
    "string.empty": `" Course_title" cannot be an empty field`,
    "string.min": `" Course_title" should have a minimum length of {#limit}`,
    "string.max": `" Course_title" should have a maximum length of {#limit}`,
    "any.required": `" Course_title" is a required field`,
  }),
  Course_description: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Course_description" should be a type of 'text'`,
    "string.empty": `" Course_description" cannot be an empty field`,
    "string.min": `" Course_description" should have a minimum length of {#limit}`,
    "string.max": `" Course_description" should have a maximum length of {#limit}`,
    "any.required": `" Course_description" is a required field`,
  }),
  Prerequests: Joi.string().messages({
    "string.base": `"  Prerequests" should be a type of 'text'`,
    "string.empty": `"  Prerequests" cannot be an empty field`,
    "string.min": `"  Prerequests" should have a minimum length of {#limit}`,
    "string.max": `" Prerequests" should have a maximum length of {#limit}`,
    "any.required": `"  Prerequests" is a required field`,
  }),

  Course_objective: Joi.string().min(3).max(30).required().messages({
    "string.base": `"Course_objective" should be a type of 'text'`,
    "string.empty": `"Course_objective" cannot be an empty field`,
    "string.min": `"Course_objective" should have a minimum length of {#limit}`,
    "string.max": `"Course_objective" should have a maximum length of {#limit}`,
    "any.required": `"Course_objective" is a required field`,
  }),
});

module.exports = courseValidation;

const validateCourse = (req, res, next) => {
  const { error, value } = courseValidation.validate(req.body);
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
module.exports = validateCourse;
