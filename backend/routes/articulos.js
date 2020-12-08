const { Router } = require("express");

const {
  getArticulos,
  getArticulosByPromotion,
  getArticuloByCod,
  getArticulosByNomenclatura,
} = require("../controllers/articulos");

const router = Router();

router.get("/", getArticulos);
router.get("/promocion/:promotion", getArticulosByPromotion);
router.get("/departamentos/:nomenclatura", getArticulosByNomenclatura);
router.get("/:cod", getArticuloByCod);

module.exports = router;
