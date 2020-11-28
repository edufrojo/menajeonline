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

const getCaracteristicaByCod = async (req, res) => {
  const cod = req.params.cod;

  try {
    const caracteristica = await Caracteristica.findOne({
      cod_articulo: cod,
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
  getCaracteristicaByCod,
};
