const Joi = require("joi");

const trainingValidation = Joi.object({
  Course_id: Joi.string().uuid().required().messages({
    "string.base": `"course_id" should be a type of 'text'`,
    "string.empty": `"course_id" cannot be an empty field`,
    "string.guid": `"course_id" should be a valid UUID`,
    "any.required": `"course_id" is a required field`,
  }),
  Training_name: Joi.string().min(3).max(30).required().messages({
    "string.base": `"training_name" should be a type of 'text'`,
    "string.empty": `"training_name" cannot be an empty field`,
    "string.min": `"training_name" should have a minimum length of {#limit}`,
    "string.max": `"training_name" should have a maximum length of {#limit}`,
    "any.required": `"training_name" is a required field`,
  }),
  Training_mode: Joi.string().min(3).max(30).required().messages({
    "string.base": `"training_mode" should be a type of 'text'`,
    "string.empty": `"training_mode" cannot be an empty field`,
    "string.min": `"training_mode" should have a minimum length of {#limit}`,
    "string.max": `"training_mode" should have a maximum length of {#limit}`,
    "any.required": `"training_mode" is a required field`,
  }),
  Training_location: Joi.string().min(3).max(30).required().messages({
    "string.base": `"training_location" should be a type of 'text'`,
    "string.empty": `"training_location" cannot be an empty field`,
    "string.min": `"training_location" should have a minimum length of {#limit}`,
    "string.max": `"training_location" should have a maximum length of {#limit}`,
    "any.required": `"training_location" is a required field`,
  }),
  Training_start_date: Joi.date().required().messages({
    "date.base": `"training_start_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"training_start_date" is a required field`,
  }),
  Training_end_date: Joi.date().required().messages({
    "date.base": `"training_end_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "date.greater": `"training_end_date" must be after "training_start_date"`,
    "any.required": `"training_end_date" is a required field`,
  }),
  Enrolment_deadline: Joi.date().required().messages({
    "date.base": `"enrolment_deadline" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"enrolment_deadline" is a required field`,
  }),
  Capacity: Joi.number().required().messages({
    "number.base": `"capacity" should be a type of 'number'`,
    "any.required": `"capacity" is a required field`,
  }),
  Cost: Joi.number().required().messages({
    "number.base": `"cost" should be a type of 'number'`,
    "any.required": `"cost" is a required field`,
  }),
});

module.exports = trainingValidation;

const validateTraining = (req, res, next) => {
  const { error, value } = trainingValidation.validate(req.body);
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
module.exports = validateTraining;
