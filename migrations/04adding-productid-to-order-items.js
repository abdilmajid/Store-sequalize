'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'order_items',
      'product_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id' // //primary key
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn(
      'order_items',
      'product_id'
    )

  }
};
