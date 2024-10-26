require('dotenv').config(); 

const express = require('express'); 
const cors = require('cors');
const sequelize = require('./configs/database');
const userAdminRoutes = require('./routes/userAdmin'); 
const routePoint = require('./routes/routePoint');
const poiRoutes = require('./routes/pois'); 
const reportRoutes = require('./routes/reports'); 

const app = express(); 
const port = 3000; 
app.use(cors()); 

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json()); // Habilita el soporte para recibir datos JSON en las solicitudes

// Configuración de rutas
app.use('/admin', userAdminRoutes); // Rutas de administración de usuarios bajo el prefijo '/admin'
app.use('/api', routePoint); // Rutas de puntos de ruta bajo el prefijo '/api'
app.use('/api', poiRoutes); // Rutas de Puntos de Interés bajo el prefijo '/api', ESTE SE USARÁ PARA LAS PRUEBAS DE CARGA Y ESTRES
app.use('/api', reportRoutes); // Rutas de reportes bajo el prefijo '/api' ESTE SE USARÁ PARA LAS PRUEBAS DE CARGA Y ESTRES

// Conexión a la base de datos
sequelize.authenticate() // Intenta autenticar la conexión a la base de datos
  .then(() => {
    console.log('Conexión a la base de datos exitosa'); // Mensaje de éxito en la conexión
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err); // Manejo de errores en caso de fallo en la conexión
  });

// Sincronización de modelos con la base de datos
sequelize.sync() // Sincroniza los modelos definidos con la base de datos
  .then(() => {
    console.log('Modelos sincronizados con la base de datos'); // Mensaje de éxito en la sincronización
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos:', err); // Manejo de errores en caso de fallo en la sincronización
  });

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`); // Mensaje indicando que el servidor está escuchando en el puerto definido
});
