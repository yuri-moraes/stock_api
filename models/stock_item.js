const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const StockItem = sequelize.define(
  "StockItem",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    unity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "stock_items", // Força o uso da tabela 'stock_items'
  }
);

module.exports = StockItem;
