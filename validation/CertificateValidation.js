const Joi = require("joi");
const { Enrollments } = require("../db/enrollmentSchema");
const { Participant } = require("../db/participantSchema");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const { Trainings } = require("../db/trainingSchema");
const certificateValidation = Joi.object({
  Training_id: Joi.string().uuid().required(),
  Title: Joi.string().min(3).max(300).required().messages({
    "string.base": `"training_name" should be a type of 'text'`,
    "string.empty": `"training_name" cannot be an empty field`,
    "string.min": `"training_name" should have a minimum length of {#limit}`,
    "string.max": `"training_name" should have a maximum length of {#limit}`,
    "any.required": `"training_name" is a required field`,
  }),
  Description: Joi.string().min(3).max(3000).required().messages({
    "string.base": `"training_mode" should be a type of 'text'`,
    "string.empty": `"training_mode" cannot be an empty field`,
    "string.min": `"training_mode" should have a minimum length of {#limit}`,
    "string.max": `"training_mode" should have a maximum length of {#limit}`,
    "any.required": `"training_mode" is a required field`,
  }),
  Issue_date: Joi.date().iso().required().messages({
    "date.base": `"training_start_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "any.required": `"training_start_date" is a required field`,
  }),
  Expire_date: Joi.date().iso().required().messages({
    "date.base": `"training_end_date" should be a valid date`,
    "date.format": `"training_start_date" should be in ISO format`,
    "date.greater": `"training_end_date" must be after "training_start_date"`,
    "any.required": `"training_end_date" is a required field`,
  }),
});

module.exports = certificateValidation;

const validateCertificate = async (req, res, next) => {
  const { error, value } = certificateValidation.validate(req.body);
  if (error) {
    const formattedErrors = error.details.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors: formattedErrors });
  }

  // const enrollmentArray = await db
  //   .select()
  //   .from(Enrollments)
  //   .where(eq(Enrollments.id, value.Enrollment_id));
  // if (!enrollmentArray || enrollmentArray.length === 0) {
  //   return res.status(400).json({
  //     errors: [
  //       { path: "Enrollment_id", message: "Enrollment_id does not exist" },
  //     ],
  //   });
  // }

  // Check if Participant_id exists
  const TrainingArray = await db
    .select()
    .from(Trainings)
    .where(eq(Trainings.id, value.Training_id));
  if (!TrainingArray || TrainingArray.length === 0) {
    return res.status(400).json({
      errors: [
        { path: "Participant_id", message: "Participant_id does not exist" },
      ],
    });
  }

  req.body = value;
  next();
};
module.exports = validateCertificate;
