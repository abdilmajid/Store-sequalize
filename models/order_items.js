'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_items = sequelize.define('order_items', {
    qty: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    createdAt: `created_at`,
    updatedAt: `updated_at`
  });
  order_items.associate = function(models) {
    // associations can be defined here

  };
  return order_items;
};