const { Router } = require("express");

const {
  getCaracteristicas,
  getCaracteristicaByCod,
} = require("../controllers/caracteristicas");

const router = Router();

router.get("/", getCaracteristicas);
router.get("/:cod", getCaracteristicaByCod);

module.exports = router;
