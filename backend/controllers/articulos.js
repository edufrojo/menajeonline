const Articulo = require("../models/articulo");

const getArticulos = async (req, res) => {
  try {
    const page = Number(req.query.page) || 0;
    const limitItems = 12;

    articulos = await Articulo.find()
      .skip(page * limitItems)
      .limit(limitItems);

    res.json({
      ok: true,
      articulos,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existen articulos",
    });
  }
};

const getArticuloById = async (req, res) => {
  const id = req.params.id;

  try {
    const articulo = await Articulo.findById(id);

    res.json({
      ok: true,
      articulo,
    });
  } catch (error) {
    res.json({
      ok: true,
      msg: "No existe el articulo",
    });
  }
};

const buscarArticulos = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const articulos = await Articulo.find({ descripcion: regex });

  res.json({
    ok: true,
    articulos,
  });
};

module.exports = {
  getArticulos,
  getArticuloById,
  buscarArticulos,
};
