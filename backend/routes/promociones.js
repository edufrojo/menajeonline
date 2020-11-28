const { Router } = require("express");

const {
  getPromociones,
  getPromocionByCod,
} = require("../controllers/promociones");

const router = Router();

router.get("/", getPromociones);
router.get("/:cod", getPromocionByCod);

module.exports = router;
