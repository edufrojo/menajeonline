const { Router } = require("express");

const {
  getNomenclaturas,
  getNomenclaturaByCod,
} = require("../controllers/nomenclaturas");

const router = Router();

router.get("/", getNomenclaturas);
router.get("/:cod", getNomenclaturaByCod);

module.exports = router;
