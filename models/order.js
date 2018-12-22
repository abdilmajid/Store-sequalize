'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    createdAt: `created_at`,
    updatedAt: `updated_at`
  });
  order.associate = function(models) {
    // associations can be defined here
    //order hasMany order_items
    // order.hasMany(models.order_items);
  };
  return order;
};