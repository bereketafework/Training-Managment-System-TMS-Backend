const Joi = require("joi");
const { Enrollments } = require("../db/enrollmentSchema");
const { Trainings } = require("../db/trainingSchema");

const EnrollmentValidation = Joi.object({
  Participant_id: Joi.string().uuid().required(),
  Training_id: Joi.string().uuid().required(),
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
