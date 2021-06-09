const { body } = require("express-validator");

//figure out how to avoid all this code reuse
exports.createFoodSchema = [
  body("fish").optional().isNumeric().withMessage("Must be a number"),
  body("beef").optional().isNumeric().withMessage("Must be a number"),
  body("chicken").optional().isNumeric().withMessage("Must be a number"),
  body("pork").optional().isNumeric().withMessage("Must be a number"),
  body("dairy").optional().isNumeric().withMessage("Must be a number"),
  body("waste").optional().isNumeric().withMessage("Must be a number"),
  body("homegrown").optional().isNumeric().withMessage("Must be a number"),
  body("local").optional().isNumeric().withMessage("Must be a number"),
];

exports.updateFoodSchema = [
  body("fish").optional().isNumeric().withMessage("Must be a number"),
  body("beef").optional().isNumeric().withMessage("Must be a number"),
  body("chicken").optional().isNumeric().withMessage("Must be a number"),
  body("pork").optional().isNumeric().withMessage("Must be a number"),
  body("diary").optional().isNumeric().withMessage("Must be a number"),
  body("waste").optional().isNumeric().withMessage("Must be a number"),
  body("homegrown").optional().isNumeric().withMessage("Must be a number"),

  body("local").optional().isNumeric().withMessage("Must be a number"),
  body()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage("Please provide required field to update")
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = [
        "fish",
        "beef",
        "chicken",
        "pork",
        "diary",
        "waste",
        "homegrown",
        "local",
      ];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage("Invalid updates!"),
];
