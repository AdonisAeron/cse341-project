const validator = require('express-validator');

const contactValidator = [
  validator
    .check('firstName')
    .trim()
    .exists()
    .isAlpha()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid first name'),

  validator
    .check('lastName')
    .trim()
    .exists()
    .isAlpha()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid last name'),

  validator
    .check('email')
    .trim()
    .exists()
    .isEmail()
    .withMessage('Invalid email'),

  validator
    .check('favoriteColor')
    .trim()
    .exists()
    .isAlpha()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid favorite color'),

  validator
    .check('birthday')
    .toDate()
    .isISO8601()
    .trim()
    .exists()
    .withMessage('Invalid birthday')
];

const validationHandler = (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = { contactValidator, validationHandler };
