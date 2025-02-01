const Joi = require("joi");
const { Enrollments } = require("../db/enrollmentSchema");
const { Trainings } = require("../db/trainingSchema");

const EnrollmentValidation = Joi.object({
  Participant_id: Joi.string().uuid().required(),
  Training_id: Joi.string().uuid().required(),
  Enrollment_date: Joi.date().iso().required().messages({
    "date.base": `"training_start_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"training_start_date" is a required field`,
  }),
  Complation_date: Joi.date().iso().required().messages({
    "date.base": `"training_start_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"training_start_date" is a required field`,
  }),
});

module.exports = EnrollmentValidation;

const validateEnrollment = (req, res, next) => {
  const { error, value } = EnrollmentValidation.validate(req.body);
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
module.exports = validateEnrollment;
