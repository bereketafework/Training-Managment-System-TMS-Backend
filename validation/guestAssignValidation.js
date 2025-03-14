const Joi = require("joi");

const guestAssignValidation = Joi.object({
  Training_id: Joi.string().uuid().required(),
  Sessions_id: Joi.string().uuid().required(),
  Guest_id: Joi.string().uuid().required(),
});

module.exports = guestAssignValidation;

const validateGuestAssign = (req, res, next) => {
  const { error, value } = guestAssignValidation.validate(req.body);
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
module.exports = validateGuestAssign;
