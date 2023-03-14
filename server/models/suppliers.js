const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suppliers', {
    supr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    supr_name: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: "NULL"
    },
    supr_contact_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "NULL"
    },
    supr_city: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    supr_location_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'suppliers',
    schema: 'sales',
    timestamps: false,
    indexes: [
      {
        name: "pk_supr_id",
        unique: true,
        fields: [
          { name: "supr_id" },
        ]
      },
    ]
  });
};
