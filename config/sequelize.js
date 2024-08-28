const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  protocol: "postgres",
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
