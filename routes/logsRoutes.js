const express = require("express");
const LogsController = require("../controllers/LogsController");

const logRouter = express.Router();

logRouter.get('/', LogsController.findAll);

module.exports = logRouter;