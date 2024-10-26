// Importa Sequelize
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos desde las variables de entorno
    process.env.DB_USER, // Usuario de la base de datos desde las variables de entorno
    process.env.DB_PASSWORD, // Contraseña de la base de datos desde las variables de entorno
    {
        host: process.env.DB_HOST, // Host de la base de datos desde las variables de entorno
        dialect: 'postgres', // Dialecto de la base de datos
    }
);

// Exporta la instancia de Sequelize
module.exports = sequelize;
