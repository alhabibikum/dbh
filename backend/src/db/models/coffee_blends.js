const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const coffee_blends = sequelize.define(
    'coffee_blends',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,

      },

price: {
        type: DataTypes.DECIMAL,

      },

stock_level: {
        type: DataTypes.INTEGER,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  coffee_blends.associate = (db) => {

    db.coffee_blends.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.coffee_blends.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return coffee_blends;
};

