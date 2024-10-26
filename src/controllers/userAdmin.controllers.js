const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAdmin = require('../models/userAdmin.model');

const SECRET_KEY = process.env.SECRET_KEY;

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await UserAdmin.findOne({ where: { username } });
      if (!admin) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  
      const hashedPassword = await bcryptjs.hash(password, admin.salt);
      if (hashedPassword !== admin.hash) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  
      const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };