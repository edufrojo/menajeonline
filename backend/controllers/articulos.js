const Articulo = require("../models/articulo");

const getArticulos = async (req, res) => {
  try {
    const page = Number(req.query.page) || 0;
    const limitItems = 50;

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

const getArticuloByCod = async (req, res) => {
  const cod = req.params.cod;

  try {
    const articulo = await Articulo.findOne({ cod_articulo: cod });

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

const getArticulosByPromotion = async (req, res) => {
  try {
    const promotion = req.params.promotion;

    const page = Number(req.query.page) || 0;
    const limitItems = 50;

    articulos = await Articulo.find({ cod_promocion: promotion })
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

const getArticulosByNomenclatura = async (req, res) => {
  try {
    const nomenclatura = req.params.nomenclatura;

    var departamento = nomenclatura.substring(0, 2);
    var familia = nomenclatura.substring(2, 4);
    var categoria = nomenclatura.substring(4, 6);

    const page = Number(req.query.page) || 0;
    const limitItems = 50;

    switch (nomenclatura.length) {
      case 4:
        articulos = await Articulo.find({
          departamento: departamento,
          familia: familia,
        })
          .skip(page * limitItems)
          .limit(limitItems);
        break;
      case 6:
        articulos = await Articulo.find({
          departamento: departamento,
          familia: familia,
          categoria: categoria,
        })
          .skip(page * limitItems)
          .limit(limitItems);
        break;
      default:
        articulos = await Articulo.find({ departamento: departamento })
          .skip(page * limitItems)
          .limit(limitItems);
        break;
    }

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
  getArticuloByCod,
  getArticulosByPromotion,
  getArticulosByNomenclatura,
  buscarArticulos,
};
