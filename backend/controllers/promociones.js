const Promocion = require("../models/promocion");

const getPromociones = async (req, res) => {
  try {
    promociones = await Promocion.find();

    promociones = promociones.filter(function (item) {
      return (
        item.cod_promocion != "202009" &&
        item.cod_promocion != "202038" &&
        item.cod_promocion != "202039"
      );
    });

    res.json({
      ok: true,
      promociones,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existen promociones",
    });
  }
};

const getPromocionByCod = async (req, res) => {
  const cod = req.params.cod;

  try {
    const promocion = await Promocion.findOne({ cod_promocion: cod });

    res.json({
      ok: true,
      promocion,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe promocion",
    });
  }
};

module.exports = {
  getPromociones,
  getPromocionByCod,
};
