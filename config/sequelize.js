const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
