const Joi = require("joi");
const { Enrollments } = require("../db/enrollmentSchema");
const { Trainings } = require("../db/trainingSchema");
const { PaymentMethods } = require("../db/paymentMethodSchema");
const { Participants } = require("../db/participantSchema");
const { Users } = require("../db/userSchema");

const sponsorshipValidation = Joi.object({
  Sponsor_id: Joi.string().uuid().required(),
  Training_id: Joi.string().uuid().required(),
  Payment_id: Joi.string().uuid().required(),
  Participant_id: Joi.string().uuid().required(),
  Amount: Joi.number().required().messages({
    "number.base": `"Amount" should be a type of 'number'`,
    "any.required": `"Amount" is a required field`,
  }),
});

module.exports = sponsorshipValidation;

const validateSponsorShip = async (req, res, next) => {
  const { error, value } = sponsorshipValidation.validate(req.body);
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

module.exports = validateSponsorShip;
