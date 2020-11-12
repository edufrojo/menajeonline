const { Schema, model } = require("mongoose");

const CaracteristicaSchema = Schema({
  cod_articulo: Array,
  caracteristicas: Array,
});

module.exports = model("Caracteristica", CaracteristicaSchema);
