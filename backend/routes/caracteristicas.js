const { Router } = require("express");

const {
  getCaracteristicas,
  getCaracteristicaById,
  getCaracteristicaByCod,
} = require("../controllers/caracteristicas");

const router = Router();

router.get("/", getCaracteristicas);
router.get("/:codArticulo", getCaracteristicaByCod);
router.get("/:id", getCaracteristicaById);

module.exports = router;
