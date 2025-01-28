const Joi = require("joi");

const participantValidation = Joi.object({
  First_name: Joi.string().min(3).max(30).required().messages({
    "string.base": `" First_name" should be a type of 'text'`,
    "string.empty": `" First_name" cannot be an empty field`,
    "string.min": `" First_name" should have a minimum length of {#limit}`,
    "string.max": `" First_name" should have a maximum length of {#limit}`,
    "any.required": `" First_name" is a required field`,
  }),
  Middle_name: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Middle_name" should be a type of 'text'`,
    "string.empty": `" Middle_name" cannot be an empty field`,
    "string.min": `" Middle_name" should have a minimum length of {#limit}`,
    "string.max": `" Middle_name" should have a maximum length of {#limit}`,
    "any.required": `" Middle_name" is a required field`,
  }),
  Last_name: Joi.string().min(3).max(30).required().messages({
    "string.base": `"  Last_name" should be a type of 'text'`,
    "string.empty": `"  Last_name" cannot be an empty field`,
    "string.min": `"  Last_name" should have a minimum length of {#limit}`,
    "string.max": `" Last_name" should have a maximum length of {#limit}`,
    "any.required": `"  Last_name" is a required field`,
  }),

  Email: Joi.string().max(255).lowercase().email().required().messages({
    "string.email": `" Email" must be a valid email`,
    "string.empty": `" Email" cannot be an empty field`,
    "string.max": `"Email" should have a maximum length of {#limit}`,
    "any.required": `"Email" is a required field`,
  }),
  Phone: Joi.number().messages({
    "number.base": "Phone number must be a number",
  }),
});

module.exports = participantValidation;

const validateParticipant = (req, res, next) => {
  const { error, value } = participantValidation.validate(req.body);
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
module.exports = validateParticipant;
