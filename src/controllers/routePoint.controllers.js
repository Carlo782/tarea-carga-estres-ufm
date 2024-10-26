const RoutePoint = require('../models/routePoint.model');

exports.createRoutePoint = async (req, res) => {
    const { poiId, path, poi_id ,connections } = req.body;
    try {
      const newRoutePoint = await RoutePoint.create({ 
        poiId,
        path,
        poi_id,
        connections: connections || [],
      });
  
      res.status(201).json(newRoutePoint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllRoutesPoints = async (req, res) => {
    try {
      const routesPoints = await RoutePoint.findAll();
      res.status(200).json(routesPoints);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getRoutePointById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const point = await RoutePoint.findByPk(id);
      if (point) {
        res.status(200).json(point);
      } else {
        res.status(404).json({ error: 'Ruta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getRoutePointByPoiId = async (req, res) => {
    const { poi_id } = req.params;
  
    try {
      const point = await RoutePoint.findOne({ where: { poi_id } });
      if (point) {
        res.status(200).json(point);
      } else {
        res.status(404).json({ error: 'Ruta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateRoutePoint = async (req, res) => {
    const { id } = req.params;
    const { path, poi_id, connections } = req.body;
  
    try {
      let point = await RoutePoint.findByPk(id);
      if (point) {
        point.path = path;
        point.poi_id = poi_id;
        point.connections = connections;
        await point.save();
        res.status(200).json(point);
      } else {
        res.status(404).json({ error: 'Ruta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteRoutePoint = async (req, res) => {
    const { id } = req.params;
  
    try {
      const point = await RoutePoint.findByPk(id);
      if (point) {
        await point.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Ruta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
