const { Schema, model } = require("mongoose");

const StockSchema = Schema({
  cod_articulo: Array,
  existencias_disponibles: Array,
  fecha_proxima_recepcion: Array,
});

module.exports = model("Stock", StockSchema);
