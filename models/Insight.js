const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./user')

const Insight = db.define('Insight', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Insight.belongsTo(User)
User.hasMany(Insight)

module.exports = Insight;
  