const { Router } = require("express");

const {
  getCaracteristicas,
  getCaracteristicaById,
} = require("../controllers/caracteristicas");

const router = Router();

router.get("/", getCaracteristicas);
router.get("/:id", getCaracteristicaById);

module.exports = router;
