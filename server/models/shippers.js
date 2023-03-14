const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shippers', {
    ship_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ship_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    ship_phone: {
      type: DataTypes.STRING(24),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shippers',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "pk_ship_id",
        unique: true,
        fields: [
          { name: "ship_id" },
        ]
      },
    ]
  });
};
