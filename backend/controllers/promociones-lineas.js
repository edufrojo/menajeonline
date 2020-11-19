const PromocionLinea = require("../models/promocion-linea");

const getPromocionesLineas = async (req, res) => {
  try {
    const promocionesLineas = await PromocionLinea.find();

    res.json({
      ok: true,
      promocionesLineas,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existen promociones lineas",
    });
  }
};

const getPromocionLineaById = async (req, res) => {
  const id = req.params.id;

  try {
    const promocionLinea = await PromocionLinea.findById(id);

    res.json({
      ok: true,
      promocionLinea,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe promocion linea",
    });
  }
};

module.exports = {
  getPromocionesLineas,
  getPromocionLineaById,
};
