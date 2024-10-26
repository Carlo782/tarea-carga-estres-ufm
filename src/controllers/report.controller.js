const Report = require('../models/report.model');

// Crear un nuevo Report
exports.createReport = async (req, res) => {
  const { title, description, user } = req.body;

  try {
    const newReport = await Report.create({
      title,
      description,
      user,
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los Reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un Report por ID
exports.getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByPk(id);
    if (report) {
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: 'Report no encontrado' });
    }
  } catch (error) {
    res.status500.json({ error: error.message });
  }
};

// Actualizar un Report por ID
exports.updateReport = async (req, res) => {
  const { id } = req.params;
  const { title, description, user } = req.body;

  try {
    const report = await Report.findByPk(id);
    if (report) {
      report.title = title;
      report.description = description;
      report.user = user;
      await report.save();
      res.status(200).json(report);
    } else {
      res.status(404).json({ error: 'Report no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un Report por ID
exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByPk(id);
    if (report) {
      await report.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Report no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
