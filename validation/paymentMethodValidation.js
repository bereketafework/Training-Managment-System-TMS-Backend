const Joi = require("joi");

const paymentMethodValidation = Joi.object({
  Methods: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Method" should be a type of 'text'`,
    "string.empty": `" Method" cannot be an empty field`,
    "string.min": `" Method" should have a minimum length of {#limit}`,
    "string.max": `" Method" should have a maximum length of {#limit}`,
    "any.required": `" Method" is a required field`,
  }),
});

module.exports = paymentMethodValidation;

const validatePaymentMethod = (req, res, next) => {
  const { error, value } = paymentMethodValidation.validate(req.body);
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
module.exports = validatePaymentMethod;
