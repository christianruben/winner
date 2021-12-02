const { Sequelize } = require('sequelize');

const db = new Sequelize('poolpack_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = db;