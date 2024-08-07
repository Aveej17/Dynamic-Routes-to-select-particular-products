const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '0000', {dialect:'mysql', host:'localhost'});

module.exports = sequelize;