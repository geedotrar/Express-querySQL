const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    prod_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prod_name: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: "NULL"
    },
    prod_quantity: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "NULL"
    },
    prod_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    prod_in_stock: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    prod_on_order: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    prod_reorder_level: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    prod_discontinued: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    prod_cate_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'cate_id'
      }
    },
    prod_supr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'suppliers',
        key: 'supr_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "pk_prod_id",
        unique: true,
        fields: [
          { name: "prod_id" },
        ]
      },
    ]
  });
};
