const Caracteristica = require("../models/caracteristica");

const getCaracteristicas = async (req, res) => {
  try {
    const caracteristicas = await Caracteristica.find();

    res.json({
      ok: true,
      caracteristicas,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existen promociones lineas",
    });
  }
};

const getCaracteristicaById = async (req, res) => {
  const id = req.params.id;

  try {
    const caracteristica = await Caracteristica.findById(id);

    res.json({
      ok: true,
      caracteristica,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe promocion linea",
    });
  }
};

module.exports = {
  getCaracteristicas,
  getCaracteristicaById,
};
