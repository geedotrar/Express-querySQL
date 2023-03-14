const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_required_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_shipped_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_freight: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    order_subtotal: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    order_total_qty: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    order_ship_city: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    order_ship_address: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    order_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    order_employee: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_cust_id: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    order_ship_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shippers',
        key: 'ship_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "pk_order_id",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
