const POI = require('../models/poi.model');
const RoutePoint = require('../models/routePoint.model');

// Crea un nuevo Punto de Interés (POI)
exports.createPOI = async (req, res) => {
  const { name, image, latitude, longitude, internalMaps, description } = req.body; // Incluye descripción
  try {
    const newPOI = await POI.create({
      name,
      image,
      position: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
      internalMaps: internalMaps || [],
      description, // Incluye descripción
    });

    const newRoutePoint = await RoutePoint.create({
      path: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
      poi_id: newPOI.id,
      connections: [],
    });

    res.status(201).json({ newPOI, newRoutePoint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtiene todos los Puntos de Interés (POIs)
exports.getAllPOIs = async (req, res) => {
  try {
    const pois = await POI.findAll();
    res.status(200).json(pois);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtiene un POI por su ID
exports.getPOIById = async (req, res) => {
  const { id } = req.params;

  try {
    const poi = await POI.findByPk(id);
    if (poi) {
      res.status(200).json(poi);
    } else {
      res.status(404).json({ error: 'POI no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualiza un POI existente
exports.updatePOI = async (req, res) => {
  const { id } = req.params;
  const { name, image, latitude, longitude, internalMaps, description } = req.body; // Incluye descripción

  try {
    const poi = await POI.findByPk(id);
    if (poi) {
      // Actualiza los campos del POI
      poi.name = name;
      poi.image = image;
      poi.position = {
        type: 'Point',
        coordinates: [latitude, longitude],
      };
      poi.internalMaps = internalMaps || [];
      poi.description = description; // Incluye descripción
      await poi.save();

      const routePoint = await RoutePoint.findOne({ where: { poi_id: poi.id } });
      if (routePoint) {
        routePoint.path = {
          type: 'Point',
          coordinates: [latitude, longitude],
        };
        await routePoint.save();
      }

      res.status(200).json({ poi, routePoint });
    } else {
      res.status(404).json({ error: 'POI no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Elimina un POI existente
exports.deletePOI = async (req, res) => {
  const { id } = req.params;

  try {
    const poi = await POI.findByPk(id);
    if (!poi) {
      return res.status(404).json({ error: 'POI no encontrado' });
    }

    const routePoint = await RoutePoint.findOne({ where: { poi_id: id } });
    if (routePoint) {
      await routePoint.destroy();
    }

    await poi.destroy();

    res.status(200).json({ message: 'POI y RoutePoint eliminados exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
