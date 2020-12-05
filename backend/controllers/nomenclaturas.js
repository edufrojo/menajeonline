const Nomenclatura = require("../models/nomenclatura");

const getNomenclaturas = async (req, res) => {
  try {
    const nomenclaturas = await Nomenclatura.find();

    res.json({
      ok: true,
      nomenclaturas,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existen nomenclaturas",
    });
  }
};

const getNomenclaturaByCod = async (req, res) => {
  const cod = req.params.cod;

  try {
    const nomenclatura = await Nomenclatura.findOne({
      nomenclatura: cod,
    });

    res.json({
      ok: true,
      nomenclatura,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe nomenclatura",
    });
  }
};

module.exports = {
  getNomenclaturas,
  getNomenclaturaByCod,
};
