'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'order_items', // Table to add to
      'order_id', // column being created
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders', // table being refrenced
          key: 'id' // //primary key
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'order_items',
      'order_id'
    )
  }
};
