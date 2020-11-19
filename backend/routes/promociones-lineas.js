const { Router } = require("express");

const {
  getPromocionesLineas,
  getPromocionLineaById,
} = require("../controllers/promociones-lineas");

const router = Router();

router.get("/", getPromocionesLineas);
router.get("/:id", getPromocionLineaById);

module.exports = router;
