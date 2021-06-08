const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const {
  createUserSchema,
  updateUserSchema,
  validateLogin,
} = require("../middleware/validators/userValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/users
router.get("/id/:id", auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/users/id/1
router.get(
  "/username/:username",
  auth(),
  awaitHandlerFactory(userController.getUserByuserName)
); // localhost:3000/api/users/usersname/name
router.get(
  "/whoami",
  auth(),
  awaitHandlerFactory(userController.getCurrentUser)
); // localhost:3000/api/users/whoami
router.post(
  "/",
  createUserSchema,
  awaitHandlerFactory(userController.createUser)
); // localhost:3000/api/users
router.post("/regverify", awaitHandlerFactory(userController.verify2fa)); // localhost:3000/api/users
router.post(
  "/requestreset",
  awaitHandlerFactory(userController.requestPasswordReset)
); // localhost:3000/api/users
router.post(
  "/resetpassword",
  awaitHandlerFactory(userController.resetPasswordController)
);
router.patch(
  "/id/:id",
  auth(Role.Admin),
  updateUserSchema,
  awaitHandlerFactory(userController.updateUser)
); // localhost:3000/api/users/id/1 , using patch for partial update
router.delete(
  "/id/:id",
  auth(Role.Admin),
  awaitHandlerFactory(userController.deleteUser)
); // localhost:3000/api/users/id/1

router.post(
  "/login",
  validateLogin,
  awaitHandlerFactory(userController.userLogin)
); // localhost:3000/api/users/login

module.exports = router;
