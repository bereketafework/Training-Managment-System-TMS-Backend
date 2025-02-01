const Joi = require("joi");
const { Enrollments } = require("../db/enrollmentSchema");
const { Trainings } = require("../db/trainingSchema");
const { PaymentMethods } = require("../db/paymentMethodSchema");
const { Participants } = require("../db/participantSchema");
const { Users } = require("../db/userSchema");

const PaymentValidation = Joi.object({
  Enrollment_id: Joi.string().uuid().required(),
  Training_id: Joi.string().uuid().required(),
  Method_id: Joi.string().uuid().required(),
  Participant_id: Joi.string().uuid().required(),
  Amount: Joi.number().required().messages({
    "number.base": `"Amount" should be a type of 'number'`,
    "any.required": `"Amount" is a required field`,
  }),
  Status: Joi.string().required().messages({
    "string.base": `"Status" should be a type of 'text'`,
    "string.empty": `"Status" cannot be an empty field`,
    "any.required": `"Status" is a required field`,
  }),
  Date: Joi.date().iso().required().messages({
    "date.base": `"Date" should be a valid date`,
    "date.format": `"Date" should be in ISO format`,
    "any.required": `"Date" is a required field`,
  }),
});

module.exports = PaymentValidation;

const validatePayment = async (req, res, next) => {
  const { error, value } = PaymentValidation.validate(req.body);
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

module.exports = validatePayment;
