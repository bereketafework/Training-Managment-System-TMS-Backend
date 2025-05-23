const Joi = require("joi");
const { Attendances } = require("../db/attendanceSchema");

const AttendanceValidation = Joi.object({
  Participant_id: Joi.string().uuid().required(),
  Session_id: Joi.string().uuid().required(),

  Status: Joi.string().max(30).required().messages({
    "string.base": `"Status" should be a type of 'text'`,
    "string.empty": `"Status" cannot be an empty field`,
    "string.min": `"Status" should have a minimum length of {#limit}`,
    "string.max": `"Status" should have a maximum length of {#limit}`,
    "any.required": `"Status" is a required field`,
  }),
  Date: Joi.date().iso().required().messages({
    "date.base": `"training_start_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"training_start_date" is a required field`,
  }),
});

module.exports = AttendanceValidation;

const validateAttendance = (req, res, next) => {
  const { error, value } = AttendanceValidation.validate(req.body);
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
module.exports = validateAttendance;
