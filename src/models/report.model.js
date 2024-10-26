// Importa DataTypes de Sequelize y la configuración de la base de datos
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

// Define el modelo Report
const Report = sequelize.define('Report', {
  title: {
    type: DataTypes.STRING, // Define el tipo de dato como cadena
    allowNull: false, // No permite valores nulos
  },
  description: {
    type: DataTypes.TEXT, // Define el tipo de dato como texto
    allowNull: false, // No permite valores nulos
  },
  user: {
    type: DataTypes.STRING, // Define el tipo de dato como cadena
    allowNull: false, // No permite valores nulos
    unique: false, // No se requiere que sea único
  },
}, {
  tableName: 'reports', // Nombre de la tabla en la base de datos
  timestamps: true, // Añade campos de fecha de creación y actualización
});

// Exporta el modelo Report
module.exports = Report;
