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
      msg: "No existen caracteristicas",
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
      msg: "No existe caracteristica",
    });
  }
};

const getCaracteristicaByCod = async (req, res) => {
  const codArticulo = req.params.codArticulo;

  try {
    const caracteristica = await Caracteristica.findOne({
      cod_articulo: codArticulo,
    });

    res.json({
      ok: true,
      caracteristica,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe caracteristica",
    });
  }
};

module.exports = {
  getCaracteristicas,
  getCaracteristicaById,
  getCaracteristicaByCod,
};
