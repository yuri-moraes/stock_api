const express = require("express");
const Stock_ItemController = require("../controllers/Stock_ItemController");
const protectedRoutesMiddleware = require("../middlewares/protectedRoutesMiddleware");
const processUserInfoMiddleware = require("../middlewares/processUserInfoMiddleware");
const LogsController = require("../controllers/LogsController");

const stockRouter = express.Router();

stockRouter.patch("/:id/subt", processUserInfoMiddleware, Stock_ItemController.remove_items, LogsController.createLog);
stockRouter.patch( "/:id/add", processUserInfoMiddleware, Stock_ItemController.insert_items, LogsController.createLog);

stockRouter.get("/", Stock_ItemController.findAll);
stockRouter.get("/:id", Stock_ItemController.findById);
stockRouter.get("/search/:param", Stock_ItemController.search_items);
//Rotas protegidas
stockRouter.post("/new", protectedRoutesMiddleware, Stock_ItemController.createItem, LogsController.createLog);
stockRouter.put("/:id/update", protectedRoutesMiddleware, Stock_ItemController.update, LogsController.createLog);
stockRouter.delete("/:id", protectedRoutesMiddleware, Stock_ItemController.delete, LogsController.createLog);

module.exports = stockRouter;
