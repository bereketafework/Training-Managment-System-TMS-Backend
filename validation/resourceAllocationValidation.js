const Joi = require("joi");

const ResourceAllocationValidation = Joi.object({
  Resource_id: Joi.string().uuid().required().messages({
    "string.base": `"Resource_id" should be a type of 'text'`,
    "string.empty": `"Resource_id" cannot be an empty field`,
    "string.guid": `"Resource_id" should be a valid UUID`,
    "any.required": `"Resource_id" is a required field`,
  }),
  Session_id: Joi.string().uuid().required().messages({
    "string.base": `"Session_id" should be a type of 'text'`,
    "string.empty": `"Session_id" cannot be an empty field`,
    "string.guid": `"Session_id" should be a valid UUID`,
    "any.required": `"Session_id" is a required field`,
  }),
  Quantity: Joi.number().required().messages({
    "number.base": `"Quantity" should be a type of 'number'`,
    "any.required": `"Quantity" is a required field`,
  }),
  Single_amount: Joi.number().required().messages({
    "number.base": `"Single_amount" should be a type of 'number'`,
    "any.required": `"Single_amount" is a required field`,
  }),
  Provider: Joi.string().min(3).max(30).required().messages({
    "string.base": `"Provider" should be a type of 'text'`,
    "string.empty": `"Provider" cannot be an empty field`,
    "string.min": `"Provider" should have a minimum length of {#limit}`,
    "string.max": `"Provider" should have a maximum length of {#limit}`,
    "any.required": `"Provider" is a required field`,
  }),
});

module.exports = ResourceAllocationValidation;

const validateResourceAllocation = (req, res, next) => {
  const { error, value } = ResourceAllocationValidation.validate(req.body);
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
module.exports = validateResourceAllocation;
