const router = require("express").Router();
const stocksController = require('../controllers/stocksController');

router.get("/getQuote", stocksController.getQuote);


module.exports = router;
