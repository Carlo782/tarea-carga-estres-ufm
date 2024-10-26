const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const UserAdmin = sequelize.define('UserAdmin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserAdmin;
