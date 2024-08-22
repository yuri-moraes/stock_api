const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

const Stock_item = sequelize.define('stock_items',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {type: DataTypes.STRING},
    unity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    category:{
        type: DataTypes.STRING,
        allowNull:false
    },
    show_register:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = Stock_item;