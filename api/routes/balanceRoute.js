const router = require("express").Router();
const balanceController = require('../controllers/balanceController');

router.post("/createBalance", balanceController.createBalance);
router.get("/getBalance", balanceController.getBalance);
router.put("/updateBalance", balanceController.updateBalance);
router.delete("/deleteBalance", balanceController.deleteBalance);

module.exports = router;
