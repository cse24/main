'use strict';

// db와 연동
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./users');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);
const requirement = require('./requirement');

db.sequelize = sequelize;

db.User = User;
db.requirement = requirement;

User.init(sequelize);
requirement.init(sequelize);

User.associate(db);
requirement.associate(db);

module.exports = db;