const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const POI = sequelize.define('POI', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
  internalMaps: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'pois',
  timestamps: true,
});

module.exports = POI;
