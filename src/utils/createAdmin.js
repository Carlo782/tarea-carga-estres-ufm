const bcryptjs = require('bcryptjs');
const sequelize = require('../configs/database');
const UserAdmin = require('../models/userAdmin.model');
require('dotenv').config();

const createAdmin = async () => {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSOWRD;

  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    // Sincronizar el modelo con la base de datos (creará la tabla si no existe)
    await sequelize.sync({ alter: true });

    // Verificar si ya existe un administrador con el mismo nombre de usuario
    const existingAdmin = await UserAdmin.findOne({ where: { username } });
    if (existingAdmin) {
      console.log('El administrador ya existe');
      return;
    }

    // Generar salt y hashear la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Crear el administrador en la base de datos
    const admin = await UserAdmin.create({ username, hash: hashedPassword, salt });

    console.log('Administrador creado exitosamente:', admin);
  } catch (error) {
    console.error('Error al crear el administrador:', error.message);
  } finally {
    // Cerrar la conexión a la base de datos
    await sequelize.close();
  }
};

createAdmin();