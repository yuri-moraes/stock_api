const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./users");

const Logs = sequelize.define(
    "Logs",{
        userId: {
            type: DataTypes.UUID,
            references:{
                model: User,
                key:'id'
            }
        },
        action:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)
Logs.belongsTo(User,{
    foreignKey: 'userId',
    as: 'user'
})

module.exports = Logs;