const { Router } = require("express");

const {
  getArticulos,
  getArticulosByPromotion,
  getArticuloById,
} = require("../controllers/articulos");

const router = Router();

router.get("/", getArticulos);
router.get("/promocion/:promotion", getArticulosByPromotion);
router.get("/:id", getArticuloById);

module.exports = router;
