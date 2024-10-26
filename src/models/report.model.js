const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Report = sequelize.define('Report', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
}, {
  tableName: 'reports',
  timestamps: true,
});

module.exports = Report;
