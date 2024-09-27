const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
//definindo a tabela
const Logs = sequelize.define("logs",{
        userId: {
            type: DataTypes.UUID,
            references:{
                model: 'users',
                key:'id'
            }
        },
        action:{
            type: DataTypes.STRING,
            allowNull: false
        },
        userEmail:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

Logs.associate = function(models){
    Logs.belongsTo(require('./users'),{
        foreignKey: 'userId',
        as: 'user',
    });
};

module.exports = Logs;