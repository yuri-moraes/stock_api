const express = require("express");
const UserController = require("../controllers/UserController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const protectedRoutesMiddleware = require("../middlewares/protectedRoutesMiddleware");

const userRouter = express.Router();

userRouter.post("/register", validationMiddleware.validateData, UserController.register);
userRouter.post("/login", validationMiddleware.validateLogin, UserController.login);
// rotas protegidas
userRouter.get("/", protectedRoutesMiddleware, UserController.findAll);
userRouter.get("/:id", protectedRoutesMiddleware, validationMiddleware.validadeUuid,  UserController.findById);
userRouter.put("/edit/:id", protectedRoutesMiddleware, validationMiddleware.validadeUuid, UserController.update); 
userRouter.delete("/:id", protectedRoutesMiddleware, validationMiddleware.validadeUuid, UserController.delete);

module.exports = userRouter;
