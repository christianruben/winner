const { DataTypes } = require("sequelize");

const db = require('../config/db');

const Sports = db.define('sports', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
});

module.exports = Sports;