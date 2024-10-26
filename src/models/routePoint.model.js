const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const RoutePoint = sequelize.define('RoutePoint', {
  path: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
  poi_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  connections: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    defaultValue: [],
  },
},{
tableName: 'route_points',
});

module.exports = RoutePoint;