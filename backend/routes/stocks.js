const { Router } = require("express");

const { getStocks, getStockByCod } = require("../controllers/stocks");

const router = Router();

router.get("/", getStocks);
router.get("/:cod", getStockByCod);

module.exports = router;
