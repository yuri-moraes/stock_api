const express = require("express");
const Stock_ItemController = require("../controllers/Stock_ItemController");
const protectedRoutesMiddleware = require("../middlewares/protectedRoutesMiddleware");
const showRegisterMiddleware = require("../middlewares/showRegisterMiddleware");

const stockRouter = express.Router();

stockRouter.post("/new", Stock_ItemController.createItem);
stockRouter.patch("/:id/subt", Stock_ItemController.remove_items);

stockRouter.get("/", showRegisterMiddleware, Stock_ItemController.findAll);
stockRouter.get("/:id", showRegisterMiddleware, Stock_ItemController.findById);
stockRouter.get('/search/:param', Stock_ItemController.search_items);
//Rotas protegidas
stockRouter.put("/:id/update", protectedRoutesMiddleware, Stock_ItemController.update);
stockRouter.delete("/:id", protectedRoutesMiddleware, Stock_ItemController.delete);
stockRouter.patch("/:id/add", protectedRoutesMiddleware, Stock_ItemController.insert_items);

module.exports = stockRouter;
