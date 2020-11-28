const { Schema, model } = require("mongoose");

const NomenclaturaSchema = Schema({
  nomenclatura: Array,
  denominacion: Array,
});

module.exports = model("Nomenclatura", NomenclaturaSchema);
