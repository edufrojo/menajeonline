const Stock = require("../models/stock");

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    res.json({
      ok: true,
      stocks,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existen stocks",
    });
  }
};

const getStockByCod = async (req, res) => {
  const cod = req.params.cod;

  try {
    const stock = await Stock.findOne({
      cod_articulo: cod,
    });

    res.json({
      ok: true,
      stock,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe stock",
    });
  }
};

module.exports = {
  getStocks,
  getStockByCod,
};
