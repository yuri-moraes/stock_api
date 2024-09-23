const {DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');
const Logs = require('./logs');

const User = sequelize.define('users',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING
    }
})

User.hasOne(Logs,{
    foreignKey: 'userId',
    as: 'log'
})

module.exports = User