import { DataTypes } from 'sequelize'

import db from '../db/conn.js'

import User from './User.js'

const Insight = db.define('Insight', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
})

Insight.belongsTo(User)
User.hasMany(Insight)

export default Insight
