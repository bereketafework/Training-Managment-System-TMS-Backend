const Joi = require("joi");

const resourceValidation = Joi.object({
  Category_id: Joi.string().uuid().required(),
  Name: Joi.string().min(3).max(30).required().messages({
    "string.base": `" Name" should be a type of 'text'`,
    "string.empty": `" Name" cannot be an empty field`,
    "string.min": `" Name" should have a minimum length of {#limit}`,
    "string.max": `" Name" should have a maximum length of {#limit}`,
    "any.required": `" Name" is a required field`,
  }),
});

module.exports = resourceValidation;

const validateResource = (req, res, next) => {
  const { error, value } = resourceValidation.validate(req.body);
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
module.exports = validateResource;
