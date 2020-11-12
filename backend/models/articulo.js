const { Schema, model } = require("mongoose");

const ArticuloSchema = Schema({
  cod_proveedor: Array,
  cod_articulo: Array,
  descripcion: Array,
  descripcion2: Array,
  ref_pve: Array,
  nomenclatura: Array,
  departamento: Array,
  familia: Array,
  categoria: Array,
  gama: Array,
  tipo_producto: Array,
  multiplo_venta: Array,
  precio_coste: Array,
  ecotasa: Array,
  tipo_iva: Array,
  PVP: Array,
  unidad_medida: Array,
  estrategico: Array,
  venta_internet: Array,
  surtido_optimus: Array,
  cod_marca: Array,
  url_imagen: Array,
  cod_promocion: Array,
  fecha_inicio_promocion: Array,
  fecha_final_promocion: Array,
});

module.exports = model("Articulo", ArticuloSchema);
