'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sqlite3 = require('@louislam/sqlite3').verbose();
const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: 'addressbook.sqlite'
});

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  surname: DataTypes.STRING,
  password: DataTypes.STRING,
  description: DataTypes.STRING,
  username: DataTypes.STRING
});

const db = {};
db['User'] = User;

module.exports = db;
