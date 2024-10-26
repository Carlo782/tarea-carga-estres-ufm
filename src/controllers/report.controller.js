const Report = require('../models/report.model');

// Crear un nuevo Report
exports.createReport = async (req, res) => {
  const { title, description, user } = req.body; // Desestructura los campos del cuerpo de la solicitud

  try {
    const newReport = await Report.create({
      title,
      description,
      user,
    });
    res.status(201).json(newReport); // Responde con el reporte creado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};

// Obtener todos los Reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll(); // Recupera todos los reportes
    res.status(200).json(reports); // Responde con la lista de reportes
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};

// Obtener un Report por ID
exports.getReportById = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del reporte de los parámetros

  try {
    const report = await Report.findByPk(id); // Busca el reporte por su ID
    if (report) {
      res.status(200).json(report); // Responde con el reporte encontrado
    } else {
      res.status(404).json({ error: 'Report no encontrado' }); // Manejo de reporte no encontrado
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};

// Actualizar un Report por ID
exports.updateReport = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del reporte de los parámetros
  const { title, description, user } = req.body; // Desestructura los campos del cuerpo de la solicitud

  try {
    const report = await Report.findByPk(id); // Busca el reporte por su ID
    if (report) {
      // Actualiza los campos del reporte
      report.title = title;
      report.description = description;
      report.user = user;
      await report.save(); // Guarda los cambios
      res.status(200).json(report); // Responde con el reporte actualizado
    } else {
      res.status(404).json({ error: 'Report no encontrado' }); // Manejo de reporte no encontrado
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};

// Eliminar un Report por ID
exports.deleteReport = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del reporte de los parámetros

  try {
    const report = await Report.findByPk(id); // Busca el reporte por su ID
    if (report) {
      await report.destroy(); // Elimina el reporte
      res.status(204).json(); // Responde con un estado 204 No Content
    } else {
      res.status(404).json({ error: 'Report no encontrado' }); // Manejo de reporte no encontrado
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};
