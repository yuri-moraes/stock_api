'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>{
    await queryInterface.createTable('stock_items',{
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true
      },
      title:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.DataTypes.STRING,
      unity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      category:{
        type: Sequelize.STRING,
        allowNull: false
      },createdAt:{
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) =>{
    await queryInterface.dropTable('stock_items')
  }
};
