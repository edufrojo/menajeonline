const { Schema, model } = require("mongoose");

const PromocionLineaSchema = Schema({
  cod_promocion: Array,
  denominacion: Array,
  fecha_inicial_venta_socio: Array,
  fecha_final_venta_socio: Array,
  fecha_inicial_venta_publico: Array,
});

module.exports = model("PromocionLinea", PromocionLineaSchema);
