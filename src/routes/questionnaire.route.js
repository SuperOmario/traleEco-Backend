const express = require("express");
const router = express.Router();
const qController = require("../controllers/questionnaire.controller");
const auth = require("../middleware/auth.middleware");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createquestionnairechema,
  updatequestionnairechema,
  validateLogin,
} = require("../middleware/validators/userValidator.middleware");

router.get("/", awaitHandlerFactory(qController.getAllFood)); // localhost:3000/api/v1/questionnaire
router.get("/id/:id", auth(), awaitHandlerFactory(qController.getUserById)); // localhost:3000/api/v1/questionnaire/id/1
router.get(
  "/username/:username",
  auth(),
  awaitHandlerFactory(qController.getUserByuserName)
); // localhost:3000/api/v1/questionnaire/questionnaire/skadiri
router.get("/whoami", auth(), awaitHandlerFactory(qController.getCurrentUser)); // localhost:3000/api/v1/questionnaire/whoami
router.post("/food", awaitHandlerFactory(qController.insertFood)); // localhost:3000/api/v1/questionnaire
// router.patch(
//   "/id/:id",
//   auth(Role.Admin),
//   updatequestionnairechema,
//   awaitHandlerFactory(questionnaireController.updateUser)
// ); // localhost:3000/api/v1/questionnaire/id/1 , using patch for partial update
// router.delete(
//   "/id/:id",
//   auth(Role.Admin),
//   awaitHandlerFactory(questionnaireController.deleteUser)
// ); // localhost:3000/api/v1/questionnaire/id/1

// router.post(
//   "/login",
//   validateLogin,
//   awaitHandlerFactory(questionnaireController.userLogin)
// ); // localhost:3000/api/v1/questionnaire/login

module.exports = router;
