const Joi = require("joi");

const guestValidation = Joi.object({
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
  Phone: Joi.number().min(10).required().messages({
    "number.base": "Phone number must be a number",
  }),
  Qualification: Joi.string().min(3).max(30).required().messages({
    "string.base": `"Qualification" should be a type of 'text'`,
    "string.empty": `"Qualification" cannot be an empty field`,
    "string.min": `"Qualification" should have a minimum length of {#limit}`,
    "string.max": `"Qualification" should have a maximum length of {#limit}`,
    "any.required": `"Qualification" is a required field`,
  }),
});

module.exports = guestValidation;

const validateGuest = (req, res, next) => {
  const { error, value } = guestValidation.validate(req.body);
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
module.exports = validateGuest;
