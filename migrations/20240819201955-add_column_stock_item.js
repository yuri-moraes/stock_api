'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>{
    await queryInterface.addColumn('stock_items', 'show_register',{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('stock_items', 'show_register')
  }
};
