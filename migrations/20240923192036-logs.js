'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>{
    await queryInterface.createTable('logs', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true
      },
      userId:{
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      action:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }

    })
  },

  down: async  (queryInterface, Sequelize) =>{
    await queryInterface.dropTable('logs')
  }
};
