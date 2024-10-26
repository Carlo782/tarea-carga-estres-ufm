// Importa DataTypes de Sequelize y la configuración de la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

// Define el modelo POI
const POI = sequelize.define('POI', {
  name: {
    type: DataTypes.STRING, // Define el tipo de dato como cadena
    allowNull: false, // No permite valores nulos
  },
  image: {
    type: DataTypes.STRING, // Define el tipo de dato como cadena
    allowNull: false, // No permite valores nulos
  },
  position: {
    type: DataTypes.GEOMETRY('POINT'), // Define el tipo de dato como geometría de tipo punto
    allowNull: false, // No permite valores nulos
  },
  internalMaps: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Define un arreglo de cadenas
    allowNull: true, // Permite valores nulos
    defaultValue: [], // Valor por defecto es un arreglo vacío
  },
  description: {
    type: DataTypes.STRING, // Define el tipo de dato como cadena
    allowNull: true, // Permite valores nulos
  },
}, {
  tableName: 'pois', // Nombre de la tabla en la base de datos
  timestamps: true, // Añade campos de fecha de creación y actualización
});

// Exporta el modelo POI
module.exports = POI;
