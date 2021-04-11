const { body } = require("express-validator");

exports.creatFoodSchema = [
  body("fishServings").optional().isNumeric().withMessage("Must be a number"),
  body("beefServings").optional().isNumeric().withMessage("Must be a number"),
  body("chickenServings")
    .optional()
    .isNumeric()
    .withMessage("Must be a number"),
  body("porkServings").optional().isNumeric().withMessage("Must be a number"),
  body("diaryServings").optional().isNumeric().withMessage("Must be a number"),
  body("foodWaste").optional().isNumeric().withMessage("Must be a number"),
  body("homeGrown").optional().isNumeric().withMessage("Must be a number"),
  body("eatSeasonal").optional().isNumeric().withMessage("Must be a number"),
  body("eatLocally").optional().isNumeric().withMessage("Must be a number"),
  body("foodcol").optional().isNumeric().withMessage("Must be a number"),
];

exports.updateFoodSchema = [
  body("fishServings").optional().isNumeric().withMessage("Must be a number"),
  body("beefServings").optional().isNumeric().withMessage("Must be a number"),
  body("chickenServings")
    .optional()
    .isNumeric()
    .withMessage("Must be a number"),
  body("porkServings").optional().isNumeric().withMessage("Must be a number"),
  body("diaryServings").optional().isNumeric().withMessage("Must be a number"),
  body("foodWaste").optional().isNumeric().withMessage("Must be a number"),
  body("homeGrown").optional().isNumeric().withMessage("Must be a number"),
  body("eatSeasonal").optional().isNumeric().withMessage("Must be a number"),
  body("eatLocally").optional().isNumeric().withMessage("Must be a number"),
  body("foodcol").optional().isNumeric().withMessage("Must be a number"),
  body()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage("Please provide required field to update")
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = [
        "fishServings",
        "beefServings",
        "chickenServings",
        "porkServings",
        "diaryServings",
        "foodWaste",
        "homeGrown",
        "eatSeasonal",
        "eatLocally",
        "foodcol",
      ];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage("Invalid updates!"),
];
