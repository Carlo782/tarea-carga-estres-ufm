// Cargar dotenv para cargar variables de entorno desde .env
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
app.use(express.json());

app.use('/admin', userAdminRoutes);
app.use('/api', routePoint);
app.use('/api', poiRoutes);
app.use('/api', reportRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
