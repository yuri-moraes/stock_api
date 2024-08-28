const express = require("express");
const cors = require("cors");
const stockRouter = require("../routes/item_routes");
const userRouter = require("../routes/user_routes");
require("dotenv").config();

const server = express();

// Adicionando o middleware CORS
server.use(cors());

server.use(express.json());
server.use("/items", stockRouter);
server.use("/users", userRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Iniciado em: http://localhost:${PORT}`);
});
