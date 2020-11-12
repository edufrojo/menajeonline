const { Schema, model } = require("mongoose");

const PromocionSchema = Schema({
  cod_promocion: Array,
  denominacion: Array,
  fecha_inicial_venta_socio: Array,
  fecha_final_venta_socio: Array,
  fecha_inicial_venta_publico: Array,
  fecha_final_venta_publico: Array,
  fecha_fin_pre_compra: Array,
  fecha_ini_pre_compra: Array,
});

module.exports = model("Promocion", PromocionSchema);
