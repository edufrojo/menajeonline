const { Router } = require("express");

const { getArticulos, getArticuloById } = require("../controllers/articulos");

const router = Router();

router.get("/", getArticulos);
router.get("/:id", getArticuloById);

module.exports = router;
