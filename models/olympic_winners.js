const { DataTypes } = require("sequelize");

const db = require('../config/db');

const Countries = require('./countries');
const Sports = require('./sports');

const OlympicWinners = db.define('olympic_winners', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  athlete: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  countryId: {
    type: DataTypes.INTEGER
  },
  country_group: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.DATEONLY
  },
  sportId: {
    type: DataTypes.INTEGER
  },
  gold: {
    type: DataTypes.INTEGER
  },
  silver: {
    type: DataTypes.INTEGER
  },
  bronze: {
    type: DataTypes.INTEGER
  },
  total: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
});

OlympicWinners.hasOne(Countries, { foreignKey: 'id', sourceKey: 'countryId' });
OlympicWinners.hasOne(Sports, { foreignKey: 'id', sourceKey: 'sportId', });

module.exports = OlympicWinners;