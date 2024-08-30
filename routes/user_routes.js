const express = require("express");
const UserController = require("../controllers/UserController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const protectedRoutesMiddleware = require("../middlewares/protectedRoutesMiddleware");

const userRouter = express.Router();

// Rotas públicas
userRouter.post("/register", validationMiddleware.validateData, UserController.register);
userRouter.post("/login", validationMiddleware.validateLogin, UserController.login);

// Rotas protegidas
userRouter.get("/", protectedRoutesMiddleware, UserController.findAll);
userRouter.get("/:id", protectedRoutesMiddleware, validationMiddleware.validadeUuid, UserController.findById);
userRouter.put("/edit/:id", protectedRoutesMiddleware, validationMiddleware.validadeUuid, UserController.editUser);
userRouter.delete("/:id", protectedRoutesMiddleware, validationMiddleware.validadeUuid, UserController.delete);

module.exports = userRouter;
