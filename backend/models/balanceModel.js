const mongoose = require("mongoose");

const stocksSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    price: { type: String, required: true },
    profit: { type: String, required: true },
    units: { type: String, required: true }
  });

const balanceSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  totalValue: {
    type: String,
    required: true,
  },
  totalProfitLoss: {
    type: String,
    required: true,
    default: 0
  },
  stocks: [stocksSchema]
});

module.exports = mongoose.model("Balance", balanceSchema);
