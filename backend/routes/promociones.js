const { Router } = require("express");

const {
  getPromociones,
  getPromocionById,
} = require("../controllers/promociones");

const router = Router();

router.get("/", getPromociones);
router.get("/:id", getPromocionById);

module.exports = router;
