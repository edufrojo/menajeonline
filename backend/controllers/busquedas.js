const Articulo = require("../models/articulo");

const getTodo = async (req, res) => {
  const page = Number(req.query.page) || 0;
  const limitItems = 12;

  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  totalArticulos = await Articulo.find({
    descripcion: regex,
  }).countDocuments();

  articulos = await Articulo.find({ descripcion: regex })
    .skip(page * limitItems)
    .limit(limitItems);

  res.json({
    ok: true,
    articulos,
    totalArticulos,
  });
};

module.exports = {
  getTodo,
};
