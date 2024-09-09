const mongoose = require("mongoose");

const stocksSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    profit: { type: Number, required: true },
    units: { type: Number, required: true }
  });

const balanceSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  totalValue: {
    type: Number,
    required: true,
    default: 0
  },
  totalProfitLoss: {
    type: Number,
    required: true,
    default: 0
  },
  stocks: [stocksSchema]
});

module.exports = mongoose.model("Balance", balanceSchema);
