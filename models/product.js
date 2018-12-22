'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {
    createdAt: `created_at`,
    updatedAt: `updated_at`
  });
  product.associate = function(models) {
    // associations can be defined here
    //product belongsTo order_items
    // product.belongsTo(models.order_items);
  };
  return product;
};