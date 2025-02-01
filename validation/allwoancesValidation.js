const Joi = require("joi");
const { Enrollments } = require("../db/enrollmentSchema");
const { Trainings } = require("../db/trainingSchema");
const { PaymentMethods } = require("../db/paymentMethodSchema");
const { Participants } = require("../db/participantSchema");
const { Users } = require("../db/userSchema");
const { eq, ilike, and } = require("drizzle-orm");

const db = require("../db");
const allwoanceValidation = Joi.object({
  User_id: Joi.string().uuid().required(),
  Training_id: Joi.string().uuid().required(),
  Amount: Joi.number().required().messages({
    "number.base": `"Amount" should be a type of 'number'`,
    "any.required": `"Amount" is a required field`,
  }),
});

module.exports = allwoanceValidation;

const validateAllwoance = async (req, res, next) => {
  const { error, value } = allwoanceValidation.validate(req.body);
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
module.exports = validateAllwoance;
